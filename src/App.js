
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import LogIn from "./Pages/Login";
//import Dashboard from "./Pages/Dashboard"
// import Register from "./Pages/Register";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import "./App.css"
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Dashboard from './Pages/Dashboard'
function App() {

  document.title ="Todo App"

  return (
   <>

<Router>
    <Routes>
      <Route path="/" exact element={<LogIn />}/>
      <Route path="/dashboard" exact element={<Dashboard />}/>
      <Route path="/register" exact element={<Register/>} />
      <Route path="/user/forgotPassword" element={<ForgotPassword />} />
      <Route path="/users/:userId/rp/:randomSt" element={ < ResetPassword />} />
 
    </Routes>
  </Router>
   </>
  );
}

export default App;
