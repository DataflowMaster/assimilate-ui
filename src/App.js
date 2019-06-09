import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import auth from './functions/authenticate';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Assimilate/Login'));
const Register = React.lazy(() => import('./views/Assimilate/Register'));
const Page404 = React.lazy(() => import('./views/Assimilate/Page404'));
const Page500 = React.lazy(() => import('./views/Assimilate/Page500'));

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn || false,
      user : props.user || {}
    };
  }
  onLoginButtonClick (user,pass) {
    auth.login(user,pass).then(() => {
      this.setState({
        loggedIn:auth.isAuthenticated(),
        user : auth.getuser()
      });
      console.log(user)
    })
  }

  onLogOutButtonClick(){
    this.setState({ loggedIn:false })
  }

  getUser(){
    return this.state.user;
  }

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={(props) => {
                if(this.state.loggedIn){
                  return (<DefaultLayout {...props} onButtonClick={()=> { this.onLogOutButtonClick()}} user={this.getUser()} />);
                }else{
                  return (<Login  {...props} onButtonClick={(user,pass) => { return this.onLoginButtonClick(user,pass) }} />);
                }
              }} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
