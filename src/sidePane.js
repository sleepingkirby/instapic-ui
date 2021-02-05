import React, { Component } from 'react';
import logo from './logo.svg';
import { Input, Button } from 'reactstrap';
import './App.css';


class SidePane extends Component {

	constructor(){
	super();
		this.state={
		on: false
		}
	
	this.onToggle=this.onToggle.bind(this);
	}


	onToggle(){
		this.setState({
		on: !this.state.on,
		});
	}


	onBtnTgl(e){
	console.log(e.target);
	
	}

	render() {
	var sty={minWidth:'20px'};
	var arrw='>>';
	var inptDsbl=true;
	var sortISty={backgroundColor:'#282c34', color:'white', minWidth:'20px', maxWidth:'20px', padding:'4px 4px 4px 4px'};
	var sortBSty={minWidth:'20px', maxWidth:'20px', padding:'4px 4px 4px 4px', overflow:'hidden'};
	var sortBVal='O';

		if(this.state.on){
		sty.minWidth='200px';
		arrw='<<';
		sortISty.minWidth='200px';
		sortISty.maxWidth='300px';
		sortISty.padding='6px 12px 6px 12px';
		sortBSty.minWidth='40px';
		sortBSty.maxWidth='100px';
		sortBSty.padding='10px 10px 10px 10px';
		sortBVal='Order';
		inptDsbl=false;
		}

		return (
					<div className="sidePane" style={sty}>
						<div className="sideToggle" style={{justifyContent:'flex-end'}} onClick={() => this.onToggle()}>
						{arrw}
						</div>
						<div>
		        <Input type="text" name="sortU" id="sortU" className="inpt" placeholder="Sort by Username" style={sortISty} onInput={ (e)=>this.props.inUpdtSrch('fltrNm', e.target.value)} disabled={inptDsbl} />
						</div>
						<div>
						<Button outline color="secondary" className="btn" onClick={(e)=>{console.log(e.target);}} style={sortBSty}>{sortBVal}</Button>	
						</div>

					</div>
		);
	}
}

export default SidePane;
