import "./styles/signup.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function SignUp(){
   
    const handleSignUp = (event) => {
        event.preventDefault();
        var full_name = document.getElementById('full_name').value;
        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        console.log(full_name + ' ' + username + ' ' + email + ' ' + password);
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