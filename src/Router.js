import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ShowRoom from './components/ShowRoom';
import NavBar from './components/NavBar'
import StocksDashboard from './components/StocksDashboard'
import User from './components/User'
import Login from './components/Login'
import useToken from './components/useToken';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.


export default function BasicExample() {
  const {token, setToken} = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  } else {
    return (
      <Router >
        <div >
          <NavBar/>
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch >
            <Route exact path="/">
              <StocksDashboard />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/showroom">
              <ShowRoom />
            </Route>
            <Route path="/login">
              <User />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

}

// You can think of these components as "pages"
// in your app.

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

