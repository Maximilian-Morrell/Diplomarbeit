import ProtectedRoute from "./Components/ProtectedRoute";
import Trips from "./pages/Trips";
import Home from "./pages/Home"
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Account from "./pages/Account";
import MainLayout from "./MainLayout";
import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout></MainLayout>}>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/AboutUs" element={<AboutUs></AboutUs>}></Route>
          
          <Route element={<ProtectedRoute requiredPermissions={["User"]}></ProtectedRoute>}>
            <Route path="/trips" element={<Trips></Trips>}></Route>
            <Route path="/account" element={<Account></Account>}></Route>
          </Route>
          
          <Route element={<ProtectedRoute requiredPermissions={["CityAdmin", "UserAdmin", "CountryAdmin"]}></ProtectedRoute>}>
            <Route path="/admin" element={<Admin></Admin>}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;