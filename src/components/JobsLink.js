import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import '../css/common.css';

export default function JobsLink({ id, year, month }) {
  // id の受け取り方はOAuth読んでから

  return (
            /* <ul>
        <li>
          <Link to={`/dakoku/${id}`}> 打刻画面</Link>
        </li>
        <li>
          <Link to={`/jobs/${id}/${year}/${month}`}>勤怠一覧画面</Link>
        </li>
      </ul> */
      <nav className="side-nav">
        <div className="logo">
          <span>ITI</span>
        </div>
        <div className="category-list-wrapper">
          <ul className="category-list">
            <li className="category-list__item">
              <div className="category-title">
                <span>mypage</span>
              </div>
              <div className="category__item">
                <span>マイページ</span>
                <ul className="category-list-inner">
                  <li className="category__item-list">
                  <Link to={`/dakoku/${id}`}> 打刻画面</Link>
                  </li>
                  <li className="category__item-list">
                  <Link to={`/jobs/${id}/${year}/${month}`}>勤怠一覧画面</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>

  );
}

JobsLink.PropTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired
};
