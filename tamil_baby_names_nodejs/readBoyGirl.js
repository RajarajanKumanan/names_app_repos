var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs");
var data_limit = 20;
let rawdata = fs.readFileSync('json_formatter.json');
let name_list = JSON.parse(rawdata);

var alphaList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var sex = ["boy", "girl"];
var religion = ["christian", "muslim", "hindu"];
var urlConcod = "https://www.looktamil.com/babynames/show/",
    tempCond = [];

var req_loop = 0;

religion.forEach(function (religion_val, religion_index) {
    sex.forEach(function (sex_val, sex_index) {
        alphaList.forEach(function (alphaList_val, alphaList_index) {
            tempCond.push(urlConcod + religion_val + "-" + sex_val + "-names/letter/" + alphaList_val.toUpperCase())
            console.log(urlConcod + religion_val + "-" + sex_val + "-names/letter/" + alphaList_val);
        })
    })
})

console.log(tempCond.length);

function readArray() {
    console.log("loop calling..." + req_loop);
    if (req_loop < tempCond.length) {
        requestReady(tempCond[req_loop]);
    } else {
        console.log("loop Stoped");
        printObj();
    }
}

var objCreation = {},
    objArray = [];

function requestReady(url) {
    console.log("URL " + url);
    var totalAlphabetinSinglePage = 0;

    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            totalAlphabetinSinglePage = $("ul.leftListNames li");

            for (var i = 0; i < totalAlphabetinSinglePage.length; i++) {
                console.log($("ul.leftListNames li").eq(i).text());
                objCreation["name"] = $("ul.leftListNames li").eq(i).text().split("-")[0];
                objCreation["meaning"] = "N/A";
                
                if (url.indexOf("boy") > -1)
                    objCreation["sex"] = "Boy";
                else
                    objCreation["sex"] = "Girl";

                if (url.indexOf("christian") > -1)
                    objCreation["religion"] = "Christian"
                if (url.indexOf("muslim") > -1)
                    objCreation["religion"] = "Muslim"
                if (url.indexOf("hindu") > -1)
                    objCreation["religion"] = "Hindu"

                objCreation["sex_name"] = objCreation["sex"] + "_" + objCreation["name"].substring(0, 1);
                objCreation["sex_name_religion"] = objCreation["sex"] + "_" + objCreation["name"].substring(0, 1) + "_" + objCreation["religion"];
                objArray.push(objCreation);
                objCreation = {};
            }
            req_loop++;
            readArray();
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