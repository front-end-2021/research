const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express();
app.use(express.urlencoded({ extended : true }))
app.use(cors())

const REDIS_PORT = process.env.REDIS_PORT || 6379
const redis = require('redis')
const client = redis.createClient({
    host:'localhost', port:REDIS_PORT
})
client.on('error', (err) => console.log('Redis Client Error', err))
client.connect();
const DEFAULT_EXPIRATION = 3600
const KEY_PHOTOS = 'photos'

const API_URL = `https://jsonplaceholder.typicode.com/photos`
app.get('/photos', async (req, res) => {
    const response = await client.get(KEY_PHOTOS)
    if(response){
        console.log('cache')
        const output = JSON.parse(response);
        res.send(output)
    } else {
        console.log('api')
        const albumId = req.query.albumId
        const {data} = await axios.get(API_URL, {params : {albumId}})
        client.setEx(KEY_PHOTOS, DEFAULT_EXPIRATION, JSON.stringify(data))
        res.json(data)
    }
})

app.get('/photos/:id', async(req, res) => {
    const id = req.params.id
    const {data} = await axios.get(`${API_URL}/${id}`)
    res.json(data)
})

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})