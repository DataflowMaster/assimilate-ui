import {get} from "./fetchSystem";

export function getStudents(token,iduser) {
  return get("/students/"+iduser,token).then((result)=>{
    return result.json()
  });
}
