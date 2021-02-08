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
		signIn: false,
		reg: false,
    url: 'http://sleepingkirby.local/',
		statusMsg: '',
		user: {
			username: '',
			token: ''
			},
		search:{
			fltrNm: '',
			sort: ''
			},
		searchBool: false
		}

	this.login=this.login.bind(this);
	this.loggedIn=this.loggedIn.bind(this);
	this.logout=this.logout.bind(this);
	this.register=this.register.bind(this);
	this.setSignModal=this.setSignModal.bind(this);
	this.setRegModal=this.setRegModal.bind(this);
	this.updtSrch=this.updtSrch.bind(this);
	}

	/*----------------------------------------------------------------------
	yeah, I know this is originally a hook. I personally feel hooks are 
	not easy/intuitive to read as code. Truth be told, I have an easier
	time reading perl code than hooks.
	also: https://github.com/reactstrap/reactstrap/issues/1289
	which means if this was a real project, I'd make my own modal. But I
	don't want to spend too much time on something like this where the code
	, for sure, won't be reused.
	---------------------------------------------------------------------*/
	setSignModal(){
		this.setState({
		signIn: !this.state.signIn
		});
	}

	setRegModal(){
		this.setState({
		reg: !this.state.reg
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
			search:tmp,
			searchBool: !this.state.searchBool
		});
	}

	login(){
	//curl -F 'json={"password":"password"}' -X POST http://domain/users/username/login
	//I know the standard way is to use refs but I can either a) create refs which allocates memory in the JS event
	// b) keep track of another global state while adding an event listener to the form.
	// or c) just get the values when I need it.
	// so c as reactjs apps are bloated enough as it is
	var nm=document.getElementsByName("loginNm")[0].value;
	var pw=document.getElementsByName("loginPw")[0].value;
		if(nm!=''&&nm!==null&&pw!==''&&pw!==null){
			fetch(this.state.url+"users/"+nm+"/login", {
			method: "POST",
      headers: { 'Content-Type': 'application/json' },			
			body: JSON.stringify({"json":'{"password":"'+pw+'"}'}),
			referrerPolicy: 'no-referrer'
			}).then(res => res.json())
			.then(
				(result) => {
					if(result.status){
						this.setState({
							user:{
							username:nm,
							token:result.tkn
							},
							statusMsg: '',
							signIn: false
						});
					}
					else{
						this.setState({
							statusMsg: result.msg
						});
					}
				},
				(error) => {
				}
			);
		}
	}


	logout(){
		if(this.state.user.username!=""&&this.state.user.username!=null&&this.state.user.token!=""&&this.state.user.token!=null){
			let head = {
				"Username": this.state.user.username,
				"Authorization": this.state.user.token
			}
			fetch(this.state.url+"users/"+this.state.user.username+"/logout", {
			headers: head,
			method: "PATCH"
			}).then(res => res.json())
			.then(
				(result) => {
					if(result.status){
						this.setState({
							user:{
							username:'',
							token:''
							},
							statusMsg: '',
						});
					}
					else{
						this.setState({
							statusMsg: result.msg
						});
					}
				},
				(error) => {
				console.log(error.msg);
				}
			).catch((err)=> {
				throw new Error("Unable to send ajax call.");
				}
			);
		}
	}


	loggedIn(){
		if(this.state.user.username!=""&&this.state.user.username!=null&&this.state.user.token!=""&&this.state.user.token!=null){
			let head = {
				"Username": this.state.user.username,
				"Authorization": this.state.user.token
			}
			fetch(this.state.url+"users/"+this.state.user.username+"/loggedIn", {
			headers: head,
			method: "PATCH"
			}).then(res => res.json())
			.then(
				(result) => {
					if(!result.status){
						this.setState({
							user:{
							username:'',
							token:''
							},
							statusMsg: result.msg,
						});
					}
				},
				(error) => {
				console.log(error.msg);
				}
			).catch((err)=> {
				throw new Error("Unable to send ajax call.");
				}
			);
		}
	}


	register(){
    fetch(this.state.url+"posts/list", {
    method: "POST",
    body: {'json':{"sort":"datetime"}}
    }).then(res => res.json())
    .then(
      (result) => {
      this.setState({results: result.results});
      },
      (error) => {
      }
    );
	}


  componentDidMount() {
    if(this.state.user.username!='' && this.state.user.token!=''){
		console.log(this.state);
    this.loggedIn();
    }
  }


	render() {
		var headContIn=(
					<div className="App-header">
						<Button outline color="secondary" onClick={this.logout}>Logout</Button>
					</div>
		);
		var headContOut=(
					<div className="App-header">
						<div className="label" onClick={this.setRegModal}>Register</div>
						<Button outline color="secondary" onClick={this.setSignModal}>Log In</Button>
					</div>
		);
		var headCont=headContOut;

		var statusMsg='';

		if(this.state.statusMsg!=''){
		statusMsg=(<div className="statusMsg">{this.state.statusMsg}</div>);
		}

		if(this.state.user.username&&this.state.user.token){
		headCont=headContIn;
		}

		

		return (
			<div className="App">
					{headCont}
				<div className="App-body">
          <SidePane inState={this.state.search} inUpdtSrch={this.updtSrch}/>
					<Results inState={this.state} inKeepAlive={this.loggedIn}/>

					<div>
						<Modal id="modLogin" isOpen={this.state.signIn} toggle={this.setSignModal} style={{'width':'300px'}}>
							<ModalBody className="modBod">
								{statusMsg}
								<Input type="text" name="loginNm" className="inpt" placeholder="Username" style={{'backgroundColor':'transparent', 'width':'250px', 'marginBottom':'10px'}}/>
								<Input type="password" name="loginPw" className="inpt" placeholder="Password" style={{'backgroundColor':'transparent', 'width':'250px' }} />
							</ModalBody>
							<ModalFooter>
								<Button color="secondary" onClick={this.setSignModal}>Cancel</Button>
								<Button color="primary" onClick={this.login}>Login</Button>{' '}
							</ModalFooter>
						</Modal>
					</div>

					<div>
						<Modal id="modReg" isOpen={this.state.reg} toggle={this.setRegModal}>
							<ModalBody className="modReg">
								{statusMsg}
								<div className="modRow" style={{'marginBottom':'20px'}}><div>Username:</div><Input type="text" name="sortU" className="inpt" placeholder="Username" style={{'backgroundColor':'transparent', 'width':'250px'}}/></div>
								<div className="modRow"><div>Password:</div><Input type="password" name="sortU" className="inpt" placeholder="Password" style={{'backgroundColor':'transparent', 'width':'250px' }} /></div>
								<div className="modRow" style={{'marginBottom':'16px'}}><div>Repeat:</div><Input type="password" name="sortU" className="inpt" placeholder="Password" style={{'backgroundColor':'transparent', 'width':'250px' }} /></div>
								<div className="modRow"><div>Time Out:</div><Input type="text" name="sortU" className="inpt" placeholder="##" maxlength="2" style={{'backgroundColor':'transparent', 'width':'50px' }} /></div>
							</ModalBody>
							<ModalFooter>
								<Button color="secondary" onClick={this.setRegModal}>Cancel</Button>
								<Button color="primary" onClick={this.setRegModal}>Regiser</Button>{' '}
							</ModalFooter>
						</Modal>
					</div>


				</div>
			</div>
		);
	}
}

export default App;
