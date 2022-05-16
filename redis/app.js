const express = require('express')
const cors = require('cors')

const app = express();
app.use(express.urlencoded({ extended : true }))
app.use(cors())

const cache = require('./cacheRedis')

app.get('/photos', async (req, res) => {
    const albumId = req.query.albumId
    const data = await cache.getPhotos(albumId);
    res.json(data)
})

app.get('/photos/:id', async(req, res) => {
    const id = req.params.id
    const data = await cache.getPhoto(id)
    res.json(data)
})

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})