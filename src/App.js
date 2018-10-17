import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
// import Jobs from './components/Jobs';
import Jobs from './containers/Jobs';
import Dakoku from './components/Dakoku';

// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* TODO: idと現在のyear, month を取得するように */}
        <ul>
          <li><Link to="/dakoku">打刻画面へ</Link></li>
          <li><Link to="/jobs/1/2018/06">勤怠一覧表示</Link></li>
        </ul>

        <Route path="/dakoku" component={Dakoku} />
        <Route 
          path="/jobs/:id/:year/:month"
          render={
            ({match}) => <Jobs id={match.params.id} year={match.params.year}
                              month={match.params.month} />
          }
          />
      </div>
    );
  }
}

export default App;
