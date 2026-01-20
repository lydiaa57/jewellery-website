const express = require("express")
const path = require("path")

const app = express()
const PORT = 8080

const clientPath = path.join(__dirname, "..", "client")

app.use(express.static(clientPath))

app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"))
})

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
})