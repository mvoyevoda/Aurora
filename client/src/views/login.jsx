import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../styles/signup.css"
import Link from '@mui/material/Link';




export default function LogIn(){

    const handleLogIn = (event) => {
        event.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        console.log(email + ' ' + password);
    }
    return (
        <>
        <h1>Log In</h1>
        <form className="signup_form">
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
            <Link href="#" variant="p" color = 'inherit' children="Forgot password?" 
            sx={{
                position: 'relative',
                left: '320px',
                
            }}/>
            <Button href="./signup" 
            variant="outlined" 
            children= "Don't have an account?"
            sx={{
                marginTop: '10px',
                color: 'white',
                border: '1px solid',
                borderRadius: '50px',
                display: 'block',
                marginBottom: '20px' 
            }}/>
            <Button variant="outlined"
            type="submit" 
            children= "Log In" 
            onClick={handleLogIn}
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