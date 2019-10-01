//http://babynames.tamilgod.org/sangam-tamil-names?page=2
var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs");
var month = 9;
var urlConcod = "https://www.thefamousbirthdays.com",
    tempCond = [],
    Stream = require('stream').Transform,
    https = require('https');

var completeMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//var completeMonths = ['January', 'February'];
var monthsURL = [];
completeMonths.forEach(function (val, ind) {
    monthsURL[ind] = "https://www.thefamousbirthdays.com/" + val;
});

var totalLoops = 0;

function basedOnTheMonths() {
    if (totalLoops < monthsURL.length) {
        console.log("Month Looop... " + monthsURL[totalLoops]);
        requestReady(monthsURL[totalLoops]);
    } else {
        console.log("Printing...");
        printObj();
    }
}

var objCreation = {},
    objArray = [],
    imageURLs = [];

function requestReady(url) {
    console.log("URL " + url);
    var totalDaysOnMonth = 0;

    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            totalDaysOnMonth = $("#preview_month_container .preview-month");
            var totalPerson = "";

            console.log("totalDaysOnMonth " + totalDaysOnMonth.length);

            for (var i = 0; i < totalDaysOnMonth.length; i++) {
                totalPerson = totalDaysOnMonth.eq(i).find(".preview-profiles-item");
                for (var j = 0; j < totalPerson.length; j++) {
                    imageURLs.push({
                        "url": totalPerson.eq(j).find("img").attr("src"),
                        "replaceName": totalPerson.eq(j).find("img").attr("src").split('/').pop()
                    });
                    objCreation["name"] = totalPerson.eq(j).find("h4").text().replace(/\s+/g, ' ').trim();
                    objCreation["meaning"] = totalPerson.eq(j).find(".short-description").text().replace(/\s+/g, ' ').trim();
                    objCreation["sex"] = "https://firebasestorage.googleapis.com/v0/b/tamilnames-cda6c.appspot.com/o/" + totalPerson.eq(j).find("img").attr("src").split('/').pop() + "?alt=media";
                    objCreation["religion"] = "King";
                    objCreation["sex_name"] = (i + 1) + "_" + (totalLoops + 1);
                    objCreation["sex_name_religion"] = (i + 1) + "_" + (totalLoops + 1);
                    objArray.push(objCreation);
                    objCreation = {};
                }
            }
            totalLoops++;
            basedOnTheMonths();
        } else {
            console.log(error);
        }
    });
}

function printObj() {
    let data = JSON.stringify(objArray, null, 2);

    fs.writeFile('birthDay.json', data, (err) => {
        if (err) throw err;
        totalLoops = 0;
        imageUrlLoop();
        console.log('Data written to file');
    });
}


//readArray();

function imageUrlLoop() {
    console.log("Downloading Image " + imageURLs.length + " and Loop " + totalLoops);
    if (totalLoops < imageURLs.length) {
        downloadMG(imageURLs[totalLoops]["url"], "./birthdays/" + imageURLs[totalLoops]["replaceName"], function () {
            console.log('done');
            totalLoops++;
            imageUrlLoop();
        });
    } else {
        console.log("All Images are downloaded");
    }
}

var downloadMG = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


function downloadImages(url) {
    var filename = url["replaceName"];
    console.log("URL " + url["url"])
    https.request(url["url"], function (response) {
        var data = new Stream();

        response.on('data', function (chunk) {
            data.push(chunk);
        });

        response.on('end', function () {
            fs.writeFileSync("./birthdays/" + filename, data.read());
            totalLoops++;
            imageUrlLoop()
        });
    }).end();
}

basedOnTheMonths();