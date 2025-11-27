// src/layouts/SidebarLayout.tsx
import MySidebar from "../components/MySidebar";
import { Outlet } from "react-router-dom";
import { Row, Col, Container, Alert, Spinner, Accordion } from "react-bootstrap";

function SidebarLayout() {
    return (
        <div style={{
            display: "flex",
            height: "100vh",
            width: "100%",
            overflow: "hidden"
        }}>

            <MySidebar />

            <div
                style={{
                    flexGrow: 1,
                    height: "100%",
                    overflowY: "auto",
                    padding: "20px"
                }}
            >
                <Outlet />
            </div>

        </div>
    );
}

export default SidebarLayout;

