app.get('/instagram/crawler/:requestName', (req, responseServer) => {
    folder_directory = './memes/';
    folder_directory = folder_directory + req.params.requestName + "/";

    if (!fs.existsSync(folder_directory)) {
        console.log("path creation...");

        mkdirp(path.join(process.cwd(), folder_directory + "images"), function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("images folder created successfully!");
            mkdirp(path.join(process.cwd(), folder_directory + "videos"), function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("videos folder created successfully!");
                mkdirp(path.join(process.cwd(), folder_directory + "thumbnail"), function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("Thumbnail folder created successfully!");

                });

            });
        });

    }
    request({
        url: "https://www.instagram.com/explore/tags/" + req.params.requestName + "/?__a=1",
        qs: null
    }, function (err, response, body) {
        if (err) {
            console.log(err);
            return;
        }
        var responseData = JSON.parse(response["body"]),
            convertedData = "";
        //convertedData = responseData["graphql"]["hashtag"]["edge_hashtag_to_top_posts"];
        convertedData = responseData["graphql"]["hashtag"]["edge_hashtag_to_media"];

        var loopVal = convertedData["edges"],
            return_val = [],
            bulkImgUR = [];
        for (var i = 0; i < loopVal.length; i++) {

            if (loopVal[i]["node"]["is_video"]) {
                bulkImgURL.push({
                    "url": loopVal[i]["node"]['display_url'],
                    "fileName": loopVal[i]["node"]['shortcode'],
                    "videoFile": true
                });
                bulkImgURL.push({
                    "url": loopVal[i]["node"]['thumbnail_src'],
                    "fileName": loopVal[i]["node"]['shortcode'],
                    "thumbnail": true
                });
            } else {
                bulkImgURL.push({
                    "url": loopVal[i]["node"]['display_url'],
                    "fileName": loopVal[i]["node"]['shortcode'],
                    "videoFile": false
                });
            }
        }

        download_img_creations();

        responseServer.send("DONE DONE11");
    });
})


var fileCreation = (url, filename, file, callback) => {

    console.log("File Index " + (file_creation_index + 1) + " File Length " + bulkImgURL.length);
    if (filename.indexOf(".mp4") > -1) {
        getNumResults(file.replace(".mp4", "")).then(count => {

            url = count["graphql"]["shortcode_media"]["video_url"];

            insta_video_Download.downloadInstaVideo(url, filename, () => {
                console.log("Video Download... ");
                file_creation_index++;
                download_img_creations();
            });

        }).catch(err => {
            console.log('Got error from getNumResults ', err);
        });

    } else {

        insta_video_Download.downloadInstaImg(url, filename, (picres) => {
            console.log("Picture Download... " + picres);
            file_creation_index++;
            download_img_creations();
        })
    }

};


const download_img_creations = () => {
    var obj_data = [];
    if (bulkImgURL.length != file_creation_index) {
        obj_data = bulkImgURL[file_creation_index];
        var filePath = "",
            fileObj = bulkImgURL[file_creation_index]["fileName"];
        if (obj_data["videoFile"])
            filePath = folder_directory + "videos/" + fileObj + ".mp4";
        else if (obj_data["thumbnail"])
            filePath = folder_directory + "thumbnail/" + fileObj + ".jpg";
        else
            filePath = folder_directory + "images/" + fileObj + ".jpg";


        fileCreation(obj_data["url"], filePath, fileObj);
    } else {
        file_creation_index = 0;
        bulkImgURL = [];
    }
}

function getNumResults(filename) {

    var dataObj = "https://www.instagram.com/p/" + filename + "/?__a=1";
    return rp(dataObj).then(body => {
        let responseJSON = JSON.parse(body);
        return responseJSON;
    });
}



function getFiles(dir) {

    // get all 'files' in this directory
    var all = fs.readdirSync(dir);

    // process each checking directories and saving files
    return all.map(file => {
        // am I a directory?
        if (fs.statSync(`${dir}/${file}`).isDirectory()) {
            // recursively scan me for my files
            return getFiles(`${dir}/${file}`);
        }
        // WARNING! I could be something else here!!!
        return `${dir}/${file}`; // file name (see warning)
    });
}

app.get('/instagram/filePaths', (req, responseServer) => {
    var data = {};
    //console.log(`${dir}`);    
    responseServer.send(getFiles(all_assets_path));
});



//------------------------------------------------------------------------------------------------------
var insta_video_Download = require('./insta-video-download');
var express = require('express');
let app = express();
let bodyParser = require('body-parser');
var folder_directory = './memes/',
    all_assets_path = './memes/';
const http = require('http'),
    https = require('https');
