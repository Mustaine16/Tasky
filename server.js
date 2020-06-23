import express, { json } from "express";
import cors from "cors";
import methodOverride from "method-override";
import cookieSession from "cookie-session";
import morgan from "morgan"

//Routes
import usersRouter from "./routes/usersRouter";
import tasksRouter from "./routes/tasksRouter";
import categoriesRouter from "./routes/categoriesRouter";
import sessionsRouter from "./routes/sessionsRouter";

const app = express();

//Middlewares
// app.use(function (req, res, next) {
//   req.headers["Content-Type"] = "application/json";
//   res.setHeader("Content-Type", "application/json");
//   next();
// });
app.use(morgan("dev"));
app.use(cors({
  origin: [
    'https://localhost:4000'
  ],
  credentials: true
}));
//Cookies [name will be 'jwtCookie']
app.use(cookieSession({
  name: 'session',
  keys: ["b6734jv0987s12sc", "21n4lkn0bu0sdfklj"],
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000
}))
app.use(methodOverride("_method"));
app.use(json());


//Routes
app.use(sessionsRouter);
app.use(usersRouter);
app.use(tasksRouter);
app.use(categoriesRouter);

//Error Handler

app.use((err, req, res, next) => {

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ status: 401, message: 'invalid token or token not found' });
  }

  console.log(err)

  return res.status(500).json({
    err,
    status: err.status,
    message: err.message,
  });
});

app.listen(3000);
