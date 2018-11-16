import React from 'react';
import PropTypes from 'prop-types';
import {Alert,Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';


// export default function Jobs({id,year,month}){
export default class Jobs extends React.Component {
    componentWillMount(){
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

            <div>
                {(() => {
                    if(error){
                        return <p>エラーが発生しました</p>;
                    } else if(typeof kintais === 'undefined'){
                        return <p> 読み込み中…　</p>;
                    } else {
                        return (
                            <div>
                                <div>
                                <Link to={getLastMonthUrl(id,year,month)}>前月</Link>
                                {year}/{month}
                                <Link to={getNextMonthUrl(id,year,month)}>来月</Link>
                                </div>

                            <Table >
                                <tbody>
                                <tr>
                                    <th>日付</th>
                                    <th>出勤</th>
                                    <th>退勤</th>
                                    <th>休憩開始</th>
                                    <th>休憩終了</th>
                                    <th>総労働時間</th>
                                    <th>休憩時間</th>
                                    <th>残業時間</th>
                                </tr>

                                {kintais.map( (item,index) => (
                                    <tr key={`${item.date}_row`} className={(item.jobStateCode==0 && (!item.startTime)) ? "table-danger" : ""}>
                                        <td key={`${item.date}_date`}> {item.date}({item.dayOfWeek})</td>
                                        {/* <td key={`${item.date}_start`}> {item.startTime}</td> */}
                                        <td key={`${item.date}_start`}> 
                                            <input type="text" disabled={(item.startTime == "-") ? "disabled" : ""} name="startTime" value={item.startTime} className={(item.startTimeValidate) ? "form-control" : "form-control is-invalid"}
                                                onChange={(e) => this.props.execValidation(index,kintais,e.target.name, e.target.value, e.type,item.jobStateCode)}
                                                onBlur={(e) => this.props.execValidation(index, kintais,e.target.name,e.target.value,e.type,item.jobStateCode)}  required />
                                                <div className="invalid-feedback">
                                                    {item.startTimeMessages}
                                                </div>
                                        </td>
                                        <td key={`${item.date}_end`}> {item.endTime}</td>
                                        <td key={`${item.date}_restStart`}> {item.restStartTime}</td>
                                        <td key={`${item.date}_restEnd`}> {item.restEndTime}</td>
                                        <td key={`${item.date}_workPerDay`}>{item.workPerDay} </td>
                                        <td key={`${item.date}_restPerDay`}> {item.restPerDay}</td>
                                        <td key={`${item.date}_overTimePerDay`}> {item.overTimePerDay}</td>
                                    </tr>
                                    // <Kintai key={`${index}_k`} index={`${index}`} date={`${item.date}`} dayOfWeek={`${item.dayOfWeek}`} startTime={`${item.startTime}`} entTime={`${item.entTime}`}
                                    //     restStartTime={`${item.restStartTime}`} restEndTime={`${item.restEndTime}`} workPerDay={`${item.workPerDay}`}
                                    //     restPerDay={`${item.restPerDay}`} overTimePerDay={`${item.overTimePerDay}`} jobStateCode={`${item.jobStateCode}`}/>
                                ))}
                                </tbody>
                            </Table>
                            <p>月の残業時間合計：　{monthOverTime} h </p>
                            </div>
                        );
                    }
                })()}
            </div>         
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

