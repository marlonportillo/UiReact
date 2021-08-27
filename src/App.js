import logo from './logo.svg';
import './App.css';
import Login  from './Componentes/Login';
import Dashboard from './Componentes/Dashboard';
import Adduser from './Componentes/AddUser';
import AddBook from './Componentes/AddBook';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (<Router>
    

      
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Adduser" component={Adduser} />
            <Route path="/AddBook" component={AddBook} />
          </Switch>
       </Router>
  );
}

export default App;
