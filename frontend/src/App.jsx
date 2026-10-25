import ProtectedRoute from "./Components/ProtectedRoute";
import Trips from "./pages/Trips";
import Home from "./Pages/Home"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Account from "./pages/Account";
import MainLayout from "./MainLayout";
import AboutUs from "./Pages/AboutUs";
import Admin from "./Pages/Admin";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout></MainLayout>}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/AboutUs" element={<AboutUs></AboutUs>}></Route>

            <Route element={<ProtectedRoute requiredPermissions={["User"]}></ProtectedRoute>}>
              <Route path="/trips" element={<Trips></Trips>}></Route>
              <Route path="/account" element={<Account></Account>}></Route>
            </Route>

            <Route element={<ProtectedRoute requiredPermissions={["PlacesAdmin", "UserAdmin", "CountryAdmin"]}></ProtectedRoute>}>
              <Route path="/admin" element={<Admin></Admin>}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>

  );
}

export default App;