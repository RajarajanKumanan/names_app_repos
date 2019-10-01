//http://babynames.tamilgod.org/sangam-tamil-names?page=2
var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs");

var urlConcod = "https://en.wikipedia.org/wiki/List_of_Tamil_monarchs",
    tempCond = [];

function readArray() {    
    requestReady(urlConcod);
}

var objCreation = {},
    objArray = [];

function requestReady(url) {
    console.log("URL " + url);
    var totalAlphabetinSinglePage = 0;

    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            totalAlphabetinSinglePage = $("ul");

            for (var i = 14; i < totalAlphabetinSinglePage.length; i++) {

                for (var j = 0; j < $("ul").eq(i).find("li").length; j++) {

                    objCreation["name"] = $("ul").eq(i).find("li").eq(j).text();
                    objCreation["meaning"] = "N/A";
                    objCreation["sex"] = "King";
                    objCreation["religion"] = "King";
                    objCreation["sex_name"] = objCreation["sex"] + "_" + objCreation["name"].substring(0, 1).toUpperCase();
                    objCreation["sex_name_religion"] = objCreation["sex"] + "_" + objCreation["name"].substring(0, 1).toUpperCase() + "_" + objCreation["religion"];
                    objArray.push(objCreation);
                    objCreation = {};
                }
            }
            printObj()
        } else {
            console.log(error);
        }
    });
}

function printObj() {
    let data = JSON.stringify(objArray, null, 2);

    fs.writeFile('result.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}

readArray();

