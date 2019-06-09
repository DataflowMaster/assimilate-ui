import {get} from "./fetchSystem";

export function getMethods(token){
  return get("/methods",token).then((result)=>{
    return result.json()
  });
}
