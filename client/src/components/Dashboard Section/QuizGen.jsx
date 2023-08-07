import { Card, CardContent, Typography } from "@mui/material";

export function QuizGen() {
  return (
    <Card
      sx={{
        background: "rgba(212, 212, 212, 0.0)",
        height: "30vh",
        width: "40vh",
        boxShadow: "none",
        marginLeft: "275px",
        marginTop: "120px",
      }}
    >
      <CardContent>
        {/* First Text */}
        <Typography
          variant="h5"
          color="white"
          fontSize={210}
          sx={{ lineHeight: 1 }}
        >
          0
        </Typography>
        {/* Additional Content */}
        <Typography
          variant="subtitle2"
          color="rgba(255, 255, 255, .5)"
          fontSize={25}
          sx={{ lineHeight: 1 }}
        >
          Quizzes Generated
        </Typography>
      </CardContent>
    </Card>
  );
}
