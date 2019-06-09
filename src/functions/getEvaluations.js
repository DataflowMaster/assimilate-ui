import {get} from "./fetchSystem";

export function getEvaluations(token){
  return get("/evaluations",token).then((result)=>{
    return result.json()
  });
}
