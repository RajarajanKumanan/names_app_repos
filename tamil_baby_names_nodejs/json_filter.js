var fs = require("fs");
var data_limit = 20;



let rawdata = fs.readFileSync('json_formatter.json');
let name_list = JSON.parse(rawdata);


var datas = name_list["name_list"] || name_list;

console.log(datas.length);

var dataPri = {},
    dataPars = [],
    readPros = [];
var religion_obj = {};
for (var i = 0; i < datas.length; i++) {
    dataPars = datas[i]["name"].substr(0, 1);
    if (datas[i]["sex"] != "Unisex") {

        if (!dataPri.hasOwnProperty(dataPars)) {

            dataPri[dataPars] = {};
            dataPri[dataPars]["Boy"] = {}
            dataPri[dataPars]["Girl"] = {};
            dataPri[dataPars]["Boy"] = {
                "Muslim": [],
                "Hindu": [],
                "Christian": []
            };
            dataPri[dataPars]["Girl"] = {
                "Muslim": [],
                "Hindu": [],
                "Christian": []
            };

            dataPri[dataPars][datas[i]["sex"]][datas[i]["religion"]].push(datas[i]);


        } else {
            // console.log(dataPri[dataPars]);
            try {
                religion_obj = dataPri[dataPars][datas[i]["sex"]][datas[i]["religion"]];

                if (religion_obj.length < data_limit) {
                    religion_obj.push(datas[i]);
                    readPros.push(datas[i])
                }
            } catch (e) {
                console.log(e)
            }


            //console.log(dataPri);

        }
    }
}

var resultData = {};
readPros.sort(function (a, b) {
    return a.name.localeCompare(b.name);
});
resultData["name_list"] = readPros;

let data = JSON.stringify(resultData, null, 2);

fs.writeFile('result.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

// var writeStream = fs.createWriteStream("result.json");
// writeStream.write("Hi, JournalDEV Users. ");
// writeStream.write("Thank You.");
// writeStream.end();

console.log(Object.keys(dataPri).sort() + " total Alphabet " + Object.keys(dataPri).length);

Object.keys(dataPri).sort().forEach(function (val, ind) {
    //console.log(dataPri[val]["Boy"]["Muslim"]);
    console.log(val + "::: muslim Boy size " + dataPri[val]["Boy"]["Muslim"].length + "::: Girl muslim size " + dataPri[val]["Girl"]["Muslim"].length);
    console.log(val + "::: Hindu Boy size " + dataPri[val]["Boy"]["Hindu"].length + "::: Girl Hindu size " + dataPri[val]["Girl"]["Hindu"].length);
    console.log(val + "::: Christian size " + dataPri[val]["Boy"]["Christian"].length + "::: Christian size " + dataPri[val]["Girl"]["Christian"].length);
})

console.log(readPros.length);