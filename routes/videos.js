const express = require("express");
const router = express.Router();
const fs = require("fs");
const { compileString } = require("sass");
const uniqid = require("uniqid");
const defaultImage = '../public/images/Upload-video-preview.jpg'

function readVideos(){
    const videosJSON = fs.readFileSync('./data/videos.json')
    const parsedVideos = JSON.parse(videosJSON)
    return parsedVideos;
}

function findVideo(videoId){
    const videos = readVideos()
    const foundVideo = videos.find((video)=> video.id === videoId)
    return foundVideo
}

function findVideoIndex(videoId){
    const videos = readVideos()
    const currentVideoIndex = videos.findIndex((video) => video.id === videoId)
    return currentVideoIndex
}

//Return videos.json parsed on /videos request
router.get('/', (req, res) => {
    res.status(200).json(readVideos())
})

//Return video.json based on Id
router.get("/:videoId", (req, res) => {
    const videos = readVideos()
    const currentVideo = findVideo(req.params.videoId)
    if(!currentVideo){res.status(404).send("The video with the given ID was not found.")}
    res.json(currentVideo)
});

//New video post request
router.post('/', (req, res) => {
    const newVideo = {
        "id": uniqid(),
        "title": req.body.title,
        "channel": req.body.channel,
        "image": req.body.image ? req.body.image : defaultImage,
        "description": req.body.description,
        "views": "0",
        "likes": "0",
        "duration": req.body.duration,
        "video": req.body.video,
        "timestamp": req.body.timestamp,
        "comments": []
    }
    const videos = readVideos()
    videos.push(newVideo)
    fs.writeFileSync('./data/videos.json', JSON.stringify(videos))
    res.status(200).send("New video posted!")
})


router.get('/:videoId/comments', (req, res) => {
    const videos = readVideos()
    const currentVideo = findVideo(req.params.videoId)
    res.json(currentVideo.comments)
})

//Endpoint to post comments to videoId comment array
router.post('/:videoId/comments', (req, res) => {
    const newComment = {
        "id": uniqid(),
        "name": req.body.name,
        "comment": req.body.comment,
        "likes": "0",
        "timestamp": req.body.timestamp
    }
    const videos = readVideos()
    const currentVideo = findVideo(req.params.videoId)
    const currentVideoIndex = findVideoIndex(req.params.videoId)
    videos[currentVideoIndex].comments.push(newComment)
    fs.writeFileSync('./data/videos.json', JSON.stringify(videos))
    res.json(videos[currentVideoIndex].comments)
})


router.delete('/:videoId/comments/:commentId', (req, res) => {
    const videos = readVideos();
    const currentVideo = findVideo(req.params.videoId)
    const currentVideoIndex = findVideoIndex(req.params.videoId)
    const commentIndex = videos[currentVideoIndex].comments.findIndex((comment) => comment.id === req.params.commentId)
    videos[currentVideoIndex].comments.splice(commentIndex, 1)
    fs.writeFileSync('./data/videos.json', JSON.stringify(videos))
    res.json(videos[currentVideoIndex].comments)
})

module.exports = router;