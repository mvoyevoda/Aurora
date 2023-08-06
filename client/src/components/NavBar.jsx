import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
<Toolbar sx={{ justifyContent: "flex-start", paddingLeft: "1em" }}>
      {/* <Button
        color="inherit"
        sx={{
          marginRight: '1em',
          backgroundColor: 'transparent',
          border: '1px solid white', // Add a white stroke
          borderRadius: '0.25em', // Optional: add border radius to make the edges smoother
        }}
      >
        Home
      </Button> */}
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        &nbsp;
      </Typography>
      <Button
        color="inherit"
        href="./login"
        sx={{
          backgroundColor: "transparent",
          border: "1px solid white",
          borderRadius: "0.25em", 
        }}
      >
        Log In
      </Button>
      <Button
        color="inherit"
        href="./signup"
        sx={{
          backgroundColor: "transparent",
          border: "1px solid white",
          borderRadius: "0.25em", 
          marginLeft: "1.875em", // Approximately 30px in em units (30px / 16px = 1.875em)
        }}
      >
        Sign up
      </Button>
    </Toolbar>      </AppBar>
    </Box>
  );
}
