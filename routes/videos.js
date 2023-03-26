const express = require("express");
const app = express()
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");
// const defaultImage = '../public/images/Upload-video-preview.jpg'

//Return video data
function readVideos(){
    const videosJSON = fs.readFileSync('./data/videos.json')
    const parsedVideos = JSON.parse(videosJSON)
    return parsedVideos;
}

//Search videos array from id value
function findVideo(videoId){
    const videos = readVideos()
    const foundVideo = videos.find((video)=> video.id === videoId)
    return foundVideo
}

//Search index of videoId in videos array
function findVideoIndex(videoId){
    const videos = readVideos()
    const currentVideoIndex = videos.findIndex((video) => video.id === videoId)
    return currentVideoIndex
}

//Return videos.json parsed on /videos request
router.get('/',(req, res) => {
    res.status(200).json(readVideos())
})

//Return video.json based on Id
router.get("/:videoId", (req, res) => {
    const videos = readVideos()
    const currentVideo = findVideo(req.params.videoId)
    if(!currentVideo){
        res.status(404).send("The video with the given ID was not found.")
    }
    res.status(200).json(currentVideo)
});

//New video post request
router.post('/', (req, res) => {
    const defaultImage = 'http://localhost:8080/public/images/default.jpg'
    const defaultVideo = 'https://project-2-api.herokuapp.com/stream'
    const newVideo = {
        "id": uniqid(),
        "title": req.body.title,
        "channel": req.body.channel,
        "image": defaultImage,
        "description": req.body.description,
        "views": 0,
        "likes": 0,
        "duration": 10,
        "video": defaultVideo,
        "timestamp": req.body.timestamp,
        "comments": []
    }
    const videos = readVideos()
    videos.push(newVideo)
    fs.writeFileSync('./data/videos.json', JSON.stringify(videos))
    res.status(201).send("New video posted!")
})


router.get('/:videoId/comments', (req, res) => {
    const videos = readVideos()
    const currentVideo = findVideo(req.params.videoId)
    if(!currentVideo){
        res.status(404).send("The video with the given ID was not found.")
    }
    res.json(currentVideo.comments)
})

//Endpoint to post comments to videoId comment array
router.post('/:videoId/comments', (req, res) => {
    const newComment = {
        "id": uniqid(),
        "key": uniqid(),
        "name": req.body.name,
        "comment": req.body.comment,
        "likes": 0,
        "timestamp": req.body.timestamp
    }
    for(prop in newComment){
        if(!newComment[prop]){
            res.status(400).send(`Missing ${prop} in request body.`)
        }
    }
    const videos = readVideos()
    const currentVideo = findVideo(req.params.videoId)
    const currentVideoIndex = findVideoIndex(req.params.videoId)
    videos[currentVideoIndex].comments.push(newComment)
    fs.writeFileSync('./data/videos.json', JSON.stringify(videos))
    res.status(201).json(videos[currentVideoIndex].comments)
})

//Endpoint to delete comments based off videoId and commentId
router.delete('/:videoId/comments/:commentId', (req, res) => {
    const videos = readVideos();
    const currentVideo = findVideo(req.params.videoId)
    if(!currentVideo){
        res.status(404).send("The video with the given ID was not found.")
    }
    const currentVideoIndex = findVideoIndex(req.params.videoId)
    const commentIndex = videos[currentVideoIndex].comments.findIndex((comment) => comment.id === req.params.commentId)
    if(commentIndex === -1){
        res.status(404).send("A comment with the given ID was not found.")
    }
    videos[currentVideoIndex].comments.splice(commentIndex, 1)
    fs.writeFileSync('./data/videos.json', JSON.stringify(videos))
    res.status(204).json(videos[currentVideoIndex].comments)
})

module.exports = router;