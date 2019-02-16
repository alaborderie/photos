const fs = require('fs')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const jo = require('jpeg-autorotate')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/static', express.static(path.join(__dirname, 'photos')))

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/get-images', (req, res) => {
    let images = getImagesFromDir(path.join(__dirname, 'photos'))
    res.status(200).send(images)
});

app.post('/upload-photo', (req, res) => {
    console.log('upload-photo')
    let file = new Buffer(req.body, 'base64')
    fs.writeFile('photos/photo.jpg', file, (err) => {
        if (err)
            res.status(500).send()
        else {
            res.status(200).send()
            rotateImages()
        }
    })
})

app.post('/login', (req, res) => {
    const password = req.body.password
    if (password === "Bakean") {
        res.status(200).send()
    } else {
        res.status(403).send("Unauthorized: Wrong password")
    }
})

app.get('/rotate', (req, res) => {
    rotateImages()
    res.status(200).send()
})

function rotateImages() {
    let images = fs.readdirSync(path.join(__dirname, 'photos'))
    for (let image of images) {
        jo.rotate('photos/' + image, {}, (error, buffer, orientation) => {
            if (error) {
                console.log('An error occurred when rotating the image: ' + error.message)
                return
            }

            fs.writeFile('photos/' + image, buffer, err => {
                if (err) {
                    console.log('An error occurred when saving the rotated image: ' + err.message)
                    return
                }

                console.log('File saved!')
            })
        })
    }
}

// dirPath: target image directory
function getImagesFromDir(dirPath) {

    let allImages = []

    // Iterator over the directory
    let files = fs.readdirSync(dirPath)

    // Iterator over the files and push images to allImages array.
    for (file of files) {
        let fileLocation = path.join(dirPath, file)
        var stat = fs.statSync(fileLocation)
        if (stat && stat.isDirectory()) {
            getImagesFromDir(fileLocation); // process sub directories
        } else if (stat && stat.isFile()) {
            allImages.push('http://localhost:8080/static/' + file)
        }
    }

    // return all images in array format
    return allImages
}

app.listen(8080, function () {
    console.log(`Application is running at : localhost:8080`)
})