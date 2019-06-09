import {get} from "./fetchSystem";

export function getModules(token){
  return get("/modules",token).then((result)=>{
    return result.json()
  });
}
