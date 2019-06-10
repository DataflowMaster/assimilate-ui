import {get} from "./fetchSystem";

export function getEvaluations(token,iduser){
  return get("/evaluations/"+iduser,token).then((result)=>{
    return result.json()
  });
}
