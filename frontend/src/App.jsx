import ProtectedRoute from "./components/ProtectedRoute";
import Trips from "./pages/Trips";
import Home from "./pages/Home"
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Account from "./pages/Account";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}/>

        <Route element={<ProtectedRoute requiredPermissions={["User"]}></ProtectedRoute>}>
          <Route path="/trips" element={<Trips></Trips>}></Route>
        </Route>
        
        <Route element={<ProtectedRoute requiredPermissions={["CityAdmin", "CountryAdmin", "UserAdmin"]}></ProtectedRoute>}>
          <Route path="/admin" element={<h1>Accessed the admin page</h1>}></Route>
        </Route>
        
        <Route element={<ProtectedRoute requiredPermissions={["User"]}></ProtectedRoute>}>
          <Route path="/account" element={<Account></Account>}></Route>
        </Route>
        
        <Route path='*' element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;