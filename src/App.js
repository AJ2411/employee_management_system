import './App.css';
import { Navigate, Route, Router, Routes, useLocation, useNavigate } from 'react-router';
import Login from './Pages/Login';
import Home from './Pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import { AdminProvider } from './components/context/Context';
import { ToastContainer } from 'react-toastify';
import EditEmployee from './components/EditEmployee';
const privacy = localStorage.getItem("privacy")

function App() {
  console.log("privacy",privacy);
 
  return (
    <AdminProvider>
       <ToastContainer />
<Routes>
  {privacy &&
(<Route  path='/auth' element={<Home/>}/>) 
  }
{/* <Route path='/edit' element={<EditEmployee/>}/> */}
<Route  path='/' element={<Login/>}>
</Route>
 </Routes>
 </AdminProvider>
  );
}

export default App;
