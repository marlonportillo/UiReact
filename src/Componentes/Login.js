import React, { Component,useState  } from "react";
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:3001/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }
   

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          username:''
        };
      }
       handleSubmit = async e => {
        e.preventDefault();
        let user =  this.state.username
        const token = await loginUser({
            email:user
          
        });
        this.props.history.push({pathname:'/Dashboard',state:{user:token}});
        
        console.log(token);
      }
    
    render() {
        
    
        return (
            <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          
          
        </div>
      </nav>
            <div className="auth-wrapper">
        <div className="auth-inner">
        <form  onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={e => this.setState({username:e.target.value})} className="form-control" placeholder="Enter email" />
                </div>

             

               

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
               
            </form>

        </div>
        </div>
        </div>    
        );
    }
}