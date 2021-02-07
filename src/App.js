import React, { Component } from 'react';
import logo from './logo.svg';
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SidePane from './sidePane';
import Results from './results';
import './App.css';


class App extends Component {

	constructor(props){
	super(props);
		this.state={
		signReg: false,
		user: {
			username: '',
			token: ''
			},
		search:{
			fltrNm: '',
			sort: ''
			}
		}

	this.setModal=this.setModal.bind(this);
	this.updtSrch=this.updtSrch.bind(this);
	}

	setModal(){
		this.setState({
		signReg: !this.state.signReg
		});
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
					<Button outline color="secondary" onClick={this.setModal}>Log In</Button>
				</div>
				<div className="App-body">
          <SidePane inState={this.state.search} inUpdtSrch={this.updtSrch}/>
					<Results inState={this.state} />

					<div>
						<Modal id="modLogin" isOpen={this.state.signReg} toggle={this.setModal} style={{'width':'300px'}}>
							<ModalBody className="modBod">
								<Input type="text" name="sortU" className="inpt" placeholder="Username" style={{'backgroundColor':'transparent', 'width':'250px', 'marginBottom':'10px'}}/>
								<Input type="password" name="sortU" className="inpt" placeholder="Password" style={{'backgroundColor':'transparent', 'width':'250px' }} />
							</ModalBody>
							<ModalFooter>
								<Button color="secondary" onClick={this.setModal}>Cancel</Button>
								<Button color="primary" onClick={this.setModal}>Login</Button>{' '}
							</ModalFooter>
						</Modal>
					</div>

				</div>
			</div>
		);
	}
}

export default App;
