import express, {json} from "express"
import cors from "cors"
import methodOverride from "method-override"
import session from "express-session"
import morgan from 'morgan'

//Session Middleware
import usersSession from "./middlewares/usersSessionMidd"

//Routes 
import usersRouter from "./routes/usersRouter"
import tasksRouter from "./routes/tasksRouter"
import categoriesRouter from "./routes/categoriesRouter"
import sessionsRouter from "./routes/sessionsRouter"

const app = express()

//Middlewares

app.use(morgan('dev'))
app.use(cors())
app.use(methodOverride('_method'))
app.use(json())

app.use(session({
  secret:["jh4jg14h23nba8czxcl",'18bs986amb42b4kj54'],
  saveUnitialized:false,
  resave:false
}))

//Session middleware
app.use(usersSession)

//Routes
app.use(sessionsRouter)
app.use(usersRouter)
app.use(tasksRouter)
app.use(categoriesRouter)

//404 Error
app.use(function(req, res, next){
  res.status(404);
  
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(3000)