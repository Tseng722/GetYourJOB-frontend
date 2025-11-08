// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
// import Application from "../pages/Application";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/application" element={<Application />} /> */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
