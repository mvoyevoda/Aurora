import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function LogoutButton() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "flex-start", paddingLeft: "16px" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            &nbsp;
          </Typography>
          <Button
            color="inherit"
            href="/"
            sx={{
              backgroundColor: "transparent",
              border: "1px solid white",
              borderRadius: "4px", 
            }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
