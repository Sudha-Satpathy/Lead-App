import {Box, TextField, Button, styled, Typography} from '@mui/material';
import axios from 'axios';
import {useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../contextApi/DataProvider';
import ReCAPTCHA from 'react-google-recaptcha';
import App from '../../App';
const Container = styled(Box)`
    width:350px;
    padding:20px;
    box-shadow: 2px 2px 10px black; 
    
`
const Image = styled('img')({
    width:100,
    display:'flex',
    margin:'auto',
})

const Wrapper = styled(Box)`
    width:300px;
    margin:auto;
    display:flex;
    flex-direction:column;
    margin-top:5px;
    padding:25px;
    text-transform:none; 
    & > div, & > button, & > p{
        margin-bottom:20px;
        text-transform:none; 
    }
`

const FormTitle = styled(Typography)`
    color:#6b605f;
`

const LoginButton = styled(Button)`
    background:#FB641B;
    width:100%;
`
const SignUpButton = styled(Button)`
    box-shadow: 1px 1px 5px grey;
    width:100%;
`
const loginInitialValues = {
    username : '',
    password : ''
}


const Login = () => {
    let navigate = useNavigate();
    const [loginData, setLoginData] = useState(loginInitialValues);
    const [captchaToken, setCaptchaToken] = useState(null);
    const {setAccounts} = useContext(DataContext); //destructuring is mandatory, else it will throw error.
    const onValueChange = (e)=>{
        setLoginData({...loginData, [e.target.name]:e.target.value}) //... is used to append the values , so that vaues dont override it
    }


    const handleLoginClick = async()=>{

        if (!captchaToken) {
            alert("Please complete the CAPTCHA");
            return;
        }

        await axios.post('http://localhost:7700/login-auth', {
            ...loginData,
            captchaToken
        })

        .then(response=>{
            sessionStorage.setItem('accessToken', `Bearer : ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer : ${response.data.refreshToken}`);
            setAccounts({username:response.data.username, name:response.data.name});
            console.log(response.data);
            alert("Login Successful")
            navigate('/dashboard');
        })
        .catch(err=>{
            console.log(err);
            alert("Invalid Credentials - New User? Please Register.")
        });
    }

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    }

    return (
    <>
        <Container>
            <Box>
               <Wrapper>
                    <FormTitle variant='h4'>User <span style={{color:'#fa5102'}}> Login</span></FormTitle>
                    <TextField style={{width:'100%'}} onChange={(e)=>onValueChange(e)} name='username' label='user name' variant='standard'/>
                    <TextField style={{width:'100%'}} onChange={(e)=>onValueChange(e)} name='password' type='password' label='password' variant='standard'/>
                    <ReCAPTCHA
                            sitekey="6LciyCMqAAAAANBVqyIlBy2vTHP2doswLfr3amma"
                            onChange={handleCaptchaChange}
                    />
                    <LoginButton variant='contained' onClick={handleLoginClick}>Login</LoginButton>
                    <Box style={{display:'flex'}}>
                        <hr style={{width:100,height:0,marginTop:'10px',marginRight:'5px'}}/>
                        <Typography style={{color:'grey' }}>or</Typography>
                        <hr style={{width:100,height:0, marginTop:'10px',marginLeft:'5px'}}/>
                    </Box>
                    <SignUpButton onClick={()=>navigate('/register')}>Create an Account</SignUpButton>
               </Wrapper>
            </Box>
        </Container>
    </>
  )
}

export default Login