const connectToMongo=require('./db')
const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000

connectToMongo() 
app.use(cors());
app.use(express.json())
// Available routes
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})