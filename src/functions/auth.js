class auth {
  constructor() {
    this.authenticated = false;
  }

  login(user,pass) {
    if(user === "admin" && pass === "admin")
      this.authenticated = true
    else
      return "Fail to connection. Try again"
  }

  isAuthenticated = () => {
    return this.authenticated
  }
}

const cr = new auth();

export default cr;
