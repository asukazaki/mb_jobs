import {connect} from 'react-redux';
import Dakoku from '../components/Dakoku';
import * as actions from '../actions/Dakoku';

const mapStateToProps = (state, ownProps) => ({
    messages:state.Dakoku.messages
});

const mapDispatchToProps = dispatch => ({
    postDakoku(id,dakokuType) {
        dispatch(actions.postDakokuAPI(id,dakokuType));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Dakoku);