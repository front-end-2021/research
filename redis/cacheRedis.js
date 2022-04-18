const axios = require('axios')

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
async function getPhotos(query) {
    const response = await client.get(KEY_PHOTOS)
    if(response)
        return {
            Source: 'cache', Photos: JSON.parse(response)
        }
    
    const albumId = query.albumId
    const {data} = await axios.get(API_URL, {params : {albumId}})
    client.setEx(KEY_PHOTOS, DEFAULT_EXPIRATION, JSON.stringify(data))
    return {
        Source: 'api', Photos: data
    }
}

module.exports = {
    getPhotos: getPhotos
}