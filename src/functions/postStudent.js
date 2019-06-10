import {post} from "./fetchSystem";

export function postStudent(data, token){
  return post("/student",data,token).then(res => {
    return res.json();
  })
}


