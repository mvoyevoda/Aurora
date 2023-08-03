const express = require("express");
const app = express();
const port = 4000;
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require('./routes/authRoutes')
const openAIRoutes = require('./routes/openAIRoutes')
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const {
  validationErrorHandler,
  duplicateErrorHandler,
  dbErrorHandler,
  forbiddenErrorHandler,
  notFoundErrorHandler
} = require('./middleware/errorHandlers');

app.use(
  cors({
      origin: "http://localhost:5173",
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization"],
      method: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get('/', (req, res) => {
    res.send("Aurora")
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000, // 1 hour
        },
    })
);

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/openAI', openAIRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
        // the 'finish' event will be emitted when the response is handed over to the OS
        console.log(`Response Status: ${res.statusCode}`);
    });
    next();
});

//Errors
app.use(validationErrorHandler);
app.use(duplicateErrorHandler);
app.use(dbErrorHandler);
app.use(forbiddenErrorHandler);
app.use(notFoundErrorHandler);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');
    next();
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});