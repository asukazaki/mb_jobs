import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from "styled-components";

import '../css/common.css'
import '../css/kintai.css'

interface  ValidateProps {
    isValid?: boolean
}

const InputArea = styled.input`
  border-color: ${(props: ValidateProps) => props.isValid ? 'unset' : '#dc3545'};
`;

const Tr = styled.tr`
    background-color: ${(props:  ValidateProps) => props.isValid ? 'transparent' : '#f5c6cb'};
    border-bottom:1px #727171 solid;
`

const ValidateComment = styled.div`
    /* display: none; */
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
}
`

export default class Jobs extends React.Component {
    componentWillMount(){
        //document.body.style.overflow = "auto";
        this.props.onMount(this.props.id,this.props.year,this.props.month);
    }
    componentWillReceiveProps(nextProps){
        if(this.props.month !== nextProps.month || this.props.year !== nextProps.year){
            // ページ遷移発生
            this.props.onUpdate(nextProps.id,nextProps.year,nextProps.month);
        }
    }

    render(){
        const {id,year,month,kintais, monthOverTime,error} = this.props;
        return(

        <React.Fragment>
            <aside class="side-area">
                <div class="change-button">
                <Link to={getLastMonthUrl(id,year,month)}><button class="left arrow"></button></Link>
                <div>{year}/{month}</div>
                <Link to={getNextMonthUrl(id,year,month)}><button class="right arrow"></button></Link>
                </div>
                <div class="name">ITI 太郎</div>
                <div class="zangyo-summary">
                    <span>残業時間合計</span>
                    <table id="zangyo-summary-table" class="zangyo-summary-table">
                    <tbody><tr><th>今月</th></tr>
                <tr><td>--:--</td></tr>
                <tr><th>3か月</th></tr>
                <tr><td>--:--</td></tr>
                <tr><th>年間</th></tr>
                <tr><td>--:--</td></tr>
                </tbody></table>
                </div>

                <div id="dakoku-edit" class="dakoku-edit">
                    <button onClick={(e) => this.props.updateJobs(id,year,month,kintais)}>打刻修正</button>
                    <div class="result-message-area">
                        { error && <p>更新に失敗しました</p>}
                        { !error && <p> {this.props.updateMessages}</p>}
                    </div>
                </div>
            </aside>
            <main className="content">
                {(() => {
                    if(error){
                        return <p>エラーが発生しました</p>;
                    } else if(typeof kintais === 'undefined'){
                        return <p> 読み込み中…　</p>;
                    } else {
                        return (
                            <div>
                            <table class="kintai-main-table">
                            <thead class="kintai-main-table-header">
                            <tr class="kintai-main-table-header__row">
                            <th class="kintai-main-table-header__cell sticky">日付</th>
                            <th class="kintai-main-table-header__cell sticky">出勤</th>
                            <th class="kintai-main-table-header__cell sticky">退勤</th>
                            <th class="kintai-main-table-header__cell sticky">休憩開始</th>
                            <th class="kintai-main-table-header__cell sticky">休憩終了</th>
                            <th class="kintai-main-table-header__cell sticky">総労働時間</th>
                            <th class="kintai-main-table-header__cell sticky">休憩時間</th>
                            <th class="kintai-main-table-header__cell sticky">残業時間</th>
                            </tr>
                            </thead>
                                <tbody class="kintai-month-table-body">
                                {kintais.map((item,index) => (
                                    <Tr isValid={!item.dakokuError} key={`${item.date}_row`}>
                                        <td key={`${item.date}_date`} class={getDayOfWeek(item) + " kintai-month-table-body__cell"}> {item.date}({item.dayOfWeekDisplayName})<span class="input_error_msg">{item.holydayName}</span><span class="input_error_msg">{item.firstErrorMessage}</span></td>
                                        <td key={`${item.date}_start`} class="kintai-month-table-body__cell">
                                            <InputArea isValid={(item.startTimeValidate)} type="text" disabled={(item.futureDate) ? "disabled" : ""} name="startTime" value={item.startTime}
                                                       onChange={(e) => this.props.execValidation(index,kintais,e.target.name, e.target.value, e.type,item.jobStateCode)}
                                                       onBlur={(e) => this.props.execValidation(index, kintais,e.target.name,e.target.value,e.type,item.jobStateCode)} required />
                                                <ValidateComment>
                                                    {item.startTimeMessages}
                                                </ValidateComment>
                                        </td>
                                        <td key={`${item.date}_end`} class="kintai-month-table-body__cell">
                                            <InputArea isValid={(item.endTimeValidate)} type="text" disabled={(item.futureDate) ? "disabled" : ""} name="endTime" value={item.endTime}
                                                       onChange={(e) => this.props.execValidation(index,kintais,e.target.name, e.target.value, e.type,item.jobStateCode)}
                                                       onBlur={(e) => this.props.execValidation(index, kintais,e.target.name,e.target.value,e.type,item.jobStateCode)} required />
                                                <ValidateComment>
                                                    {item.endTimeMessages}
                                                </ValidateComment>
                                        </td>
                                        <td key={`${item.date}_restStart`} class="kintai-month-table-body__cell"> {item.restStartTime}</td>
                                        <td key={`${item.date}_restEnd`} class="kintai-month-table-body__cell"> {item.restEndTime}</td>
                                        <td key={`${item.date}_workPerDay`} class="kintai-month-table-body__cell">{item.workPerDay} </td>
                                        <td key={`${item.date}_restPerDay`} class="kintai-month-table-body__cell"> {item.restPerDay}</td>
                                        <td key={`${item.date}_overTimePerDay`} class="kintai-month-table-body__cell"> {item.overTimePerDay}</td>
                                    </Tr>
                                ))}
                                </tbody>
                            </table>
                            <p>月の残業時間合計：　{Math.floor(monthOverTime * Math.pow(10,1)) / Math.pow(10,1)} h </p>
                            </div>
                        );
                    }
                })()}
            </main>
        </React.Fragment>
        );
    }
}

