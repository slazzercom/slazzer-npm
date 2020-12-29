const axios = require('axios');
var fs = require('fs');
const FormData = require('form-data');

const settings = {
    "endpointPath": "https://slazzer.com/api/v1/remove_image_background"
}

function createFileObject(imagePath){;
    return fs.createReadStream(imagePath)
}

function endpointHeader(apiKey, formdata){
    return {
        headers: {
            'Content-Type':'multipart/form-data; boundary=' + formdata.getBoundary(),
            'API-KEY': apiKey
        }
    }
}

function fileObjectVerify(object, formdata){
    if(object.hasOwnProperty('imgLocalPath') && object['imgLocalPath'] != ''){
        formdata.append('source_image_file', createFileObject(object.imgLocalPath));
        object.hasOwnProperty('imgFormat') && object['imgFormat'] != '' ? formdata.append('format', object['imgFormat']) : null
        object.hasOwnProperty('bgColor') && object['bgColor'] != '' ? formdata.append('bg_color_code', object['bgColor']) : null
        object.hasOwnProperty('isOutputBase64') && object['isOutputBase64'] == true ? formdata.append('output_image_format', 'base64') : null
        object.hasOwnProperty('isPreview') && object['isPreview'] == true ? formdata.append('preview', 'true') : null
        object.hasOwnProperty('isCrop') && object['isCrop'] == true ? formdata.append('crop', 'true') : null
        
        object.hasOwnProperty('bgImageLocalPath') && object['bgImageLocalPath'] != '' ? formdata.append('bg_image_file', createFileObject(object.bgImageLocalPath)) : null
        object.hasOwnProperty('bgImageUrl') && object['bgImageUrl'] != '' ? formdata.append('bg_image_url', object['bgImageUrl']) : null
        object.hasOwnProperty('bgImageBase64') && object['bgImageBase64'] != '' ? formdata.append('bg_image_base64', object['bgImageBase64']) : null
    }
return formdata
}

function urlObjectVerify(object, formdata){
    if(object.hasOwnProperty('imgPath') && object['imgPath'] != ''){
        formdata.append('source_image_url', object['imgPath']);
        object.hasOwnProperty('imgFormat') && object['imgFormat'] != '' ? formdata.append('format', object['imgFormat']) : null
        object.hasOwnProperty('bgColor') && object['bgColor'] != '' ? formdata.append('bg_color_code', object['bgColor']) : null
        object.hasOwnProperty('isOutputBase64') && object['isOutputBase64'] == true ? formdata.append('output_image_format', 'base64') : null
        object.hasOwnProperty('isPreview') && object['isPreview'] == true ? formdata.append('preview', 'true') : null
        object.hasOwnProperty('isCrop') && object['isCrop'] == true ? formdata.append('crop', 'true') : null
        
        object.hasOwnProperty('bgImageLocalPath') && object['bgImageLocalPath'] != '' ? formdata.append('bg_image_file', createFileObject(object.bgImageLocalPath)) : null
        object.hasOwnProperty('bgImageUrl') && object['bgImageUrl'] != '' ? formdata.append('bg_image_url', object['bgImageUrl']) : null
        object.hasOwnProperty('bgImageBase64') && object['bgImageBase64'] != '' ? formdata.append('bg_image_base64', object['bgImageBase64']) : null
    }
return formdata
}

function base64ObjectVerify(object, formdata){
    if(object.hasOwnProperty('imgBase64') && object['imgBase64'] != ''){
        formdata.append('source_image_base64', object['imgBase64']);
        object.hasOwnProperty('imgFormat') && object['imgFormat'] != '' ? formdata.append('format', object['imgFormat']) : null
        object.hasOwnProperty('bgColor') && object['bgColor'] != '' ? formdata.append('bg_color_code', object['bgColor']) : null
        object.hasOwnProperty('isOutputBase64') && object['isOutputBase64'] == true ? formdata.append('output_image_format', 'base64') : null
        object.hasOwnProperty('isPreview') && object['isPreview'] == true ? formdata.append('preview', 'true') : null
        object.hasOwnProperty('isCrop') && object['isCrop'] == true ? formdata.append('crop', 'true') : null
        
        object.hasOwnProperty('bgImageLocalPath') && object['bgImageLocalPath'] != '' ? formdata.append('bg_image_file', createFileObject(object.bgImageLocalPath)) : null
        object.hasOwnProperty('bgImageUrl') && object['bgImageUrl'] != '' ? formdata.append('bg_image_url', object['bgImageUrl']) : null
        object.hasOwnProperty('bgImageBase64') && object['bgImageBase64'] != '' ? formdata.append('bg_image_base64', object['bgImageBase64']) : null
    }
return formdata
}

async function removeBackgroundFromImgFile(object, apiKey){
    const formdata = new FormData;
    const fileEndpointFormdata = fileObjectVerify(object, formdata)
    const endpointObject = axios.post(
        settings.endpointPath, fileEndpointFormdata, endpointHeader(apiKey, formdata)
    );
    return endpointObject.then((response) => response.data).catch((error) => error.response.data);
}

function removeBackgroundFromImgUrl(object, apiKey){
    const formdata = new FormData;
    const urlEndpointObj = urlObjectVerify(object, formdata)
    const endpointObject = axios.post(
        settings.endpointPath, urlEndpointObj, endpointHeader(apiKey, formdata)
    );
    return endpointObject.then((response) => response.data).catch((error) => error.response.data);
}

async function removeBackgroundFromImgBase64(object, apiKey){
    const formdata = new FormData;
    const base64EndpointObj = base64ObjectVerify(object, formdata)

    const endpointObject = axios.post(
        settings.endpointPath, base64EndpointObj, endpointHeader(apiKey, formdata)
    );
    return endpointObject.then((response) => response.data).catch((error) => error.response.data);
}

module.exports = {
    removeBackgroundFromImgFile : removeBackgroundFromImgFile,
    removeBackgroundFromImgUrl : removeBackgroundFromImgUrl,
    removeBackgroundFromImgBase64 : removeBackgroundFromImgBase64
}