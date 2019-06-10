import {get} from "./fetchSystem";

export function getModules(token,iduser){
  return get("/modules/"+iduser,token).then((result)=>{
    return result.json()
  });
}