Jobs.PropTypes ={
    id:PropTypes.number,
    year:PropTypes.string,
    month:PropTypes.string,
    onMount:PropTypes.func.isRequired,
    onUpdate:PropTypes.func.isRequired,

    kintais: PropTypes.arrayOf(
        PropTypes.shape({
            date:PropTypes.string.isRequired,
            startTime:PropTypes.string,
            entTime:PropTypes.string,
            restStartTime:PropTypes.string,
            restEndTime:PropTypes.string
        })
    ),
    monthOverTime:PropTypes.number,
    error:PropTypes.bool.isRequired
};

// TODO: default値のままの時のハンドリング
Jobs.defaultProps = {
    id : undefined,
    year : undefined,
    month : undefined
};

const getLastMonthUrl = (id,year,month) => {
    // 引数のdate
    var dt = new Date(year,(Number(month)-1),1);
    // 先月
    dt.setMonth(dt.getMonth() -1);
    // 表示上を合わせる(+1して０埋め)
    const lastMonth = ("00" + String((dt.getMonth()+1))).slice(-2);
    return `/jobs/${id}/${dt.getFullYear()}/${lastMonth}`
};

const getNextMonthUrl = (id,year,month) => {
    // 引数のdate
    var dt = new Date(year,(Number(month)-1),1);
    // 先月
    dt.setMonth(dt.getMonth() +1);
    // 表示上を合わせる(+1して０埋め)
    const nextMonth = ("00" + String((dt.getMonth()+1))).slice(-2);
    return `/jobs/${id}/${dt.getFullYear()}/${nextMonth}`
}

const getDayOfWeek = (item)=> {
    if(item.holiday){
        return "holiday"
    }else if(item.dayOfWeek === 6){
        return "saturday"
    } else if(item.dayOfWeek === 7){
        return "sunday"
    } else {
        return "" //undefinedだと困る時があるため
    }
}