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
import { useTranslation } from "react-i18next";
// import { useNavigate } from 'react-router-dom';


import cookies from "js-cookie";

const languages = [
  {
    code: "fr",
    name: "Français",
    country_code: "fr",
  },
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "sa",
  },
];


export default function Routingg({logOut}) {
    const [title,setTitle]= useState(document.title);
    const [loading,setLoading]=useState(false);
    const [showAccompagnantBoard, setShowAccompagnantBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showChefBoard, setShowChefBoard] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [dir,setDir] = useState("ltr");

    
    const [socket, setSocket] = useState(null);
  
    const currentLanguageCode = cookies.get("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const { t } = useTranslation();
  
    useEffect(() => {
      
      setDir(currentLanguage.dir || "ltr");
    }, [currentLanguage, t]);
  
  
    useEffect(() => {
      if (currentUser) {
        setShowAccompagnantBoard(currentUser.roles[0].name==="ROLE_ACCOMPAGNANT");
        setShowAdminBoard(currentUser.roles[0].name==="ROLE_ADMIN");
        setShowChefBoard(currentUser.roles[0].name==="ROLE_CHEF");
        userService.isConnected().then((res)=>{
       
          if(res.data.connected===false){
            
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
  
    <SideBar setTitle={setTitle} />
   
  </>
);
  return (
    <div>
  
   
      <div>
      {currentUser && <TopBar title={title} socket={socket} t={t} dir={dir}/>}
      <div className="container g-sidenav-show mt-5  bg-gray-100 " id='containerr'>
      {currentUser && <SidebarLayout/>}
        <Routes>

            <Route      index element={<Home t={t} dir={dir}/>} />
            <Route      path="/senior" element={<Senior socket={socket} title={title} t={t} dir={dir}/>} />
            <Route      path="/health" element={<Health  title={title} />} />
            <Route      path="/food" element={<Food  title={title} />} />
            <Route      path='/calendar' element={<Calendar title={title}  />}/>
            <Route      path='/profile' element={<Profile title={title} t={t} dir={dir} />}/>
            <Route      path='/newSenior' element={<AddSenior title={title} />}/>
            <Route      path='/staff' element={<Staff title={title} />}/>
            <Route      path='/meal' element={<Meal title={title}  t={t} dir={dir}/>}/>
            <Route      path='/ingredients' element={<Ingredients title={title} />}/>
            <Route      path='/register' element={<AddUser title={title} />} />

        </Routes>
      </div>
      <Routes>
      <Route  setTitle={setTitle} path='/login' element={<LoginComponent title={title} />} />
      
      <Route  path='/notfound' element={<NotFound/>}/>
      </Routes>
    
      </div>
    
    </div>
  )
}
