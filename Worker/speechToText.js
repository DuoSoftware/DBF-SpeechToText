const messageFormatter = require('dvp-common-lite/CommonMessageGenerator/ClientMessageJsonFormatter.js');
const request = require('request');
const fs = require('fs');

module.exports.speechToTextConversionURI = async function(req, res) {
    // This converts the audio of the file in given URI
    // var company = parseInt(req.user.company);
    // var tenant = parseInt(req.user.tenant);

    let textData = await speechToTextConversionsURI(req.URI, req.key, req.languageCode).catch(function(textError) {
        console.log(textError);
        res(textError);
        return;
    });
    res(textData);
}

let speechToTextConversionsURI = (URI, key, languageCode) => {
    // "uri": "gs://cloud-samples-tests/speech/brooklyn.flac"
    return new Promise((resolve, reject) => {
        let API_KEY = key;
        // let audioData = fs.readFileSync("./Resources/brooklyn.flac").toString('base64');
        // console.log(audioData);
        var myObj = {
            "config": {
                "encoding": "FLAC",
                "languageCode": languageCode
            },
            "audio": {
                "uri": URI
            }
        };
        var myJSON = JSON.stringify(myObj);

        let uri = "https://speech.googleapis.com/v1/speech:recognize?key=" + API_KEY;
        uri = encodeURI(uri);
        request({
            method: "POST",
            url: uri,
            body: myJSON
        }, function(_error, _response) {
            console.log(_response);
            try {
                if (_error) {
                    console.log(_error);
                    let jsonString = messageFormatter.FormatMessage(undefined, "Speech to text has failed", false, undefined);
                    reject(jsonString);
                } else {
                    if (_response.body !== "" && _response.body !== undefined) {

                        let decodedData = JSON.parse(_response.body);

                        if (decodedData.error !== undefined) {
                            console.log(decodedData.error.message);
                            let jsonString = messageFormatter.FormatMessage(undefined, "Speech to text has failed", false, undefined);
                            reject(jsonString);
                        } else {
                            var json = {
                                'confidence': decodedData.results[0].alternatives[0].confidence,
                                'CustomMessage': "Speech to text is successful",
                                'IsSuccess': true,
                                'Result': decodedData.results[0].alternatives[0].transcript
                            };
                            resolve(JSON.stringify(json));
                            // let jsonString = messageFormatter.FormatMessage(undefined, "Speech to text is successful", true, decodedData.results[0].alternatives[0].transcript);
                            // resolve(jsonString);
                        }
                    } else {
                        let jsonString = messageFormatter.FormatMessage(undefined, "Speech to text did not return any data", false, undefined);
                        reject(jsonString);
                    }

                }
            } catch (excep) {
                console.log(excep);
                let jsonString = messageFormatter.FormatMessage(excep, "Speech to text has failed", false, undefined);
                reject(jsonString);
            }
        });
    });
}

module.exports.speechToTextConversionBase64 = async function(req, res) {
    // This converts the audio of the file data sent as base64 encoded data
    // var company = parseInt(req.user.company);
    // var tenant = parseInt(req.user.tenant);

    let textData = await speechToTextConversionsBase64(req.audioData, req.key, req.languageCode).catch(function(textError) {
        console.log(textError);
        res(textError);
        return;
    });
    res(textData);
}

