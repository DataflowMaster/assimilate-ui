import {post} from "./fetchSystem";

export function postAbility(data, token){
  return post("/ability",data,token).then(res => {
    return res.json();
  })
}


