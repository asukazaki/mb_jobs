import {connect} from 'react-redux';
import Dakoku from '../components/Dakoku';
import * as actions from '../actions/Dakoku';

const mapStateToProps = (state, ownProps) => ({
    id: state.Dakoku.id,
    messages: state.Dakoku.messages,
    hh:state.Dakoku.hh,
    mm:state.Dakoku.mm,
    ss:state.Dakoku.ss,
    
});

const mapDispatchToProps = dispatch => ({
   postDakoku(id,dakokuType) {
       dispatch(actions.postDakoku(id,dakokuType))
   },
   startClock() {
       dispatch(actions.startClock())
   }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dakoku);