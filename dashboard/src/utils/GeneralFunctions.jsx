
export const  TabTitle = (newTitle)=>{
  return (document.title=newTitle);
} 

export function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

export function getBithdate(dateString){
  var today = new Date();
  var birthDate = new Date(dateString);
  var m = today.getMonth() - birthDate.getMonth();
  var day = today.getDate() - birthDate.getDate();
  if ( m === 0 && day===0) {
      return true;
  }else{
    return false;
  }
}


export function remindAt(dateString){
  var today = new Date();
  var birthDate = new Date(dateString);
  var year = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  var day = today.getDate() - birthDate.getDate();
  var hour = today.getHours() - birthDate.getHours();
  var minutes = today.getMinutes() - birthDate.getMinutes();
  console.log(today.getTime()-birthDate.getTime()+" time "+minutes)
  if ( year===0 && m === 0 && day===0 && hour>-1 ) {
      return true;
  }else{
    return false;
  }
}
