import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function FavCategory() {
  return (
    <Card
      sx={{
        background: "rgba(212, 212, 212, 0.0)",
        height: "30vh",
        width: "50vh",
        boxShadow: "none",
        marginLeft: "225px",
        marginTop: "120px",
        '@media (max-width: 700px)':{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "end",
          margin: '0',
          position: "absolute",
          top: "7.7em",
          right: "0",
         
        }
      }}
    >
      <CardContent>
        {/* First Text */}
        <Typography
          variant="h5"
          color="white"
          fontSize={80}
          sx={{ lineHeight: 1,
            '@media (max-width: 700px)':{
              fontSize: '5.7em'
            } }}
        >
          N/A
        </Typography>
        {/* Additional Content */}
        <Typography
          variant="subtitle2"
          color="rgba(255, 255, 255, .5)"
          fontSize={25}
          sx={{ lineHeight: 1,
            '@media (max-width: 700px)':{
              fontSize: '1em'
            } }}
        >
          Favorite Category
        </Typography>
      </CardContent>
    </Card>
  );
}
