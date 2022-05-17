const axios = require('axios')
const REDIS_PORT = process.env.REDIS_PORT || 6379
const redis = require('redis')
const client = redis.createClient({
    host:'localhost', port:REDIS_PORT, legacyMode: true
})

var isConnected = 0
client.on('error', (err) => {
    isConnected = -1
    throw new Error(`Fail connection in Redis Client ${err}`);
})
client.on('connect', () => { isConnected = 1 });

const DEFAULT_EXPIRATION = 3600
const KEY_PHOTOS = 'photos'
const API_URL = `https://jsonplaceholder.typicode.com/photos`

async function getPhotos(albumId) {
    try {
        if(isConnected == 0) {
            await client.connect()
        }
        
        if(isConnected == 1) {
            const response = await client.get(KEY_PHOTOS)
            if(response)
                return {
                    Source: 'cache', Photos: JSON.parse(response)
                }
        }
    } catch (error) {
        isConnected = -2
    }
     
    const {data} = await axios.get(API_URL, {params : {albumId}})
    if(isConnected == 1) 
        client.setEx(KEY_PHOTOS, DEFAULT_EXPIRATION, JSON.stringify(data))

    return {
        Source: 'api', Photos: data
    }
}
async function getPhoto(id) {
    try {
        if(isConnected == 0) {
            await client.connect()
        }
        if(isConnected == 1) {
            const response = await client.get(KEY_PHOTOS)
            if(response) {
                const photos = JSON.parse(response)
                const photo = photos.find(p => p.id == id)
                return {
                    Source: 'cache', Photo: photo
                }
            }
        }
    } catch (error) {
        isConnected = -2
    }
    
    const {data} = await axios.get(`${API_URL}/${id}`)
    return {
        Source: 'api', Photo: data
    }
}

module.exports = {
    getPhotos: getPhotos,
    getPhoto: getPhoto,
}