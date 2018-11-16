import React from "react";
import PropTypes from "prop-types";

import "../css/common.css";
import "../css/dakoku.css";

export default class Dakoku extends React.Component {
  render() {
      const [id,messgaes,postDakoku] = this.props;
    return (
        <div class="application">
        <aside class="side-area">
            <div class="date-wrapper">
                <div class="date">2018/11/13(火)</div>
                <div class="time">08:48</div>
                <button class="dakoku-edit">打刻修正</button>
            </div>
        </aside>

        <main class="content">
            <div class="dakoku-buttun-wrapper">
                <ul>
                    <li class="shutaikin">
                        <button class="shukkin" onClick={(e) => postDakoku(id,'SYUKKIN')}>出勤</button>
                        <button class="taikin">退勤</button>
                    </li>
                    <li class="kyukei">
                        <button class="kyukei-start">休憩開始</button>
                        <button class="kyukei-end">休憩終了</button>
                    </li>
                </ul>
                <ul>
                    {messgaes.map((m) => {
                        <li>m</li>
                    })}
                </ul>
            </div>
        </main>
      </div>
    );
  }
}

Dakoku.PropTypes = {
//   id: PropTypes.number,
//   year: PropTypes.string,
//   month: PropTypes.string
};

Dakoku.defaultProps = {
  id : undefined,
  messgaes : [],
};
