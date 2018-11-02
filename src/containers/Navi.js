import {connect} from 'react-redux';
import Navi from '../components/Navi';
import * as jobsActions from '../actions/Jobs';

const mapStateToProps = (state, ownProps) => ({
    id: state.Jobs.id,
    year:state.Jobs.year,
    month: state.Jobs.month
});

const mapDispatchToProps = dispatch => ({
    // return {
        goToLastMonth(id,year,month){
            var dt = new Date(year,(Number(month)-1),1);
            // 先月
            dt.setMonth(dt.getMonth() -1);
            // 表示上を合わせる(+1して０埋め)
            const lastMonth = ("00" + String((dt.getMonth()+1))).slice(-2);
            dispatch(jobsActions.fetchJobs(id,dt.getFullYear(),lastMonth));
        },
        goToNextMonth(id,year,month){
            var dt = new Date(year,(Number(month)-1), 1);
            // 来月
            dt.setMonth(dt.getMonth() +1);
            // 表示上を合わせる(+1して０埋め)
            const nextMonth = ("00" + String((dt.getMonth()+1))).slice(-2);
            dispatch(jobsActions.fetchJobs(id,dt.getFullYear(),nextMonth));
        }
    // };
});


export default connect(mapStateToProps, mapDispatchToProps)(Navi);