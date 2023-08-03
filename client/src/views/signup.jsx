import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../styles/signup.css"
import Link from '@mui/material/Link';
import axios from 'axios';

export default function SignUp(){

    const full_nameRef = useRef();
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
          const response = await axios({
            method: 'post',
            url: 'http://localhost:4000/api/auth/signup',
            data: {
              full_name: full_nameRef.current.value,
              userName: userNameRef.current.value,
              email: emailRef.current.value,
              password: passwordRef.current.value,
            },
            withCredentials: true,
          });
          console.log(response.data);
        } catch (error) {
          console.error(`Error: ${error}`);
        }
    };

    return (
        <>
         <h1>Sign Up</h1>
         <form onSubmit={handleSignUp} className="signup_form">
            <TextField
            sx={{
                backgroundColor: 'rgba(217, 217, 217, 0.20)',
                marginBottom: '10px'
            }}
            variant="standard"
            label= "Full Name"
            id="full_name"
            fullWidth= "true"
            required
            inputRef={full_nameRef}
            />
            <TextField
            sx={{
                backgroundColor: 'rgba(217, 217, 217, 0.20)',
                marginBottom: '10px'
            }}
            variant="standard"
            label= "Username"
            id="username"
            fullWidth= "true"
            required
            inputRef={userNameRef}
            />
            <TextField
            sx={{
                backgroundColor: 'rgba(217, 217, 217, 0.20)',
                marginBottom: '10px'
            }}
            variant="standard"
            label= "Email"
            id="email"
            fullWidth= "true"
            required
            inputRef={emailRef}
            />
            <TextField
            sx={{
                backgroundColor: 'rgba(217, 217, 217, 0.20)',
                marginBottom: '10px'
            }}
            variant="standard"
            label= "Password"
            id="password"
            type="password"
            fullWidth= "true"
            required
            inputRef={passwordRef}
            />
            <Link href="#" variant="p" color = 'inherit' children="Forgot password?" 
            sx={{
                position: 'relative',
                left: '320px',
                
            }}/>
            <Button href="./login" 
            variant="outlined" 
            children= "Already have an account?"
            sx={{
                color: 'white',
                border: '1px solid',
                borderRadius: '50px',
                display: 'block',
                marginBottom: '20px' 
            }}/>
            <Button variant="outlined"
            type="submit" 
            children= "Sign Up" 
            sx={{
                color: 'white',
                border: '1px solid',
                display: 'block',
                width: '100%',
                borderRadius: '50px',
                '&:hover': {
                }
            }}/>

         </form>
        </>
    )
}
