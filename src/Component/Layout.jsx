// FullLayout page

// import '../CustomCSS/App.scss';\
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';
import { useState, useContext } from 'react';
import { createContext } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
const data = createContext();
const data1 = createContext();
const data2 = createContext();


export default function Layout() {
  const [small, setSmall] = useState(false);
  const [calendar, setCalendar] = useState("");

  return (
<>
<data.Provider value={small}>
<data1.Provider value={setCalendar}>
<data2.Provider value={calendar}>
    <div className='d-flex'>
      <div className='parent' style={{width:"5%", border:"none", height:"100vh", zIndex:"6", backgroundColor:"#004467" }}>
      <Sidebar setSmall={setSmall} />
      </div>
      <div className={small? "bg-[#a1a1a3]" :"ms-[155px] ps-1 bg-[#e2ecf7]"} style={{width:"100%", overflowX:"hidden"}}>
          <Outlet />
      </div>
    </div>
    </data2.Provider>
    </data1.Provider>
    </data.Provider>
</>
  )
  }
  export {data, data1, data2}
  // export default [LayoutContext]

