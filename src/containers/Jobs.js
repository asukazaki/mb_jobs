import {connect} from 'react-redux';
import Jobs from '../components/Jobs';
import * as actions from '../actions/Jobs';

/*
    component　から　store内のstateが参照できるように渡す。
    store:state => component:props
*/
const mapStateToProps = (state, ownProps) => ({
    id: ownProps.id,
    // year:ownProps.year,
    // month: ownProps.month,
    year: state.Jobs.year!==undefined ? state.Jobs.month : ownProps.year,
    month : state.Jobs.month!==undefined ? state.Jobs.month : ownProps.month,
    kintais:state.Jobs.kintais,
    monthOverTime:state.Jobs.monthOverTime,
    error:state.Jobs.error,
    updateMessages : state.Jobs.updateMessages!==undefined ? state.Jobs.updateMessages : "",
    canUpdateJobs : state.Jobs.canUpdateJobs,
});

/*
    component が store内のdispatch呼べるように渡す。
    onMount()とonUpdate()というメソッドとして渡している。
*/
const mapDispatchToProps = dispatch => ({
    // onMountとonUpdateとJobsを接続
    onMount(id,year,month){
        dispatch(actions.fetchJobs(id,year,month));
    },
    onUpdate (id,year,month){
        dispatch(actions.fetchJobs(id,year,month))
    },
    execValidation (index,kintais,name,value,eventType,jobStateCode){
        dispatch(actions.execValidate(index,kintais,name,value,eventType,jobStateCode))
    },
    updateJobs(id,year,month,kintais){
        dispatch(actions.updateJobs(id,year,month,kintais))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);