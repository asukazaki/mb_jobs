import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function JobsLink({ id, year, month }) {
  // id の受け取り方はOAuth読んでから

  return (
    <div>
      <ul>
        <li>
          <Link to={`/dakoku/${id}`}> 打刻画面</Link>
        </li>
        <li>
          <Link to={`/jobs/${id}/${year}/${month}`}>勤怠一覧画面</Link>
        </li>
      </ul>
    </div>
  );
}

JobsLink.PropTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired
};
