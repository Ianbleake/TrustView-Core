import express from "express"
import routes from "./routes/index.js"
import "dotenv/config"

const app = express()

app.use(express.json())

app.use("/api/v1", routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API corriendo en puerto ${PORT}`)
})
