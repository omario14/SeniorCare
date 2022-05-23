import SideBar from "./components/SideBar/SideBar";
import Home from "./pages/home/Home";
import Senior from "./pages/Seniors/Senior";
import Calendar from './pages/Calendar/Calendar';
import LoginComponent from './pages/Sign up&in/login.component';
import RegisterComponent from './pages/Sign up&in/register.component';
import { useEffect, useState } from 'react';
import Health from './pages/Health/Health';
import {

    
    Routes,
    Outlet,
    Route,
    Navigate
  } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import AddSenior from "./pages/Seniors/AddSenior/AddSenior";
import { useSelector } from "react-redux";
import NotFound from "./pages/AlertPages/NotFound";

export default function Routingg() {
    const [title,setTitle]= useState('Home');
    const [loading,setLoading]=useState(false);
    const [showAccompagnantBoard, setShowAccompagnantBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
  
  
    useEffect(() => {
      if (currentUser) {
        setShowAccompagnantBoard(currentUser.roles.includes("ROLE_ACCOMPAGNANT"));
        setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      }
    }, [currentUser]);

    useEffect(()=>{
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
      },2000)
    },[])
  
const SidebarLayout = () => (
  <>
  
    <SideBar />
    <Outlet />
  </>
);
  return (
    <div>
   {
     loading ?
     <div className="ringBody">
     <div class="ring ring1"></div>
     <div class="ring ring2"></div>
     <div class="ring ring3"></div>
     <div class="ring ring4"></div>
     </div>
     :
   
      <div>
      <div className="container g-sidenav-show  bg-gray-100 " id='containerr'>
        <Routes>
          
            
          <Route  setTitle={setTitle}  element={<SidebarLayout/>}>
            <Route title={title}  setTitle={setTitle} index element={<Home/>} />
            <Route title={title}  setTitle={setTitle} path="/senior" element={<Senior/>} />
            <Route title={title}  setTitle={setTitle} path="/health" element={<Health/>} />
            <Route title={title}  setTitle={setTitle} path='/calendar' element={<Calendar/>}/>
            <Route title={title}  setTitle={setTitle} path='/profile' element={<Profile/>}/>
            <Route title={title}  setTitle={setTitle} path='/newSenior' element={<AddSenior/>}/>
            
            
          </Route>
         
         
        </Routes>
      </div>
      <Routes>
      <Route  setTitle={setTitle} path='/login' element={<LoginComponent/>} />
      <Route path='/register' element={<RegisterComponent/>} />
      <Route  path='/notfound' element={<NotFound/>}/>
      </Routes>
    
      </div>
    }
    </div>
  )
}