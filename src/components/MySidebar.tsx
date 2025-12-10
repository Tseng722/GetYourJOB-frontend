// src/components/Sidebar.tsx
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import {
    Briefcase, LayoutGrid, User
} from 'lucide-react';


export default function MySidebar() {
    const location = useLocation();

    return (
        <Sidebar
            // className="h-screen bg-blue-300 text-black"
            rootStyles={{
                // backgroundColor: '#55238a',
                backgroundColor: '#ffffff',

            }}
        >
            <Menu menuItemStyles={{
                button: ({ active }) => ({
                    color: active ? "#fff" : "#e9c4c4",
                    backgroundColor: active ? "#c74343" : "transparent",
                    borderRadius: "8px",
                    margin: "4px 8px",
                }),
            }}>
                <h2>Get Your Job</h2>
                <MenuItem
                    icon={<LayoutGrid size={18} />}
                    active={location.pathname === "/overview"}
                    component={<Link to="/overview" />}
                >
                    Overview
                </MenuItem>

                <MenuItem
                    icon={<Briefcase size={18} />}
                    active={location.pathname.startsWith("/applications")}
                    component={<Link to="/applications" />}
                >
                    Applications
                </MenuItem>

                <MenuItem
                    icon={<User size={18} />}
                    active={location.pathname === "/personalDetail"}
                    component={<Link to="/personalDetail" />}
                >
                    Personal Detail
                </MenuItem>
            </Menu>
        </Sidebar>
    );
}

