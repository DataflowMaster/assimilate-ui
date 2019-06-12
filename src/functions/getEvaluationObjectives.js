import {get} from "./fetchSystem";

export function getEvaluationObjectives(token,idmod){
  return get("/evaluationObjectives/"+idmod,token).then((result)=>{
    return result.json()
  });
}
