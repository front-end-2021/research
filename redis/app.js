const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express();
app.use(express.urlencoded({ extended : true }))
app.use(cors())

const cache = require('./cacheRedis')

app.get('/photos', async (req, res) => {
    const data = await cache.getPhotos(req.query);
    res.json(data)
})

const API_URL = `https://jsonplaceholder.typicode.com/photos`
app.get('/photos/:id', async(req, res) => {
    const id = req.params.id
    const {data} = await axios.get(`${API_URL}/${id}`)
    res.json(data)
})

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})