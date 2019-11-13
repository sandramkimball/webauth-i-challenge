import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


//COMPONENTS
import Login from './components/login';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
    <div className="App">
        <nav>
          <li><Link to='/'>Login</Link></li>
          <li><Link to='/users'>Users</Link></li>
        </nav>
      <section>
        <h2>A warrior tale is but half told when only one person tells it!</h2>
        <Switch>
          <Route exact path='/' component={Login}/>
          {<Route exact path='/users' component={UserList}/>}
        </Switch>
      </section>
    </div>
    </Router>
  );
}

export default App;
