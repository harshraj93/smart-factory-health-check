let apiUrl = "https://dev.sfhcapp.com/dev-";
let xapikey = "ITEdpYmxd29yhWvXwmW07IUHyLtJaPZ1gmRDDGZ4";
// let apiUrl = "https://dev.sfhcapp.com/qa-";
// let xapikey = "ITEdpYmxd29yhWvXwmW07IUHyLtJaPZ1gmRDDGZ4";
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