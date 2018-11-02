import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
// import Jobs from './components/Jobs';
import Jobs from './containers/Jobs';
import Dakoku from './components/Dakoku';
import Navi from './containers/Navi';


// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <div className="App">
        {/* TODO: idと現在のyear, month を取得するように */}
          <Link to="/dakoku">打刻画面へ</Link><br />

           <Navi />

          <Link to="/jobs/1/">勤怠一覧表示</Link>

        <Route path="/dakoku" component={Dakoku} />
        <Route 
          path="/jobs/:id/"
          render={
            ({match}) => <Jobs id={match.params.id} />
          }
          />
      </div>

      </div>
    );
  }
}

export default App;
