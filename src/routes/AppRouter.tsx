// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarLayout from "../pages/SidebarLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Overview from "../pages/Overview";
import ManageApplication from "../pages/ManageApplication";
import PersonalDetail from "../pages/PersonalDetail";
import Application from "../pages/Application";
// import Application from "../pages/Application";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/application" element={<Application />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<SidebarLayout />}>
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/personalDetail" element={<PersonalDetail />} />
                    <Route path="/applications" element={<Application />} />
                    <Route path="/applications/update/:id" element={<ManageApplication />} />
                    <Route path="/applications/create" element={<ManageApplication />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
