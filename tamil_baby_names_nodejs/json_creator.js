var specficMulism = [];
var asset = muslimData["name_list"];
for (var i = 0; i < asset.length; i++) {
    if (asset[i]["religion"] == "Muslim") {
        asset[i]["sex_name"] = asset[i]["sex"] + "_" + asset[i]["name"].substring(0, 1);
        specficMulism.push(muslimData["name_list"][i])
    }
}
console.log(specficMulism)


//pure tamil name

var total_divs = document.getElementsByClassName("name_me");
var Obj_creation = {},
    sex, name, meaning, arrayval = [];

for (var i = 0; i < total_divs.length; i++) {
    sex = total_divs[i].children[1].innerHTML;
    name = total_divs[i].children[1].innerText;
    meaning = total_divs[i].children[2].innerText;
    if (sex.toLowerCase().indexOf("boy") > -1) {
        Obj_creation["name"] = name;
        Obj_creation["sex_name_religion"] = "Boy_" + name.substring(0, 1) + "_" + "sangam";
        Obj_creation["meaning"] = meaning;
        Obj_creation["sex"] = "Boy";
    }
    if (sex.toLowerCase().indexOf("girl") > -1) {
        Obj_creation["name"] = name;
        Obj_creation["sex_name_religion"] = "Girl_" + name.substring(0, 1) + "_" + "sangam";
        Obj_creation["meaning"] = meaning;
        Obj_creation["sex"] = "Girl";
    }
    arrayval.push(Obj_creation);
    Obj_creation = {};
}

console.log(JSON.stringify(arrayval));




var data = {
    "meaning": "Cool breeze of the morning",
    "name": "Sabeen",
    "religion": "Muslim",
    "sex": "Girl",
    "sex_name": "Girl_S",
    "sex_name_religion": "Girl_S_Muslim"
}

var alpha_objs = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    b: []
};

for (var i = 0; i < data.length; i++) {
    if (data[i]["sex"] == "Girl") {

    }
}





asset[i]["name"] = asset[i]["name"];
asset[i]["meaning"] = asset[i]["sex"]["meaninng"];
asset[i]["sex"] = asset[i]["sex"];
asset[i]["religion"] = "Sangam";
asset[i]["sex_name"] = "Sangam_" + asset[i]["name"].substring(0, 1);
asset[i]["sex_name_religion"] = asset[i]["sex"] + "_" + asset[i]["name"].substring(0, 1) + "_Sangam";


var dataPri = {},
    dataPars = [],
    readPros = [];
for (var i = 0; i < datas.length; i++) {
    dataPars = datas[i]["name"].substr(0, 1);
    if (dataPri.hasOwnProperty(dataPars)) {
        if (dataPri[dataPars].length < 10) {
            dataPri[dataPars].push(datas[i]);
            readPros.push(datas[i])
        }
    } else {
        dataPri[dataPars] = [];
        dataPri[dataPars].push(datas[i]);
    }
}
JSON.stringify(readPros);


var totalHTML = $(".babytable tr");
var objCreation = {},
    objArray = [],
    court;
for (var i = 1; i < totalHTML.length; i++) {
    objCreation["name"] = $(".babytable tr").eq(i).find("td").eq(0).text();
    objCreation["meaning"] = $(".babytable tr").eq(i).find("td").eq(1).text();
    objCreation["sex"] = $(".babytable tr").eq(i).find("td").eq(2).text();
    objCreation["religion"] = $(".babytable tr").eq(i).find("td").eq(3).text();
    objCreation["sex_name"] = objCreation["sex"] + "_" + objCreation["name"].substring(0, 1);
    objCreation["sex_name_religion"] = objCreation["sex"] + "_" + objCreation["name"].substring(0, 1) + "_" + objCreation["religion"];
    objArray.push(objCreation);
    objCreation = {};
};
console.log(JSON.stringify(objArray));