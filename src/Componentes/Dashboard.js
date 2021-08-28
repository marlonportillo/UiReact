import React, { Component,useState  } from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import dateFormat from 'dateformat';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';


async function getBooks() {
    return fetch('https://morning-chamber-79207.herokuapp.com/getBooks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }
   async function getBooksbyid(parameter) {
    return fetch('https://morning-chamber-79207.herokuapp.com/getBooksById/'+parameter, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }
   async function getUserbyid(parameter) {
    return fetch('https://morning-chamber-79207.herokuapp.com/getUsersbyId/'+parameter, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }
   async function getstockbybook(parameter) {
    return fetch('https://morning-chamber-79207.herokuapp.com/getstocksbybook/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parameter)
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }

   async function getprofile(parameter) {
    return fetch('https://morning-chamber-79207.herokuapp.com/GetProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parameter)
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }

   async function getallprofile() {
    return fetch('https://morning-chamber-79207.herokuapp.com/GetProfileAll', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
     
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }


   async function putstock(parameter) {
    return fetch('https://morning-chamber-79207.herokuapp.com/upd-Stock/'+parameter._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parameter)
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }
   function elimina(array,elem) {
    return array.filter(e=> e.nom!==elem.nom && e.tipo!==elem.tipo);
  }
   async function addProfile(parameter) {
    return fetch('https://morning-chamber-79207.herokuapp.com/addProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parameter)
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }
   async function deleteProfile(parameter) {
    return fetch('https://morning-chamber-79207.herokuapp.com/deleteprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parameter)
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }
   async function GetProfileBook(parameter) {
    return fetch('https://morning-chamber-79207.herokuapp.com/GetProfileBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parameter)
    })
      .then(data => data.json()).catch(function(error) {
        console.log(error);
    });
   }
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          user:'',
          datas:[],
          dataProfile:[],
          show:false,
          idbook:'',
          idstock:'',
          stock:'',
          title:'',
          titleModal:'',
          titleBotton:'',
          getbutton:true
        };
        this.SendDatas = this.SendDatas.bind(this)
      }
      handleClose=()=>{
        this.setState({show:false})
      }
     async SendDatas(){
      const verifi = await GetProfileBook({
        Book:this.state.idbook,
        Usuario:this.state.user._id
       })
       if(this.state.titleBotton !='Get'){
        if(!verifi.error){
          const stock = await putstock({
            _id:this.state.idstock,
            Book:this.state.idbook,
            Quantity:this.state.stock +1
          })
  
          const profile = await deleteProfile({
            Book:this.state.idbook,
            Usuario:this.state.user._id
           })
           console.log(stock)
          console.log(profile)
           console.log(this.state.idbook)
           console.log(this.state.idstock)
           console.log(this.state.user)

           this.loaddata()
        }else{
          this.loaddata()
        }
       

       }else{
         
         if(verifi.error){
          const stock = await putstock({
            _id:this.state.idstock,
            Book:this.state.idbook,
            Quantity:this.state.stock -1
          })
          const profile = await addProfile({
           Book:this.state.idbook,
           Usuario:this.state.user._id
          })
  
          console.log(stock)
          console.log(profile)
           console.log(this.state.idbook)
           console.log(this.state.idstock)
           console.log(this.state.user)

           this.loaddata()
         }else{
          alertify.error('this book has already been rented');
          this.loaddata()
         }
        
       }
       
       
      
       this.handleClose()
      }
      handleShow = () =>{
        this.setState({show:true})
      }
      async view  (_id) {
        this.setState({titleModal:'Get book'})
        this.setState({titleBotton:'Get'})
          console.log(_id)
          const book = await getBooksbyid(_id)
          const stock = await getstockbybook({
            Book:_id
          })
          console.log(book)
          console.log(stock)
          if(!book.error){
            this.setState({title:book.data.title})
            this.setState({idbook:book.data._id})
          }
          if (!stock.error){
            this.setState({getbutton:false})
            this.setState({stock:stock.data[0].Quantity})
            this.setState({idstock:stock.data[0]._id})
          }else{
            this.setState({getbutton:true})
            this.setState({stock:'not Stock'})
          }
        this.handleShow()
       
      }
      async view2  (_id) {
        this.setState({titleModal:'Return book'})
        this.setState({titleBotton:'Return'})
        console.log(_id)
        const book = await getBooksbyid(_id)
        const stock = await getstockbybook({
          Book:_id
        })
        console.log(book)
        console.log(stock)
        if(!book.error){
          this.setState({title:book.data.title})
          this.setState({idbook:book.data._id})
        }
        if (!stock.error){
          this.setState({getbutton:false})
          this.setState({stock:stock.data[0].Quantity})
          this.setState({idstock:stock.data[0]._id})
        }else{
          this.setState({getbutton:true})
          this.setState({stock:'not Stock'})
        }
      this.handleShow()
    }
    async loaddata(){
      if (this.props.location.state == undefined){
        this.props.history.push({pathname:'/'});
        alertify.error('not logged in');
        
      }
      else{
       let usuario
          if (this.props.location.state.user.data == undefined){
            this.setState({user:this.props.location.state.user})
            usuario = this.props.location.state.user
          }else{
            this.setState({user:this.props.location.state.user.data[0]})
            usuario = this.props.location.state.user.data[0]
          }
          let profile 
          if(usuario.Rol.Rol == 'Librarian'){
            profile =  await getallprofile()
          }else{
             profile = await getprofile({
              Usuario:usuario._id
            })
          }

          
         let books = await getBooks();
         console.log(books)
         console.log(profile)
         this.setState({datas:books.data})
        
         let result  =[]
         if (!profile.error){
         
          let cantidad = 1
          console.log(profile.data.length)
          if(usuario.Rol.Rol == 'Librarian'){
            
            let resultado = []
            
            for (var i = 0; i < profile.data.length; ++i) {

              console.log(profile.data[i])
              let Userome = await getUserbyid(profile.data[i]._id.User)
              let book = await getBooksbyid(profile.data[i]._id.Book)
             
              
              resultado.push({idbook:profile.data[i]._id.Book,_id:profile.data[i]._id.User,Username :Userome.data.Firstname+' '+Userome.data.Lasttname ,title: book.data.title,Quantity:profile.data[i].count})
              
          }
         
            console.log(resultado)
            result = resultado
          }else{
            if (profile.data.length > 1){
              profile.data.reduce((previousValue, currentValue) =>{
                console.log(currentValue)
                if(currentValue.Book._id === previousValue.Book._id) {
                  cantidad = cantidad + 1
                  console.log(currentValue)
                  result.push({Book:currentValue.Book,Quantity:cantidad})
                  console.log('else')
                } else {
                  // do something else
                  console.log('else')
                  result.push({Book:currentValue.Book,Quantity:cantidad})
                }
             })
            }else{
              result.push({Book:profile.data[0].Book,Quantity:cantidad})
            }
          }
          
          
         console.log(result)
         
          
         }
         if(result.length >0){
        
          this.setState({dataProfile:result})
          result = []
         }else{
          result = []
          this.setState({dataProfile:result})
         }
         
        }
       
    }
     async componentDidMount(){
     
          this.loaddata()
      }
      componentWillUnmount(){
        this.loaddata()
      }
      logoff= async e =>{
        e.preventDefault();
        this.props.history.push({pathname:'/'});
      }
      goto= async e =>{
        e.preventDefault();
        
        this.props.history.push({pathname:'/'});
      }
      renderTableData(datos) {
        return datos.map((student, index) => {
           const { _id,publishDate, Author, Genre, title } = student //destructuring
           return (
              <tr key={_id} className ="table-light">
                 <td>{dateFormat(publishDate, "mmmm dS, yyyy")}</td>
                 <td>{Author.Author}</td>
                 <td>{Genre}</td>
                 <td>{title}</td>
                 <td><i onClick={() => this.view(_id)} className ='bi bi-eye'></i></td>
              </tr>
           )
        })
     }
     renderTableDataprofile() {
       if(this.state.dataProfile.length > 0){
        return this.state.dataProfile.map((profile, index) => {
         
          
          return (
            <tr key={profile.Book._id}  className ="table-light">
               
              <td>{profile.Book.title}</td>
              <td>{profile.Quantity}</td>
              <td><i onClick={() => this.view2(profile.Book._id)} className ='bi bi-eye'></i></td>
            </tr>)
         
         
         
      })
       }else{
        return (
          <tr  className ="table-light">
             
            <td></td>
            <td></td>
            <td></td>
          </tr>)
       }
      
   }
   renderTableDataprofileL() {
    return this.state.dataProfile.map((profile, index) => {
       
        
        return (
          <tr key={profile._id}  className ="table-light">
             
            <td>{profile.title}</td>
            <td>{profile.Quantity}</td>
            <td>{profile.Username}</td>
            <td><i onClick={() => this.view2(profile.idbook)} className ='bi bi-eye'></i></td>
          </tr>)
       
       
       
    })
 }
   renderthl(){
     return(
      <thead>
      <tr className="table-dark">
          
          <th scope="col">
          Book
          </th>
          <th scope="col">
          Quantity 
          </th>
          <th scope="col">
          User 
          </th>
          <th scope="col">
          Action 
          </th>
      </tr>
  </thead>
     )
   }
   renderths(){
    return(
     <thead>
     <tr className="table-dark">
         
         <th scope="col">
         Book
         </th>
         <th scope="col">
         Quantity 
         </th>
         <th scope="col">
          Action 
          </th>
     </tr>
 </thead>
    )
  }
      render(){
          let data = this.state.datas
          console.log(this.state.dataProfile)
          
        return (
            <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
               
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav  me-auto">
                    <li className="nav-item">
                    <Link className="nav-link" to={{     
                        pathname: '/Adduser',
                        state:this.state.user
                        }}>Add User</Link>
        
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={{     
         pathname: '/AddBook',
         state:this.state.user
        }}>Add Book </Link>
                    </li>
                    <li className="nav-item">
                    <input className="nav-item btn btn-primary mr-sm-2" type="button" onClick={this.logoff}  value="Logout" />
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="auth-wrapper">
                <div className="Container-fluid" >
                <table className="table  ">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">
                            publishDate
                            </th>
                            <th scope="col">
                            Author
                            </th>
                            <th scope="col">
                            Genre
                            </th>
                            <th scope="col">
                            title
                            </th>
                            <th scope="col">
                            Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                    this.renderTableData(data)
                }
                        
                    
                    </tbody>
                </table>
                
                </div>
                  <div>
                    Our Inventari
                  </div>
                <div className="Container-fluid" >
                <table className="table  ">
                    {
                      (this.props.location.state.user.data == undefined)?(
                        (this.props.location.state.user.Rol.Rol == 'Librarian')?(this.renderthl()):(this.renderths())
                      ):(
                        (this.props.location.state.user.data[0].Rol.Rol == 'Librarian')?(this.renderthl()):(this.renderths())
                      )
                      
                    }
                    <tbody>
                      
                        {
                           (this.props.location.state.user.data == undefined)?(
                            (this.props.location.state.user.Rol.Rol == 'Librarian')?( this.renderTableDataprofileL()):(this.renderTableDataprofile())
                          ):(
                            (this.props.location.state.user.data[0].Rol.Rol == 'Librarian')?( this.renderTableDataprofileL()):(this.renderTableDataprofile())
                          )
                          
                         
                        };
                    
                    </tbody>
                </table>
                
                </div>
            </div>

            <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.titleModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          Title : {this.state.title}  
          </div>
          <div>
          Stock : {this.state.stock}     
          </div>
        
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={this.handleClose}>
            Cancel
          </Button>
          <Button disabled={this.state.getbutton} variant="primary" onClick={this.SendDatas}>
            {this.state.titleBotton} 
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
        
        );
      }


}