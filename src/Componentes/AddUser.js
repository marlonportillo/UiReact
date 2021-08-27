import React, { Component,useState  } from "react";
import PropTypes from 'prop-types';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import "bootstrap-icons/font/bootstrap-icons.css";

async function loginUser(credentials) {
    return fetch('http://localhost:3001/addUsers', {
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
   
async function getrol() {
    return fetch('http://localhost:3001/getRols', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }

export default class Adduser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          email:'',
          Firstname:'',
          Lasttname:'',
          data:[],
          Rol:'',
          rolsend:'',
          user:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.EmailChange = this.EmailChange.bind(this);
        this.FirstChange = this.FirstChange.bind(this);
        this.LastChange = this.LastChange.bind(this);
        this.back = this.back.bind(this);
        
      }
      async componentDidMount(){
        if (this.props.location.state == undefined){
          this.props.history.push({pathname:'/'});
          alertify.error('not logged in');
          
        }
        else{
        const rols = await getrol();
        this.setState({data:rols.data})
        console.log(this.props)
        let rolss = this.props.location.state.Rol
        this.setState({user:this.props.location.state})
        console.log(rolss)
        let result = rols.data.find(e => e._id = rolss)
        console.log(result)
        this.setState({rolsend:result.Rol})
        if(this.props.location.state.Rol.Rol != 'Librarian'){
          this.props.history.push({pathname:'/Dashboard',state:{user :this.props.location.state}});
          alertify.error('Unauthorized');
        }
      }
      }
     
       handleSubmit = async e => {
        e.preventDefault();
        let email =  this.state.email
        let Firstname = this.state.Firstname
        let Lasttname = this.state.Lasttname
        let Rol = this.state.Rol
        let RolSend = this.state.rolsend
        const token = await loginUser({
            email,
            Firstname,
            Lasttname,
            Rol,
            RolSend
        });
        if (!token.error){
            alertify.success('Ok');
            this.setState({email:'',Firstname:'',Lasttname:'',Rol:''})
        }
        
        console.log(token);
      }
      handleChange(e) {
       
        
        this.setState({Rol:e.target.value})
      }
      FirstChange(e) {
        
        
        this.setState({Firstname:e.target.value})
      }
      LastChange(e) {
        
        
        this.setState({Lasttname:e.target.value})
      }
      EmailChange(e) {
        
        
        this.setState({email:e.target.value})
      }
      back(){
        console.log('back')
        this.props.history.push({pathname:'/Dashboard',state:{user:this.state.user}});
      }
    render() {
        
    console.log(this.state.data)
    let datas = this.state.data;
        return (
            <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          
          
        </div>
      </nav>
            <div className="auth-wrapper">
        <div className="auth-inner">
        <form  onSubmit={this.handleSubmit}>
            <div className="row" >
                <div className="col-md-3"> 
                <i onClick={this.back} class="bi bi-arrow-left"></i>
                </div>
                <div className="col-md-5">
                <h3>Add User</h3>
                </div>
           
              
            </div>
               
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" value={this.state.Firstname}  onChange={this.FirstChange} className="form-control" placeholder="Enter First Name" />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" value={this.state.Lasttname} onChange={this.LastChange} className="form-control" placeholder="Enter Last Name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={this.state.email} onChange={this.EmailChange} className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                <label>Rol</label>
                <select className="form-control" value={this.state.Rol} onChange={this.handleChange}>
                    <option>Select Rol</option>
                {
                  datas.map(row =>
                        
                        <option key={row._id} value={row._id}>{row.Rol}</option>
                   )};
                </select>
                
             </div>

                

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                
            </form>

        </div>
        </div>
        </div>    
        );
    }
}