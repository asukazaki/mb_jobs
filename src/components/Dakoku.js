import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import  '../Dakoku.css';

// export default function Dakoku({id,year,month,messages,postDakoku}){
export default class Dakoku extends React.Component{
    componentDidMount(){
        this.props.startClock();
    }

    render(){
        const {id,year,month,messages,postDakoku,hh,mm,ss} = this.props;
    return(
        <div>
            <div>
            <p>id :{id}</p>
            </div>

            {/* <div>
            <Button bsStyle="info" onClick= {() => postDakoku(id,"SYUKKIN")}>出勤</Button>
            <Button bsStyle="info">退勤</Button>
            <Button bsStyle="info">休憩開始</Button>
            <Button bsStyle="info">休憩終了</Button>           
             </div>
             <ul>
                 {messages.map(m =>(
                      <li >{m}</li>
                    )
                 )

                 }
             </ul> */}

             <div className="container">
               <div className="row">
                 <div className="col-lg-4"><span className="display-3">{hh}:{mm}:{ss}</span>
                 <ul>
                 {messages.map((m,index) =>(
                      <li key={index}>{m}</li>
                    )
                 )

                 }
             </ul> 
                 </div>
                 
                 <div className="col-lg-8">
                 <div className="row">
                    <div className="col-lg-6"><button className="dakoku_btn" onClick= {() => postDakoku(id,"SYUKKIN")}> 出勤 </button></div>
                    <div className="col-lg-6"><button className="dakoku_btn" onClick= {() => postDakoku(id,"TAIKIN")}> 退勤 </button></div>
                    <div className="col-lg-6"><button className="dakoku_btn"> 休憩開始 </button></div>
                    <div className="col-lg-6"><button className="dakoku_btn"> 休憩終了 </button></div>
                 </div>
                 </div>
              </div>
            </div>
        </div>
    );
}
}

Dakoku.PropTypes ={
    id:PropTypes.number,
    messages:[],
    didSyukkin:PropTypes.bool,
    hh:PropTypes.string,
    mm:PropTypes.string,
    ss:PropTypes.string
};

Dakoku.defaultProps = {
    id : 1,
    messages:[],
    didSyukkin:false
};
