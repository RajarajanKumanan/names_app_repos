//http://babynames.tamilgod.org/sangam-tamil-names?page=2
var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs");

var urlConcod = "http://babynames.tamilgod.org/sangam-tamil-names?page=",
    tempCond = [];

var req_loop = 0;

[1, 2, 3, 4, 5].forEach(function (alphaList_val, alphaList_index) {
    tempCond.push(urlConcod + alphaList_val);
    console.log(urlConcod);
})

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
            totalAlphabetinSinglePage = $("#views-bootstrap-grid-1 .col-xs-12");

            for (var i = 0; i < totalAlphabetinSinglePage.length; i++) {
                //console.log($("#views-bootstrap-grid-1 .col-xs-12").eq(i).find("h4.namer").text());
                objCreation["name"] = $("#views-bootstrap-grid-1 .col-xs-12").eq(i).find("h4.namer").text();
                objCreation["meaning"] = $("#views-bootstrap-grid-1 .col-xs-12").eq(i).find("h4.tnamer").text().trim();
                objCreation["sex"] = "Sangam";
                objCreation["religion"] = "Sangam";
                objCreation["sex_name"] = objCreation["sex"] + "_" + objCreation["meaning"].substring(0, 1).toUpperCase();
                objCreation["sex_name_religion"] = objCreation["sex"] + "_" + objCreation["meaning"].substring(0, 1).toUpperCase() + "_" + objCreation["religion"];
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