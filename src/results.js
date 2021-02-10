import React, { Component } from 'react';
import logo from './logo.svg';
import { Input, Button } from 'reactstrap';
import './App.css';


class Results extends Component {

	constructor(props){
	super(props);
		this.state={
		url: '',
		on: false,
		results: {}
		}
	this.getResults=this.getResults.bind(this);
	}


	getResults(un, srt){
	  let head = {
     	"Content-Type": "application/json",
      "Username": this.props.inState.user.username,
      "Authorization": this.props.inState.user.token
    }
		fetch(this.props.inState.url+"posts/list", {
		method: "POST",
		headers: head,
		body: JSON.stringify({'json':'{"username":"'+un+'","sort":"'+srt+'"}'}),
    referrerPolicy: 'no-referrer'
		}).then(res	=> res.json())
		.then( 
			(result) => {
				this.setState({results: result.results});
			}, 
			(error) => { 
			console.log(error);
			}
		);
	
	}

  componentDidMount() {
		this.setState({
		url: this.props.inState.url
		});
		if(this.props.inState.user.username!='' && this.props.inState.user.token!=''){
		this.props.inKeepAlive();
		this.getResults(this.props.inState.search.fltrNm, this.props.inState.search.sort);
		}
	}

	componentDidUpdate(pprops, pstate){
		if(this.props.inState.user.username!='' && this.props.inState.user.token!=''){
			if(this.props.inState.user.username !== pprops.inState.user.username){
				if(this.props.inState.user.username!='' && this.props.inState.user.token!=''){
				this.getResults(this.props.inState.search.fltrNm, this.props.inState.search.sort);
				}
				else{
					this.setState({
					results:{}
					});
				}
				return null;
			}
			if(this.props.inState.searchBool !== pprops.inState.searchBool){
				this.getResults(this.props.inState.search.fltrNm, this.props.inState.search.sort);
				return null;
			}
		}
	}


	render() {
	var json="";
	var content=[];
	content.push(<div key='1' name="resDflt" className="pLogIn" >Please log in</div>);
		if(this.props.inState.user.username!='' && this.props.inState.user.token!=''){
		content=[];
			if(this.state.hasOwnProperty('results') && typeof this.state.results === 'object' && this.state.results !== null && Object.keys(this.state.results)!==0){
				let is=Object.keys(this.state.results);
				is.forEach((item)=>{
					content.push(
						<div key={this.state.results[item].id} className="imgBlk" style={{'padding':'0px 0px 0px 0px'}}>
							<div className='pic'><a target="_blank" href={this.props.inState.url+"posts/"+this.state.results[item].id}><img src={this.state.url+"posts/"+this.state.results[item].id} /></a></div>
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
			content.push(<div key='1' name="resDfltY" className="pLogIn">No Results</div>);
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
