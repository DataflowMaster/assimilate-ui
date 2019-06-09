import {get} from "./fetchSystem";

export function getAbilities(token){
  return get("/abilities",token).then((result)=>{
    return result.json()
  });
}
