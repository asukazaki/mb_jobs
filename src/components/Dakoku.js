import React from "react";
import PropTypes from "prop-types";

import "../css/common.css";
import "../css/dakoku.css";

export default class Dakoku extends React.Component {
  componentWillMount(){
    this.props.startClock();
  }

  render() {
      const {id,year,month,day,hh,mm,ss,messages,postDakoku} = this.props;
    return (
        <div className="application">
        <aside className="side-area time">

            <div className="date-wrapper">
                <div className="date">{year}/{month}/{day}</div>

                <div className="time">{hh}:{mm}:{ss}</div>
                <ul>
                    {messages.map((m,index) => (
                        <li key={index}>{m}</li>
                    ))}
                </ul>
            </div>
        </aside>

        <main className="content time">
            <div className="dakoku-buttun-wrapper">
                <ul>
                    <li className="shutaikin">
                        <button className="shukkin" onClick={(e) => postDakoku(id,'SYUKKIN')}>出勤</button>
                        <button className="taikin">退勤</button>
                    </li>
                    <li className="kyukei">
                        <button className="kyukei-start">休憩開始</button>
                        <button className="kyukei-end">休憩終了</button>
                    </li>
                </ul>
            </div>
        </main>
      </div>
    );
  }
}

Dakoku.PropTypes = {
  id: PropTypes.number
//   messages : []
};

Dakoku.defaultProps = {
  id : 1,
  messgaes : [],
  year: new Date().getFullYear(),
  month: `00${new Date().getMonth()+1}`.slice(-2),
  day : ("00" + String(new Date().getDate())).slice(-2),
  hh: ("00" + String(new Date().getHours())).slice(-2),
  mm: ("00" + String(new Date().getMinutes())).slice(-2),
  ss: ("00" + String(new Date().getSeconds())).slice(-2)
};
