import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
// import Jobs from './components/Jobs';
import Jobs from "./containers/Jobs";
import Dakoku from "./containers/Dakoku";
import JobsLink from "./containers/JobsLink";

// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="application">
        
          {/* idと現在の日付を受け取るものに差し替え */}
          <JobsLink />

          <Route
            path="/dakoku/:id"
            render={({ match }) => <Dakoku id={match.params.id} />}
          />
          <Route
            path="/jobs/:id/:year/:month"
            render={({ match }) => (
              <Jobs
                id={match.params.id}
                year={match.params.year}
                month={match.params.month}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
