import ProtectedRoute from "./components/ProtectedRoute";
import Trips from "./pages/Trips";
import Home from "./pages/Home"
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Account from "./pages/Account";
import MainLayout from "./MainLayout";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout></MainLayout>}>
          <Route path="/" element={<Home></Home>}></Route>
          
          <Route element={<ProtectedRoute requiredPermissions={["User"]}></ProtectedRoute>}>
            <Route path="/trips" element={<Trips></Trips>}></Route>
            <Route path="/account" element={<Account></Account>}></Route>
          </Route>
          
          <Route element={<ProtectedRoute requiredPermissions={["CityAdmin", "UserAdmin", "CountryAdmin"]}></ProtectedRoute>}>
            <Route path="/admin" element={<h1>Admin</h1>}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;