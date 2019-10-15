const express = require("express")
const path = require("path")
const app = express()

const buildPath = path.join(__dirname, "build")
console.log(__dirname)

app.use(express.static(buildPath))

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(3000)
