import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@mui/material';
import { useEffect } from 'react';


export default function CustomizedAccordions({menu}) {

  
  return (
    <div style={{width:"150%"}}>
    <Accordion  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <ListItemIcon>
        <img width="40px"  height="40px" src="../../../../assets/img/small-logos/icons-lunchbox-64Breakfast.png" alt='breakfastIcon'/>
        </ListItemIcon>
      <ListItemText>  Breakfast</ListItemText>
    </AccordionSummary>
    <AccordionDetails>
     
       {menu.breakfastMenu && menu.breakfastMenu.map((breakfast)=>(
        <ListItem>
        <ListItemAvatar >
        <img style={{borderRadius: "50%"}} width="40px"  height="40px" src={`http://localhost:8080/files/${breakfast.image.id}`} alt='mealImage'/>
        </ListItemAvatar>
 
       <ListItemText> {breakfast.label}</ListItemText>
    </ListItem>
       ))}
      
    </AccordionDetails>
  </Accordion>
    <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    > <ListItemIcon>
        <img width="40px"  height="40px" src="../../../../assets/img/small-logos/icons-lunchbox-64Lunch.png" alt='lunchIcon'/>
        </ListItemIcon>
      <ListItemText>  Lunch</ListItemText>
    </AccordionSummary>
    <AccordionDetails>
     
       {menu.lunchMenu && menu.lunchMenu.map((lunch)=>(
       <ListItem>
       <ListItemAvatar >
       <img style={{borderRadius: "50%"}} width="40px"  height="40px" src={`http://localhost:8080/files/${lunch.image.id}`} alt='mealImage'/>
       </ListItemAvatar>

      <ListItemText> {lunch.label}</ListItemText>
   </ListItem>
       ))}
      
    </AccordionDetails>
  </Accordion>
    <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
     <ListItemIcon>
        <img width="40px"  height="40px" src="../../../../assets/img/small-logos/icons-lunchbox-64Dinner.png" alt='DinnerIcon'/>
        </ListItemIcon>
      <ListItemText>  Dinner</ListItemText>
    </AccordionSummary>
    <AccordionDetails>
     
       {menu.dinnerMenu && menu.dinnerMenu.map((dinner)=>(
        <ListItem>
            <ListItemAvatar >
            <img style={{borderRadius: "50%"}} width="40px"  height="40px" src={`http://localhost:8080/files/${dinner.image.id}`} alt='mealImage'/>
            </ListItemAvatar>

           <ListItemText> {dinner.label}</ListItemText>
        </ListItem>
       ))}
      
    </AccordionDetails>
  </Accordion>
   
  </div>
    
  );
}
