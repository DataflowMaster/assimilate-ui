class auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
  }

  logout(cb) {
    this.authenticated = false;
  }

  isAuthenticated = () => {
    return this.authenticated
  }
}

const cr = new auth();

export default cr;
