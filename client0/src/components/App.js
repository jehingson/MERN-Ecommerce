import React, { Suspense} from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Auth from '../hoc/auth';
import NavBar from "./views/NavBar/NavBar";
import LandigPage from './views/LandigPage/LandigPage.js';
import LoginPage from './views/LoginPage/LoginPage.js'
import RegisterPage from './views/RegisterPage/RegisterPage.js'

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
    <Switch>
      <Route exact path="/" component={Auth(LandigPage, null)} />
      <Route exact path="/login" component={Auth(LoginPage, false)} />
      <Route exact path="/register" component={Auth(RegisterPage, false)} />
    </Switch>
      </div>
      </Suspense>
  );
}

export default App;
