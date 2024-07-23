// Lib
import cors from 'cors'
import express, { Request, Response } from 'express'
require('dotenv').config()

// Include
import lineHandler from './controllers/line'

// ==========

//app
const app = express()
const port = process.env.PORT

//middlewares
app.use(cors())
app.use(express.json())

// controllers
app.all('/', async (req: Request, res: Response) => await lineHandler(req, res))
app.all('/hello', async (req: Request, res: Response) => res.send('🙋‍♂️ Hello'))

// development port
app.listen(port, () => console.log(`Server at http://localhost:${port}`))

export default app
