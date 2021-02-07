import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'reactstrap';
import SidePane from './sidePane';
import Results from './results';
import './App.css';


class App extends Component {

	constructor(props){
	super(props);
		this.state={
		signReg: '',
			user: {
			username: 'testUser',
			token: 'bb8101a5ef17359f074aac104d5b9fddeecf3bc0ab15d10bdc'
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
		if(!id || id ===null || id=='' ){
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
          <SidePane inState={this.state.search} inUpdtSrch={this.updtSrch}/>
					<Results inState={this.state} />
				</div>
			</div>
		);
	}
}

export default App;
