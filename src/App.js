import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'reactstrap';
import SidePane from './sidePane';
import './App.css';


class App extends Component {

	constructor(){
	super();
		this.state={
		signReg: '',
		sideTog: false,
			user: {
			username: '',
			token: ''
			},
			search:{
			fltrNm: '',
			sort: ''
			}
		}

	this.updtSrch=this.updtSrch.bind(this);
	}

	//updates the search states
	updtSrch( id, val){
		if(!id || id ===null || id=='' || !val || val===null || val==''){
		return null;
		}
	var tmp=this.state.search;
	tmp[id]=val;
		this.setState({
			search:tmp
		});
	}



	render() {
		return (
			<div className="App">
				<div className="App-header">
					<div className="label">Register</div>
					<Button outline color="secondary">Log In</Button>
				</div>
				<div className="App-body">
          <SidePane inState={this.state.sideTog} inUpdtSrch={this.updtSrch}/>
					<div className="mainPane">
				&nbsp;
					</div>
				</div>
			</div>
		);
	}
}

export default App;
