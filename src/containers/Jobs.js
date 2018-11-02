import {connect} from 'react-redux';
import Jobs from '../components/Jobs';
import * as actions from '../actions/Jobs';

// TODO:
const mapStateToProps = (state, ownProps) => ({
    id: ownProps.id,
    year: state.Jobs.year!==undefined ? state.Jobs.month : ownProps.year,
    month : state.Jobs.month!==undefined ? state.Jobs.month : ownProps.month,
    // month: state.month,
    kintais:state.Jobs.kintais,
    monthOverTime:state.Jobs.monthOverTime,
    error:state.Jobs.error
});

const mapDispatchToProps = dispatch => ({
    // onMountとonUpdateとJobsを接続
    onMount(id,year,month){
        dispatch(actions.fetchJobs(id,year,month));
    },
    onUpdate (id,year,month){
        dispatch(actions.fetchJobs(id,year,month))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);