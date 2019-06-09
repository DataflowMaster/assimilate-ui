import {get} from "./fetchSystem";

export function getStudents(token) {
  return get("/students",token).then((result)=>{
    return result.json()
  });
}
