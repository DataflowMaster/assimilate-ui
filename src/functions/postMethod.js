import {post} from "./fetchSystem";

export function postMethod(data, token){
  return post("/method",data,token).then(res => {
    return res.json();
  })
}


