import "./styles/signup.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function SignUp(){
    return (
        <>
         <h1>Sign Up page</h1>
         <form action="post">
            <label>Full Name</label>
            <input type="text" id="fullName"/>
            <br />
            <label>User Name</label>
            <input type="text" id="userName"/>
            <br />
            <label>Email</label>
            <input type="email" id="email"/>
            <br />
            <label>Password</label>
            <input type="password" id="password"/>
            <br />
         </form>
         <Button variant="outlined" color="primary" type="submit">Already have an account?</Button>
         <Button variant="contained" color="primary" type="submit">Sign Up</Button>
        </>
    )
}