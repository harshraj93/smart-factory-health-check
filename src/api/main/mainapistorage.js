let apiUrl = "https://4n8f11s940.execute-api.us-east-1.amazonaws.com/dev";
let xapikey = "ITEdpYmxd29yhWvXwmW07IUHyLtJaPZ1gmRDDGZ4";
let apiGetHeader = JSON.stringify({
    method:'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': xapikey,
    }
})


let apiPostHeader = JSON.stringify({
    method:'POST',
    headers:{
    'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': xapikey,
    }
})


export {
    apiUrl,apiGetHeader,apiPostHeader
}