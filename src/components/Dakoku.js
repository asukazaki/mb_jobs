import React from "react";
import PropTypes from "prop-types";

import "../css/common.css";
import "../css/dakoku.css";

export default class Dakoku extends React.Component {
  render() {
      const {id,messages,postDakoku} = this.props;
    return (
        <div className="application">
        <aside className="side-area time">

            <div className="date-wrapper">
                <div className="date">2018/11/13(火)</div>

                <div className="time">08:48</div>
                <button className="dakoku-edit">打刻修正</button>
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
};
