const messageFormatter = require('dvp-common-lite/CommonMessageGenerator/ClientMessageJsonFormatter.js');
const request = require('request');
const fs = require('fs');


module.exports.GetLanguages = async function (key) {
    // This gives the list of languages supported

    let resultData = await GetLanguages(key).catch(function (error) {
        console.log(error);
        res(error);
        return;
    });
    return resultData;
}

let GetLanguages = (key) => {

    console.log("GetLanguages Internal method ");

    return new Promise((resolve, reject) => {

        request({
            rejectUnauthorized: false,
            method: "GET",
            url: "https://translation.googleapis.com/language/translate/v2/languages?key=" + key + "&target=en",
            headers: {
                'Content-Type': 'application/json'
            },
        }, function (_error, _response, datax) {

            console.log(_error);
            console.log(_response.statusCode);

            let datay = JSON.parse(datax);
            console.log(datay);
            try {
                if (!_error && _response && _response.statusCode === 200) {
                    var json = {
                        'CustomMessage': "Get language list is successful",
                        'IsSuccess': true,
                        'Result': datay.data.languages
                    };
                    resolve(JSON.stringify(json));
                } else {
                    console.log(datay.error);
                    console.log(datay.error.message);
                    let jsonString = messageFormatter.FormatMessage(datay.error.message, "Get language list has failed. " + datay.error.message, false, undefined);
                    reject(jsonString);
                }
            } catch (excep) {
                console.log(excep);
                reject(excep);
            }
        });
    });
}



module.exports.DetectLanguage = async function (key, text) {
    // This detects the language of a given text

    let resultLanguage = await DetectLanguage(key, text).catch(function (error) {
        console.log(error);
        res(error);
        return;
    });
    return resultLanguage;
}

let DetectLanguage = (key, text) => {

    console.log("DetectLanguage Internal method ");

    return new Promise((resolve, reject) => {

        let uri = "https://translation.googleapis.com/language/translate/v2/detect?key=" + key + "&q=" + text;
        uri = encodeURI(uri);

        console.log(uri);
        console.log(text);

        request({
            rejectUnauthorized: false,
            method: "POST",
            url: uri,
            headers: {
                'Content-Type': 'application/json'
            },
        }, function (_error, _response, datax) {

            console.log(_error);
            console.log(_response.statusCode);

            let datay = JSON.parse(datax);

            try {
                if (!_error && _response && _response.statusCode === 200) {
                    var json = {
                        'CustomMessage': "Detect language is successful",
                        'IsSuccess': true,
                        'Result': datay.data.detections["0"]["0"]
                    };
                    resolve(JSON.stringify(json));
                } else {
                    console.log(datay.error);
                    console.log(datay.error.message);
                    let jsonString = messageFormatter.FormatMessage(datay.error.message, "Detect language has failed. " + datay.error.message, false, undefined);
                    reject(jsonString);
                }
            } catch (excep) {
                console.log(excep);
                reject(excep);
            }
        });
    });
}


module.exports.Translate = async function (key, text, targetlanguage) {
    // This translates the given text into the given language

    let result = await Translate(key, text, targetlanguage).catch(function (error) {
        console.log(error);
        res(error);
        return;
    });
    return result;
}

let Translate = (key, text, targetlanguage) => {

    console.log("Translate Internal method ");

    return new Promise((resolve, reject) => {

        let uri = "https://translation.googleapis.com/language/translate/v2?key=" + key + "&q=" + text + "&target=" + targetlanguage + "&format=text";
        uri = encodeURI(uri);

        console.log(uri);
        console.log(text);

        request({
            rejectUnauthorized: false,
            method: "POST",
            url: uri,
            headers: {
                'Content-Type': 'application/json'
            },
        }, function (_error, _response, datax) {

            console.log(_error);
            console.log(_response.statusCode);
            // console.log(datax);
            // console.log(JSON.parse(datax).data);
            // console.log(datax.error);

            let datay = JSON.parse(datax);
            console.log(datay);
            try {
                if (!_error && _response && _response.statusCode === 200) {
                    var json = {
                        'CustomMessage': "Translate is successful",
                        'IsSuccess': true,
                        'Result': datay.data.translations["0"],
                        'DetectedSourceLanguage' : datay.data.translations["detectedSourceLanguage"]
                    };
                    resolve(JSON.stringify(json));
                } else {
                    console.log(datay.error);
                    console.log(datay.error.message);
                    let jsonString = messageFormatter.FormatMessage(datay.error.message, "Translate has failed. " + datay.error.message, false, undefined);
                    reject(jsonString);
                }
            } catch (excep) {
                console.log(excep);
                reject(excep);
            }
        });
    });
}