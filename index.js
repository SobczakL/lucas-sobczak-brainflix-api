const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors')
const videos = require('./routes/videos')

app.use(express.json());
app.use(cors())
app.use('/public', express.static("public"))
app.use('/videos', videos)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
