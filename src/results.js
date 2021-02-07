import React, { Component } from 'react';
import logo from './logo.svg';
import { Input, Button } from 'reactstrap';
import './App.css';


class Results extends Component {

	constructor(props){
	super(props);
		this.state={
		url: 'http://sleepingkirby.local/',
		on: false,
		results: {},
		imgs:{}
		}
	this.getResults=this.getResults.bind(this);
	}


/*
    let token = this.generateClientToken(privateKey, message);

    let myheaders = {
      "appID": appID,
      "authorizationkey": token
    }

    fetch('http://localhost:8080/api/app/postman', {
      method: "GET",
      // body: JSON.stringify(''),
      headers: myheaders
    }).then(function(response) {
      console.log(response.status);     //=> number 100–599
      console.log(response.statusText); //=> String
      console.log(response.headers);    //=> Headers
      console.log(response.url);        //=> String

      return response.text()
    }, function(error) {
      console.log(error.message); //=> String
    })
*/

	getResults(un, srt){
	  let head = {
      "Username": this.props.inState.user.username,
      "Authorization": this.props.inState.user.token
    }
		fetch(this.state.url+"posts/list", {
		method: "POST",
		headers: head,
		body: {'json':{"sort":"datetime"}}
		}).then(res	=> res.json())
		.then( 
			(result) => {
			this.setState({results: result.results});
			}, 
			(error) => { 
			}
		);
	
	}

  componentDidMount() {
		if(this.props.inState.user.username!='' && this.props.inState.user.token!=''){
		this.getResults();	
		}
	}

	render() {
	var json="";
	var content=[];
	content.push(<div key='1'>Please log in</div>);

		if(this.props.inState.user.username!='' && this.props.inState.user.token!=''){
		content=[];
			if(Object.keys(this.state.results)!==0){
				let is=Object.keys(this.state.results);
				is.forEach((item)=>{
					content.push(
						<div key={this.state.results[item].id} className="imgBlk" style={{'padding':'0px 0px 0px 0px'}}>
							<div className='pic'><img src={this.state.url+"posts/"+this.state.results[item].id} /></div>
							<div className='info'>
								<div className="user" style={{'textAlign':'right','padding':'2px 10px 2px 0px'}}>
								{this.state.results[item].userName}
								</div>
								<div className="title">
								{this.state.results[item].title}
								</div>
								<div className="descr">
								{this.state.results[item].descrip}
								</div>
								<div className="tags">
								{this.state.results[item].tags}
								</div>
							</div>
						</div>
					);
				});
			}
			else{
			content.push(<div key='1'>no results</div>);
			}
		}

	var dflt=<div className="results">{content}</div>;

		return (
					<div className="mainPane">
					{dflt}
					</div>
		);
	}
}

export default Results;
