import React, { useEffect, useState } from 'react'
import './navbar.css'
function Navbar() {
    const [show,handlShow] = useState(false);
function Sfunc(){
        if(window.scrollY > 100){
            handlShow(true);
        }
        else handlShow(false);
}
useEffect(()=>{
window.addEventListener("scroll",Sfunc);
return () => {
    window.removeEventListener('scroll', Sfunc);
  };
},[]);


  return (
  <div className={`nav ${show && "nav_black"}`}>
    <img  className='nav__logo'
    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" />
  <img className='nav__avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Avatar Logo" />
  </div>
  )
}

export default Navbar