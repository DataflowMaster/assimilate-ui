import {post} from "./fetchSystem";

export function newUser(data,token){
  post("/newUser",data,token).then(res => {
    return res.json();
  }).then( result => {
    console.log(result)
  })
}