const rp = require('request-promise');
const fs = require('fs');
let bulkImgURL = [],
    file_creation_index = 0;
var request = require('request');

var mkdirp = require('mkdirp');
var path = require('path');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', (req, res) => {
    res.send('Yea, its Running!');
});

app.get('/instagram/crawler/:requestName', (req, responseServer) => {
    folder_directory = './memes/';
    folder_directory = folder_directory + req.params.requestName + "/";

    if (!fs.existsSync(folder_directory)) {
        console.log("path creation...");

        mkdirp(path.join(process.cwd(), folder_directory + "images"), function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("images folder created successfully!");
            mkdirp(path.join(process.cwd(), folder_directory + "videos"), function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("videos folder created successfully!");
                mkdirp(path.join(process.cwd(), folder_directory + "thumbnail"), function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("Thumbnail folder created successfully!");

                });

            });
        });

    }
    request({
        url: "https://www.instagram.com/explore/tags/" + req.params.requestName + "/?__a=1",
        qs: null
    }, function (err, response, body) {
        if (err) {
            console.log(err);
            return;
        }
        var responseData = JSON.parse(response["body"]),
            convertedData = "";
        //convertedData = responseData["graphql"]["hashtag"]["edge_hashtag_to_top_posts"];
        convertedData = responseData["graphql"]["hashtag"]["edge_hashtag_to_media"];

        var loopVal = convertedData["edges"],
            return_val = [],
            bulkImgUR = [];
        for (var i = 0; i < loopVal.length; i++) {

            if (loopVal[i]["node"]["is_video"]) {
                bulkImgURL.push({
                    "url": loopVal[i]["node"]['display_url'],
                    "fileName": loopVal[i]["node"]['shortcode'],
                    "videoFile": true
                });
                bulkImgURL.push({
                    "url": loopVal[i]["node"]['thumbnail_src'],
                    "fileName": loopVal[i]["node"]['shortcode'],
                    "thumbnail": true
                });
            } else {
                bulkImgURL.push({
                    "url": loopVal[i]["node"]['display_url'],
                    "fileName": loopVal[i]["node"]['shortcode'],
                    "videoFile": false
                });
            }
        }

        download_img_creations();

        responseServer.send("DONE DONE11");
    });
})


var fileCreation = (url, filename, file, callback) => {

    console.log("File Index " + (file_creation_index + 1) + " File Length " + bulkImgURL.length);
    if (filename.indexOf(".mp4") > -1) {
        getNumResults(file.replace(".mp4", "")).then(count => {

            url = count["graphql"]["shortcode_media"]["video_url"];

            insta_video_Download.downloadInstaVideo(url, filename, () => {
                console.log("Video Download... ");
                file_creation_index++;
                download_img_creations();
            });

        }).catch(err => {
            console.log('Got error from getNumResults ', err);
        });

    } else {

        insta_video_Download.downloadInstaImg(url, filename, (picres) => {
            console.log("Picture Download... " + picres);
            file_creation_index++;
            download_img_creations();
        })
    }

};


const download_img_creations = () => {
    var obj_data = [];
    if (bulkImgURL.length != file_creation_index) {
        obj_data = bulkImgURL[file_creation_index];
        var filePath = "",
            fileObj = bulkImgURL[file_creation_index]["fileName"];
        if (obj_data["videoFile"])
            filePath = folder_directory + "videos/" + fileObj + ".mp4";
        else if (obj_data["thumbnail"])
            filePath = folder_directory + "thumbnail/" + fileObj + ".jpg";
        else
            filePath = folder_directory + "images/" + fileObj + ".jpg";


        fileCreation(obj_data["url"], filePath, fileObj);
    } else {
        file_creation_index = 0;
        bulkImgURL = [];
    }
}

function getNumResults(filename) {

    var dataObj = "https://www.instagram.com/p/" + filename + "/?__a=1";
    return rp(dataObj).then(body => {
        let responseJSON = JSON.parse(body);
        return responseJSON;
    });
}



function getFiles(dir) {

    // get all 'files' in this directory
    var all = fs.readdirSync(dir);

    // process each checking directories and saving files
    return all.map(file => {
        // am I a directory?
        if (fs.statSync(`${dir}/${file}`).isDirectory()) {
            // recursively scan me for my files
            return getFiles(`${dir}/${file}`);
        }
        // WARNING! I could be something else here!!!
        return `${dir}/${file}`; // file name (see warning)
    });
}

app.get('/instagram/filePaths', (req, responseServer) => {
    var data = {};
    //console.log(`${dir}`);    
    responseServer.send(getFiles(all_assets_path));
});





const port = 8080;

app.listen(port, () => {
    console.log("Server running at http://166.62.28.102" + port);
});