import express, {json} from "express"
import cors from "cors"
import methodOverride from "method-override"
import morgan from 'morgan'

//Routes 
import usersRouter from "./routes/usersRouter"
import tasksRouter from "./routes/tasksRouter"
import categoriesRouter from "./routes/categoriesRouter"
import sessionsRouter from "./routes/sessionsRouter"

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(methodOverride('_method'))
app.use(json())

//Routes
app.use(sessionsRouter)
app.use(usersRouter)
app.use(tasksRouter)
app.use(categoriesRouter)

app.listen(3000)