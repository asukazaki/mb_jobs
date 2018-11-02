import React from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as jobsActions from '../actions/Jobs';

// function Navi({id,year,month,goToLastMonth,goToNextMonth}){
// class Navi extends React.Component {
export default function Navi ({id, year, month,goToLastMonth,goToNextMonth}){

    // componentWillMount(){
    //     this.props.onMount(this.props.id,this.props.year,this.props.month);
    // }
    // constructor(props){
    //     super(props);
    //     // this.state.id = props.id;
    //     // this.state.year=props.year;
    //     // this.state.month=props.month;
    // }

    // render() {
    // const{id,year,month,goToLastMonth,goToNextMonth} = this.props;
    return(
        <div>
            <button onClick={() => goToLastMonth(`${id}`,`${year}`,`${month}`)}>先月</button>
            <button onClick={() => goToNextMonth(`${id}`,`${year}`,`${month}`)}>来月</button>
            < br/>
            月の残業時間とか
        </div>
    );
    // }
}



Navi.PropTypes ={
    id:PropTypes.number,
    year:PropTypes.string,
    month:PropTypes.string,
    goToLastMonth:PropTypes.func,
    goToNextMonth:PropTypes.func
    // onMount:PropTypes.func.isRequired,
}

// const mapStateToProps = (state, ownProps) => ({
//     id: state.id,
//     year:state.year,
//     month: state.month
// });

// const mapDispatchToProps = dispatch => ({
//     // return {
//         goToLastMonth(id,year,month){
            
//             dispatch(jobsActions.fetchJobs(id,year,month))
//         },
//         goToNextMonth(id,year,month){
//             var nextMonth = ("00" + String((Number(month)+1))).slice(-2)
//             dispatch(jobsActions.fetchJobs(id,year,nextMonth))
//         }
//     // };
// })

Navi.defaultProps = {
    id : 1,
    year : new Date().getFullYear,
    month : ("00"+String((new Date().getMonth+1))).slice(-2)
};

// export default connect(mapStateToProps, mapDispatchToProps)(Navi);