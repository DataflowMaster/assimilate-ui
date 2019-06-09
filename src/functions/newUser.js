import {post} from "./fetchSystem";

export function newUser(data){
  post("/newUser",data).then(res => {
    return res.json();
  }).then( result => {
    console.log(result)
  })
}


