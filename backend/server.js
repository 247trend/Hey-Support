const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const PORT = process.env.PORT || 5050
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")


//Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Hey Support API" })
})

// Routes
app.use("/api/users", require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
