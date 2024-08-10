import {Box, TextField, Button, styled, Typography} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    width:320px;
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

const signupInitialValues = {
    name:'',
    username:'',
    password:''
}

const Register = () => {
    let navigate = useNavigate();

    const [signup, setSignup] = useState(signupInitialValues);

    const inputChange = (e)=>{
        setSignup({...signup, [e.target.name]:e.target.value}); //spread operator is used to append the values , so that values dont override it
    }
    const registerClick = ()=>{
        axios.post('http://localhost:7700/signup', signup)
        .then(response=>{
            console.log('Data :', response.data);
            alert("User Added Successfully");
            navigate('/');
        })
        .catch(error=>{
            console.error('Data :', error);
        });
    };
    return (
    <>
        <Container>
            <Box>
               <Wrapper>
                    <FormTitle variant='h4'>User<span style={{color:'#fa5102'}}> Registration</span></FormTitle>
                    <TextField style={{width:'100%'}} onChange={(e)=>inputChange(e)} name='name' label='Enter Name' variant='standard'/>
                    <TextField style={{width:'100%'}} onChange={(e)=>inputChange(e)} name='username' label='Enter User Name' variant='standard'/>
                    <TextField style={{width:'100%'}} onChange={(e)=>inputChange(e)} 
                    name='password' 
                    type='password' 
                    label='Enter Password' 
                    variant='standard'
                    inputProps={{
                        pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7}$"
                    }}
                    required
                    helperText="Password must be 7 characters long and include 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number."
                    />
                    <LoginButton variant='contained' onClick={registerClick}>Sign Up</LoginButton>
                    <Box style={{display:'flex'}}>
                        <hr style={{width:100,height:0,marginTop:'10px',marginRight:'5px'}}/>
                        <Typography style={{color:'grey' }}>or</Typography>
                        <hr style={{width:100,height:0, marginTop:'10px',marginLeft:'5px'}}/>
                    </Box>
                    <SignUpButton onClick={()=>{navigate('/')}}>Already Have an Account?</SignUpButton>
               </Wrapper>
            </Box>
        </Container>
    </>
  )
}

export default Register