let speechToTextConversionsBase64 = (audioData, key, languageCode) => {
    return new Promise((resolve, reject) => {
        let API_KEY = key;
        // let audioData = fs.readFileSync("./Resources/brooklyn.flac").toString('base64');
        // console.log(audioData);
        var myObj = {
            "config": {
                "encoding": "FLAC",
                "languageCode": languageCode
            },
            "audio": {
                "content": audioData
            }
        };
        var myJSON = JSON.stringify(myObj);

        let uri = "https://speech.googleapis.com/v1/speech:recognize?key=" + API_KEY;
        uri = encodeURI(uri);
        request({
            method: "POST",
            url: uri,
            body: myJSON
        }, function(_error, _response) {
            try {
                if (_error) {
                    console.log(_error);
                    let jsonString = messageFormatter.FormatMessage(undefined, "Speech to text has failed", false, undefined);
                    reject(jsonString);
                } else {
                    if (_response.body !== "" && _response.body !== undefined) {

                        let decodedData = JSON.parse(_response.body);

                        if (decodedData.error !== undefined) {
                            console.log(decodedData.error.message);
                            let jsonString = messageFormatter.FormatMessage(undefined, "Speech to text has failed", false, undefined);
                            reject(jsonString);
                        } else {
                            var json = {
                                'confidence': decodedData.results[0].alternatives[0].confidence,
                                'CustomMessage': "Speech to text is successful",
                                'IsSuccess': true,
                                'Result': decodedData.results[0].alternatives[0].transcript
                            };
                            resolve(JSON.stringify(json));
                            // let jsonString = messageFormatter.FormatMessage(undefined, "Speech to text is successful", true, decodedData.results[0].alternatives[0].transcript);
                            // resolve(jsonString);
                        }
                    } else {
                        let jsonString = messageFormatter.FormatMessage(undefined, "Speech to text did not return any data", false, undefined);
                        reject(jsonString);
                    }

                }
            } catch (excep) {
                console.log(excep);
                let jsonString = messageFormatter.FormatMessage(excep, "Speech to text has failed", false, undefined);
                reject(jsonString);
            }
        });
    });
}

module.exports.textToSpeechConversion = async function(req, res) {
    // This converts the audio of the file data sent as base64 encoded data
    // var company = parseInt(req.user.company);
    // var tenant = parseInt(req.user.tenant);

    let textData = await textToSpeechConversions(req.text, req.key, req.languageCode).catch(function(textError) {
        console.log(textError);
        res(textError);
        return;
    });
    res(textData);
}

let textToSpeechConversions = (text, key, languageCode) => {
    return new Promise((resolve, reject) => {
        let API_KEY = key;
        // let audioData = fs.readFileSync("./Resources/brooklyn.flac").toString('base64');
        // console.log(audioData);
        var myObj = {
            'input': {
                'text': text
            },
            'voice': {
                'languageCode': languageCode,
                'ssmlGender': 'FEMALE'
            },
            'audioConfig': {
                'audioEncoding': 'MP3'
            }
        };
        var myJSON = JSON.stringify(myObj);

        let uri = "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + API_KEY;
        uri = encodeURI(uri);
        request({
            method: "POST",
            url: uri,
            body: myJSON
        }, function(_error, _response) {
            console.log(_error);
            console.log(_response);
            try {
                if (_error) {
                    console.log(_error);
                    let jsonString = messageFormatter.FormatMessage(undefined, "Text to speech has failed", false, undefined);
                    reject(jsonString);
                } else {
                    if (_response.body !== "" && _response.body !== undefined) {
                        let decodedData = JSON.parse(_response.body);

                        if (decodedData.error !== undefined) {
                            console.log(decodedData.error.message);
                            let jsonString = messageFormatter.FormatMessage(undefined, "Text to speech has failed", false, undefined);
                            reject(jsonString);
                        } else {
                            // fs.writeFileSync("out.mp3", decodedData.audioContent, 'base64', function(err) {
                            //     console.log(err);
                            // });

                            var json = {
                                'CustomMessage': "Text to speech is successful",
                                'IsSuccess': true,
                                'Result': decodedData.audioContent
                            };
                            resolve(JSON.stringify(json));

                            // let jsonString = messageFormatter.FormatMessage(undefined, "Text to speech is successful", true, decodedData.audioContent);
                            // resolve(jsonString);
                        }

                    } else {
                        let jsonString = messageFormatter.FormatMessage(undefined, "Text to speech did not return any data", false, undefined);
                        reject(jsonString);
                    }
                }
            } catch (excep) {
                console.log(excep);
                let jsonString = messageFormatter.FormatMessage(excep, "Text to speech has failed", false, undefined);
                reject(jsonString);
            }
        });
    });
}