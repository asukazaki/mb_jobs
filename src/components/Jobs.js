import React from 'react';
import PropTypes from 'prop-types';
import {Alert,Table} from 'react-bootstrap';
import {Route,Link} from 'react-router-dom';
import  * as JobsAA from '../containers/Jobs';

// export default function Jobs({id,year,month}){
export default class Jobs extends React.Component {
    componentWillMount(){
        this.props.onMount(this.props.id,this.props.year,this.props.month);
    }
    componentWillReceiveProps(nextProps){
        if(this.props.id !== nextProps.id){
            // ページ遷移発生
            this.props.onUpdate(nextProps.id,nextProps.year,nextProps.month);
        }
    }

    render(){
        const {kintais, monthOverTime,error} = this.props;
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
                                <Link to="/jobs/1/2018/05">前月</Link>
                                2018/06
                                <Link to="/jobs/1/2018/07">来月</Link>
                                <Route 
                                    path="/jobs/:id"
                                    render={
                                        ({match}) => <JobsAA id={match.params.id} year={match.params.year}
                                                        month={match.params.month} />
                                    }
                                    />
                                </div>
                                <Alert bsStyle="danger">
                                    <strong>BootStrapのサンプルです!</strong> Best check yo self, you're not looking too
                                    good.
                                </Alert>
                            <Table striped>
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

                                {kintais.map(item => (
                                    <tr key={`${item.date}_row`}>
                                        <td key={`${item.date}_date`}> {item.date}({item.dayOfWeek})</td>
                                        <td key={`${item.date}_start`}> {item.startTime}</td>
                                        <td key={`${item.date}_end`}> {item.endTime}</td>
                                        <td key={`${item.date}_restStart`}> {item.restStartTime}</td>
                                        <td key={`${item.date}_restEnd`}> {item.restEndTime}</td>
                                        <td key={`${item.date}_workPerDay`}>{item.workPerDay} </td>
                                        <td key={`${item.date}_restPerDay`}> {item.restPerDay}</td>
                                        <td key={`${item.date}_overTimePerDay`}> {item.overTimePerDay}</td>
                                    </tr>
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

// TODO: id だけ受け取って、デフォルトは今の月とかにしたい
Jobs.defaultProps = {
    id : 1,
    year : "2018",
    month : "06"
};