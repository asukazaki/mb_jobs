import {connect} from 'react-redux';
import JobsLink from '../components/JobsLink';
// import * as actions from '../actions/Jobs';

// ログインユーザーと日付の情報を渡す
const mapStateToProps = (state, ownProps) => ({
    id: state.JobsLink.id,
    year:state.JobsLink.year,
    month: state.JobsLink.month
});

const mapDispatchToProps = dispatch => ({
   // 今はなし
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsLink);