import './app.css';
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";
import Home from "./pages/home/Home";
import Senior from "./pages/Seniors/Senior";
import Calendar from './pages/Calendar/Calendar';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useState } from 'react';

function App() {
  const [title,setTitle]= useState('Home');
  return (
    <Router>

      <TopBar title={title} />
      <div className="container" >
        <SideBar setTitle={setTitle} />
        <Switch> 
          <Route  setTitle={setTitle} exact path="/" component={Home}/>      
          
          <Route setTitle={setTitle} path="/senior" component={Senior}/>      
         
          
          <Route setTitle={setTitle} path="/calendar" component={Calendar}/>      
          
        </Switch>

      </div>

    </Router>
  );
}

export default App;
