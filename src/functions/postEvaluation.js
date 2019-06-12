import {post} from "./fetchSystem";

export function postEvaluation(data, token){
  return post("/evaluation",data,token).then(res => {
    return res.json();
  })
}


