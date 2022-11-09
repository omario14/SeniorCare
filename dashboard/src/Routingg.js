import SideBar from "./components/SideBar/SideBar";
import Home from "./pages/home/Home";
import Senior from "./pages/Seniors/Senior";
import Calendar from './pages/Calendar/Calendar';
import LoginComponent from './pages/Sign up&in/login.component';
import { createContext, useEffect, useState } from 'react';
import Health from './pages/Health/Health';
import moment from  'moment';
import { io } from "socket.io-client";
import {
    Routes,
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
import CalendarState from "./pages/Calendar/context/CalendarContext";
import ConfigBar from "./components/ConfigBar/ConfigBar";
import seniorService from "./services/senior.service";
import { remindAt } from "./utils/GeneralFunctions";

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

export const ThemeContext = createContext(null);

export default function Routingg({logOut}) {
    const [title,setTitle]= useState(document.title);
    const [loading,setLoading]= useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [dir,setDir] = useState("ltr");
    const [toggleConfig,setToggleConfig] = useState(false);
    const [theme,setTheme] = useState("light")
    const [bg, setBg] = useState("bg-white");

    const [socket, setSocket] = useState(null);
    const [dataDose, setData] = useState([]);
  
    const currentLanguageCode = cookies.get("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const { t } = useTranslation();
    
  
    useEffect(() => {
      
      setDir(currentLanguage.dir || "ltr");
    }, [currentLanguage, t]);
  
  
    useEffect(() => {
      if (currentUser) {
        
        userService.isConnected().then((res)=>{
       
          if(res.data.connected===false){
            
            logOut();
    
          }
        })
        
      }
    }, [currentUser]);

   useEffect(() => { 
      if (currentUser ) {
      socket?.emit("newUser", currentUser.username,currentUser.roles[0].name);
  
      }
    }, [socket, currentUser]);

    useEffect(()=>{
     
        
      setSocket(io("http://localhost:5000"));
      if(currentUser){
        
    }
    const interval = setInterval(() => {
     
      console.log("Logs every minute")
      getallDoseTime();
    }, 50000);
    
    return () =>clearInterval(interval);
    },[])

    useEffect(()=>{
      verifDoseTime();
    },[dataDose])

    
    const verifDoseTime= ()=>{
    
      if(dataDose && dataDose.length!==0 ){
        dataDose.forEach(reminder => {
          
            if(!reminder.reminded){
              
        
                if(remindAt(reminder.remindTime) ) {
                    seniorService.putReminderDone(reminder.id,true).then(()=>{
                        socket.emit("sendNotificationMedication", {
                          senderName: "SeniGuard",
                          content: "Medication time for "+reminder.arch.senior.name+"  "+reminder.arch.senior.lastname,
                          time:new Date(),
                          type: "Meds"
                        });

                        userService.addNotif({
                        senderName:"SeniGuard", 
                        message:"Medication time for"+reminder.arch.senior.name+"  "+reminder.arch.senior.lastname, 
                        date:moment(new Date()).format("YYYY-MM-DD HH:MM:SS").toString(),
                        type:"Meds"
                      }) 
                    })
                }
            }
        })
      }
      
      
    }

    

  
    const getallDoseTime = ()=>{
      setLoading(false);
      userService.getAllDoseTimes().then((response) => {
        setData(response.data.filter((s) => (s.arch.date === moment(new Date()).format("YYYY-MM-DD").toString())).sort((a, b) =>
            a.id < b.id ? 1 : -1
        ).map((d) => {
            return {
              id: d.id,
              rdose: d.rdose,
              time: d.time,
              med: d.med,
              remindTime:d.arch.date +" "+d.time,
              arch: d.arch,
              taken:d.taken,
              reminded:d.reminded,
            }
           
        }))
        setLoading(true);
    })

   
    }




    let body = document.getElementsByTagName('body')[0];
    let className = 'bg-gray-100';



    const toggleTheme = ()=>{
      setTheme((curr)=>(curr === "light" ? "dark" :"light"));
      if (body.classList.contains(className)) {
       
          body.classList.remove("bg-gray-100");
          body.classList.add("bg-dark");

        }else{
          body.classList.remove("bg-dark");
          body.classList.add("bg-gray-100");
        }
      
      
   
      

      
    }

    const toggleBg = (bgx)=>{
      setBg(bgx)
    }

    

function  setToggleConfigFn () {
  
  setToggleConfig(!toggleConfig)
}
  
const SidebarLayout = () => (
  
  <>
  
    <SideBar socket={socket} setTitle={setTitle}  bg={bg}/>
    <ConfigBar  toggleConfig={toggleConfig} theme={theme} setToggleConfigFn={setToggleConfigFn} toggleTheme={toggleTheme} toggleBg={toggleBg} bg={bg}/>
  </>
);
  return (
    <ThemeContext.Provider value={{theme , toggleTheme}}>
      
   
      <div className="seniguardApp" id={theme}>
      {currentUser && <TopBar title={title} socket={socket} t={t} dir={dir} setToggleConfigFn={setToggleConfigFn}/>}
      <div className="container g-sidenav-show mt-5  bg-gray-100 " id='containerr'>
      {currentUser && <SidebarLayout/>}
        <Routes>

            <Route      index element={<Home t={t} dir={dir}/>} />
            <Route      path="/senior" element={<Senior socket={socket} title={title} t={t} dir={dir}/>} />
            <Route      path="/health" element={<Health  title={title} />} />
            <Route      path="/food" element={<Food  title={title} />} />
            <Route      path='/calendar' element={  <CalendarState><Calendar title={title}  />  </CalendarState>}/>
            <Route      path='/profile' element={<Profile title={title} t={t} dir={dir} />}/>
            <Route      path='/newSenior' element={<AddSenior title={title} />}/>
            <Route      path='/staff' element={<Staff title={title} />}/>
            <Route      path='/meal' element={<Meal title={title} socket={socket}  t={t} dir={dir}/>}/>
            <Route      path='/ingredients' element={<Ingredients title={title} />}/>
            <Route      path='/register' element={<AddUser title={title} />} />

        </Routes>
      </div>
      <Routes>
      <Route  setTitle={setTitle} path='/login' element={<LoginComponent title={title} />} />
      
      <Route  path='/notfound' element={<NotFound/>}/>
      </Routes>
    
      </div>
    
    </ThemeContext.Provider>
  )
}
