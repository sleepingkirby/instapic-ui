import React, { Component } from 'react';
import logo from './logo.svg';
import { Input } from 'reactstrap';
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


	render() {
	var sty={minWidth:'20px'};
	var arrw='>>';
	var sortISty={backgroundColor:'#282c34', color:'white', minWidth:'20px', maxWidth:'10px', padding:'4px 4px 4px 4px'};
		if(this.state.on){
		sty.minWidth='200px';
		arrw='<<';
		sortISty.minWidth='200px';
		sortISty.maxWidth='300px';
		sortISty.padding='6px 12px 6px 12px';
		}

		return (
					<div className="sidePane" style={sty}>
						<div className="sideToggle" style={{justifyContent:'flex-end'}} onClick={() => this.onToggle()}>
						{arrw}
						</div>
						<div>
		        <Input type="text" name="sortU" id="sortU" className="inpt" placeholder="Sort by Username" style={sortISty} onInput={ (e)=>this.props.inUpdtSrch('fltrNm', e.target.value) }/>
						</div>
						<div>
						2	
						</div>
						<div>
						3	
						</div>

					</div>
		);
	}
}

export default SidePane;
