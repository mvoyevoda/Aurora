import "../styles/signup.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function SignUp(){
   
    const handleSignUp = async (event) => {
        event.preventDefault();
        const full_name = document.getElementById('full_name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await axios.post('http://localhost:4000/api/auth/signup', { full_name, username, email, password })
        console.log(response.data.message);
    }
    return (
        <>
         <h1>Sign Up</h1>
         <form className="signup_form">
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
            />
            <TextField
            sx={{
                backgroundColor: 'rgba(217, 217, 217, 0.20)',
                marginBottom: '10px'
            }}
            variant="standard"
            label= "username"
            id="username"
            fullWidth= "true"
            required
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
            />
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
            onClick={handleSignUp}
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