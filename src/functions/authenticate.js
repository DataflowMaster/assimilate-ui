import {post} from "./fetchSystem";

class authenticate {
  constructor() {
    this.authenticated = false;
    this.user = {};
  }

  login(user,pass) {
    return post("/auth", {
      username : user,
      password : pass
    }).then(request =>{

      return request.json();
    }).then( result => {
      if(typeof result.token === "undefined"){
        return "error"
      }else{
        this.user = result;
        this.authenticated = true;
      }
    })
  }

  isAuthenticated = () => {
    return this.authenticated
  }

  getuser = () => {
    return this.user;
  }
}
const auth = new authenticate();
export default auth;
