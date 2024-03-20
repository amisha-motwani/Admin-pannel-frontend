// import LogIn from './login/logIn';

import { useRoutes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AppRoutes from './routes';
// import { PublicClientApplication } from "@azure/msal-browser";
// import {msalConfig} from "../authconfig"
// import { MsalProvider } from "@azure/msal-react";
// import { authProtectedRoutes, publicRoutes } from "./PublicRoutes.jsx"
import {ToastContainer} from 'react-toastify';
// import Protected from './Protected';
import CheckRoute from './routes';
function App() {
  // console.log("CheckRoute==>", CheckRoute());
  // const msalInstance = new PublicClientApplication(msalConfig);
  const routing = useRoutes(CheckRoute());

  return (
    <>
    <div>
    <ToastContainer/>
    
     {routing}

    
    </div>
    </>
  )
}
export default App;

