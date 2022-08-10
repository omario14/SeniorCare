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
    
  } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import AddSenior from "./pages/Seniors/AddSenior/AddSenior";
import { useSelector } from "react-redux";
import NotFound from "./pages/OtherComponents/NotFound";
import Staff from "./pages/Admin/Staff";
import Ingredients from "./pages/Chef/Ingredients";
import Meal from "./pages/Chef/Meal";
import Food from "./pages/Food/Food";

export default function Routingg() {
    const [title,setTitle]= useState('Home');
    const [loading,setLoading]=useState(false);
    const [showAccompagnantBoard, setShowAccompagnantBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showChefBoard, setShowChefBoard] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
  
  
    useEffect(() => {
      if (currentUser) {
        setShowAccompagnantBoard(currentUser.roles[0].name==="ROLE_ACCOMPAGNANT");
        setShowAdminBoard(currentUser.roles[0].name==="ROLE_ADMIN");
        setShowChefBoard(currentUser.roles[0].name==="ROLE_CHEF");
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
  
   
      <div>
      <div className="container g-sidenav-show  bg-gray-100 " id='containerr'>
        <Routes>
          
            
          <Route  setTitle={setTitle}  element={<SidebarLayout/>}>
            <Route title={title}  setTitle={setTitle} index element={<Home/>} />
            <Route title={title}  setTitle={setTitle} path="/senior" element={<Senior/>} />
            <Route title={title}  setTitle={setTitle} path="/health" element={<Health/>} />
            <Route title={title}  setTitle={setTitle} path="/food" element={<Food/>} />
            <Route title={title}  setTitle={setTitle} path='/calendar' element={<Calendar/>}/>
            <Route title={title}  setTitle={setTitle} path='/profile' element={<Profile/>}/>
            <Route title={title}  setTitle={setTitle} path='/newSenior' element={<AddSenior/>}/>
            <Route title={title}  setTitle={setTitle} path='/staff' element={<Staff/>}/>
            <Route title={title}  setTitle={setTitle} path='/meal' element={<Meal/>}/>
            <Route title={title}  setTitle={setTitle} path='/ingredients' element={<Ingredients/>}/>
            
            
          </Route>
         
         
        </Routes>
      </div>
      <Routes>
      <Route  setTitle={setTitle} path='/login' element={<LoginComponent/>} />
      <Route path='/register' element={<RegisterComponent/>} />
      <Route  path='/notfound' element={<NotFound/>}/>
      </Routes>
    
      </div>
    
    </div>
  )
}
