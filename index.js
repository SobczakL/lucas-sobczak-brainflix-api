const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors')

app.use(express.json());
app.use(cors())
app.use(express.static("images"))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})