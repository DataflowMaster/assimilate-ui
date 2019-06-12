import {post} from "./fetchSystem";

export function postModule(data, token){
  return post("/module",data,token).then(res => {
    return res.json();
  })
}


