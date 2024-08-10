import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from "mongodb";
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


dotenv.config(); //initializing dotenv
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;


const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

let database;
const Connection = async (username,password)=>{
const url = `mongodb+srv://${username}:${password}@leadapp.2kinuq4.mongodb.net/?retryWrites=true&w=majority&appName=Leadapp`;
try{
    await MongoClient.connect(url).then(clientObj=>{
         database = clientObj.db("Leadapp");
    });
    console.log('Database connected successfully');
}
catch(err){
    console.log(err);
}
}
Connection(USERNAME,PASSWORD);


app.post('/signup', async (req,res)=>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    try{
        const user = {
            name : req.body.name,
            username : req.body.username,
            password : hashedPassword
        }
        const result = await database.collection('Users').insertOne(user);
        if(result.insertedId){
            res.status(200).send({_id:result.insertedId, success:true, message:'User added successfully'});
            console.log(result);
        }
        else{
            res.status(404).send({message:'Some error occured'});
        }
    }
    catch(err){
        console.log(err);
    }
});
app.post('/login-auth', async (req,res)=>{
    try{
        const captchaToken = req.body.captchaToken;
        // Verify reCAPTCHA
            const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;
            try {
                const captchaResponse = await axios.post(verificationUrl);
                if (!captchaResponse.data.success) {
                    return res.status(400).json({ success: false, message: 'Captcha verification failed' });
                }
            }
            catch(err){
                console.log(err);
            }
        // Continue with login process if reCAPTCHA is successful
        const user = await database.collection('Users').findOne({username:req.body.username});
        console.log(user);
        if(user){
            const verifyPassword = await bcrypt.compare(req.body.password, user.password);
            if(verifyPassword){
                const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, {expiresIn:'15m'});
                const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_KEY, {expiresIn:'7d'});

                await database.collection('refreshToken').insertOne({token:refreshToken,userId:user._id, username:user.username,})

                res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,msg:'Login Successful', user});
            }
            else{
                res.status(400).json({msg:'invalid password'});
            }
        }
        else{
            res.status(400).json({msg:'username doesnot exist'});
        }
    }
    catch(err){
        console.log(err);
    }
    
})
app.get('/users', (req,res)=>{
    database.collection('Users').find({}).toArray().then((docs)=>{
        res.send(docs);
        console.log('Users fetched');
    })
});

app.listen(7700, ()=>console.log('Server listening  @7700'));
