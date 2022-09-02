import SideBar from "./components/SideBar/SideBar";
import Home from "./pages/home/Home";
import Senior from "./pages/Seniors/Senior";
import Calendar from './pages/Calendar/Calendar';
import LoginComponent from './pages/Sign up&in/login.component';
import { useEffect, useState } from 'react';
import Health from './pages/Health/Health';

import { io } from "socket.io-client";
import {

    
    Routes,
    Outlet,
    Route,
    
  } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import AddSenior from "./pages/Seniors/AddSenior/AddSenior";
import { useSelector } from "react-redux";
import NotFound from "./pages/OtherComponents/NotFound";
import Staff from "./pages/Admin/Staff";
import Ingredients from "./pages/Chef/Ingredients";
import Meal from "./pages/Chef/Meal";
import Food from "./pages/Food/Food";
import TopBar from "./components/TopBar/TopBar";
import AddUser from "./pages/Admin/addUser";

import userService from './services/user.service';
import { logout } from "./actions/auth";

export default function Routingg({logOut}) {
    const [title,setTitle]= useState('Home');
    const [loading,setLoading]=useState(false);
    const [showAccompagnantBoard, setShowAccompagnantBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showChefBoard, setShowChefBoard] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);

    
    const [socket, setSocket] = useState(null);
  
  
    useEffect(() => {
      if (currentUser) {
        setShowAccompagnantBoard(currentUser.roles[0].name==="ROLE_ACCOMPAGNANT");
        setShowAdminBoard(currentUser.roles[0].name==="ROLE_ADMIN");
        setShowChefBoard(currentUser.roles[0].name==="ROLE_CHEF");
        userService.isConnected().then((res)=>{
       
          if(res.data.connected===false){
            console.log(!res.data.connected,"logaout")
            logOut();
    
          }
        })
      }
    }, [currentUser]);

    useEffect(() => { 
      if (currentUser) {
      socket?.emit("newUser", currentUser.username);
      
      }
    }, [socket, currentUser]);

    useEffect(()=>{
      setSocket(io("http://localhost:5000"));
   
    },[])
  
const SidebarLayout = () => (
  <>
  
    <SideBar />
   
  </>
);
  return (
    <div>
  
   
      <div>
      {currentUser && <TopBar socket={socket}/>}
      <div className="container g-sidenav-show mt-5  bg-gray-100 " id='containerr'>
      {currentUser && <SidebarLayout/>}
        <Routes>

            <Route      index element={<Home />} />
            <Route      path="/senior" element={<Senior socket={socket} />} />
            <Route      path="/health" element={<Health />} />
            <Route      path="/food" element={<Food />} />
            <Route      path='/calendar' element={<Calendar />}/>
            <Route      path='/profile' element={<Profile/>}/>
            <Route      path='/newSenior' element={<AddSenior />}/>
            <Route      path='/staff' element={<Staff />}/>
            <Route      path='/meal' element={<Meal />}/>
            <Route      path='/ingredients' element={<Ingredients />}/>
            <Route      path='/register' element={<AddUser/>} />

        </Routes>
      </div>
      <Routes>
      <Route  setTitle={setTitle} path='/login' element={<LoginComponent/>} />
      
      <Route  path='/notfound' element={<NotFound/>}/>
      </Routes>
    
      </div>
    
    </div>
  )
}
