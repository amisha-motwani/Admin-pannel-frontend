//Sidebar 
// import './ComponentsCSS.scss';
import { useState, useEffect } from "react";
import {
  FaBars, FaRegChartBar, FaShoppingBag, FaTh,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import "./SideBar.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// eslint-disable-next-line react/prop-types
export default function Sidebar({ setSmall }) {
  ;

  var UserEmail = localStorage.getItem('userEmail');
  console.log("email of user", UserEmail);
  var UserName = localStorage.getItem('userName');
  console.log("name of user", UserName);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  // const [profileDetail, setProfileDetail] = useState(false);

  const menuItem = [
    {
      Path: "/Page1",
      name: "Page 1",
      icon: <FaTh />
    },
    {
      Path: "/Pages2",
      name: "Page 2",
      icon: <FaTh />
    },
    // {
    //   Path:"/SharedWithMe",
    //   name:"Shared with me",
    //   icon: <FaRegChartBar />
    // },
    // {
    //   Path:"/ToDo",
    //   name:"To Do",
    //   icon: <FaShoppingBag />
    // },
    // {
    //   Path:"/MyBookmark",
    //   name:"My Bookmark",
    //   icon: <FaRegChartBar />
    // },
  ]
  // const handleSetting = () => {
  //  setProfileDetail(true);
  // }
  // const handleSetting = () => {

  //   setProfileDetail(!profileDetail);
  // };
  const handleLogoClick = () => {
    navigate("./dashboard");
  }

  // const toggle = () => {
  //   setIsOpen(!isOpen);
  //   setSmall(true);
  // };
  const toggle = () => {
    setIsOpen(!isOpen);
    setSmall((prevSmall) => !prevSmall);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    console.log("setting");
    localStorage.clear();
    sessionStorage.clear();
    toast.success('Logout Sucessfully');
    setTimeout(() => {
      navigate("/");
    }, 800);


  }
  return (
    <>
      <div className="container-fluid d-flex">
        <ToastContainer />
        <div className={isOpen ? "sidebarBig d-flex flex-column" : "sidebarSmall d-flex  flex-column"}>
          <div className={isOpen ? "top_section_big px-2 mt-3" : "top_section_small mt-3"}>
            <h1 className={isOpen ? "logoBig" : "logoSmall"} onClick={handleLogoClick} style={{ cursor: "pointer", fontSize: "20px" }} >
              Sidebar
            </h1>
            <div
              className="barsSmall" style={{ cursor: "pointer" }}>
              <FaBars onClick={toggle} className='toggle_initial_stage ' />
            </div>
          </div>
          <div className="mt-4">
            {
              menuItem.map((item, index) => (
                <NavLink to={item.Path} key={index} className="link mt-3" style={{ textDecoration: "none", cursor: "pointer", marginLeft: "-5px" }}>
                  <div className={isOpen ? "iconBig ps-3" : "iconSmall"} style={{ marginLeft: isOpen ? "-12px" : "0" }} >{item.icon}</div>
                  <div className={isOpen ? "link_text_big " : "link_text_small "} style={{ marginTop: "-6px" }}>{item.name}</div>
                </NavLink>
              ))
            }
          </div>
          <div className="flex justify-center gap-4 items-center mt-auto py-3 ms-[-11px] w-[230px]">
            <div className={isOpen ? "flex" : "d-none"}> <h1 className='text-[20px]'>Amisha Motwani</h1></div>
            <FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogout} />
          </div>
        </div>
      </div>
    </>
  );
}