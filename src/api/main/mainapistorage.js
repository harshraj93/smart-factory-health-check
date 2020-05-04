let apiUrl = "https://tecmrdd5mi.execute-api.us-east-1.amazonaws.com/dev";
let xapikey = "ITEdpYmxd29yhWvXwmW07IUHyLtJaPZ1gmRDDGZ4";
// let apiUrl = "https://8qdannxm3a.execute-api.us-east-1.amazonaws.com/qa";
// let xapikey = "AnPbnvmTFI70vB1MnyJek7eNK5NXgobZ4POkMYX2";
let apiGetHeader = {
    method:'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': xapikey,
    }
}


let apiPostHeader = {
    method:'POST',
    headers:{
        'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': xapikey,
    },
    body: {}
}


export {
    apiUrl,apiGetHeader,apiPostHeader
}