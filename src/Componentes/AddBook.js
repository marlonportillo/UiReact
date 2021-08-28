import React, { Component,useState  } from "react";
import PropTypes from 'prop-types';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import "bootstrap-icons/font/bootstrap-icons.css";

async function loginUser(credentials) {
    return fetch('https://morning-chamber-79207.herokuapp.com/addBooks', {
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
   async function PostStock(credentials) {
    return fetch('https://morning-chamber-79207.herokuapp.com/addStocks', {
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
   async function getAuthors() {
    return fetch('https://morning-chamber-79207.herokuapp.com/getAuthors', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }

   export default class AddBook extends Component{
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          publishDate:'',
          Author:'',
          title:'',
          data:[],
          Genre:'',
          rolsend:'',
          user:'',
          userSend:'',
          quantity:''
        };
       this.handleChange = this.handleChange.bind(this);
       this.GenerChange = this.GenerChange.bind(this);
       this.TitleChange = this.TitleChange.bind(this);
       this.datePublishChange = this.datePublishChange.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.back = this.back.bind(this)
      }


      handleSubmit = async e => {
        e.preventDefault();
        let Author =  this.state.Author
        let publishDate = this.state.publishDate
        let title = this.state.title
        let Genre = this.state.Gener
        let Rol = this.state.rolsend
        let User = this.state.userSend
        console.log(User)
        const token = await loginUser({
            Author,
            publishDate,
            title,
            Genre,
            Rol,
            User
        });
        if (!token.error){
            const stock = await PostStock({
                Book:token.data._id,
                Quantity:this.state.quantity
            })
            if(!stock.error){
                alertify.success('Ok');
            this.setState({Author:'',publishDate:'',title:'',Gener:'',quantity:''})
            }
            
        }
        
        console.log(token);
      }

      async componentDidMount(){
        if (this.props.location.state == undefined){
          this.props.history.push({pathname:'/'});
          alertify.error('not logged in');
          
        }
        else{
          
          const authors = await getAuthors();
        this.setState({data:authors.data})
        this.setState({user:this.props.location.state})
        this.setState({rolsend:this.props.location.state.Rol.Rol})
        this.setState({userSend: this.props.location.state._id})
        console.log(this.props.location.state)
        let Rol = this.props.location.state.Rol.Rol
        if(Rol != 'Librarian'){
          this.props.history.push({pathname:'/Dashboard',state:{user :this.props.location.state}});
          alertify.error('Unauthorized');
        }
        }
        
      }

      handleChange(e) {
       
        
        this.setState({Author:e.target.value})
      }
      datePublishChange(e) {
        
        
        this.setState({publishDate:e.target.value})
      }
      GenerChange(e) {
        
        
        this.setState({Genre:e.target.value})
      }
      TitleChange(e) {
        
        
        this.setState({title:e.target.value})
      }
      quantityChange(e){
        this.setState({quantity:e.target.value})
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
                <h3>Add Book</h3>
                </div>
           
              
            </div>
               
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={this.state.title}  onChange={this.TitleChange} className="form-control" placeholder="Enter Title" />
                </div>
                <div className="form-group">
                    <label>Gener</label>
                    <input type="text" value={this.state.Gener} onChange={this.GenerChange} className="form-control" placeholder="Enter Gener" />
                </div>

                <div className="form-group">
                    <label>Publish Date</label>
                    <input type="date" value={this.state.publishDate} onChange={this.datePublishChange} className="form-control"  />
                </div>
                <div className="form-group">
                <label>Author</label>
                <select className="form-control" value={this.state.Author} onChange={this.handleChange}>
                    <option>Select Author</option>
                {
                  datas.map(row =>
                        
                        <option key={row._id} value={row._id}>{row.Author}</option>
                   )};
                </select>
                
             </div>
             <div className="form-group">
                    <label>Quantity</label>
                    <input type="text" value={this.state.quantity} onChange={this.quantityChange} className="form-control" placeholder="Enter Quantity" />
                </div>

                

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                
            </form>

        </div>
        </div>
        </div>    
        );
    }


   }