const YAML = require('yamljs');
const constants = require('./constants');

const flattenValuesToString = function (values) {
    var valuesString = '';
    var subValueString = '';
    for (var valueSet in values) {
        if (values.hasOwnProperty(valueSet)) {
            if(typeof(values[valueSet])=== 'object'){
                for(var value in values[valueSet]){
                    var subValue = value.replace(/\./g, '\\.')
                    subValueString += `${valueSet}."${value}"=${subValue},`
                }
            }
            else{
                valuesString += `${valueSet}=${values[valueSet]},`;
            }
        }
    }
    valuesString += subValueString
    return valuesString;
};

const flattenObject = function (obj) {
    var toReturn = {};
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;

        if (typeof obj[i] == "object") {
            var flatObject = flattenObject(obj[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + "." + x] = flatObject[x];
            }
        } else {
            toReturn[i] = obj[i];
        }
    }
    return toReturn;
};

function parseResponseToJson(rawData) {
    try {
        var splitedData = rawData.split(constants.HelmResponseDelimiter);
        var jsonData = splitedData.map(function (responseYml) {
            return YAML.parse(responseYml);
        });
        return jsonData;
    }
    catch (e) {
        console.log("could not parse helm response with error: " + e.message);
        //ignore        
        return rawData;
    }
}

module.exports = {
    flattenValuesToString: flattenValuesToString,
    flattenObject: flattenObject,
    parseResponseToJson: parseResponseToJson
};