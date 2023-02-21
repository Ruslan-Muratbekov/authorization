require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorMiddleware = require('./middlewares/error-middleware')

const userRouter = require('./router/index')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', userRouter)
app.use(errorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(process.env.URL)
		app.listen(PORT, () => console.log(`Server started on URL http://localhost:${PORT}`))
	}catch (e) {
		console.log(e)
	}
}

start()