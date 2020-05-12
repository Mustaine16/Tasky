import express, {json} from "express"
import methodOverride from "method-override"
import morgan from 'morgan'

//Routes 
import registersRouter from "./routes/registersRouter"
import tasksRouter from "./routes/tasksRouter"
import categoriesRouter from "./routes/categoriesRouter"

const app = express()

app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(json())

//Routes
app.use(registersRouter)
app.use(tasksRouter)
app.use(categoriesRouter)

app.listen(3000)