let apiUrl = "https://tecmrdd5mi.execute-api.us-east-1.amazonaws.com/dev";
let xapikey = "ITEdpYmxd29yhWvXwmW07IUHyLtJaPZ1gmRDDGZ4";
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