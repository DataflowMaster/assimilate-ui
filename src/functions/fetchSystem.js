let l = window.location;
let address = l.protocol+"//"+l.hostname+':8080';
console.log(address)
export function post(service,data,token){
  token = (typeof token === "undefined" )? "" : 'Bearer '+ token;
  return fetch(address+service,
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
}

export function get(service,token) {
  return fetch(address+service,{
    method: 'GET',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: '' // include, *same-origin, omit
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
}
