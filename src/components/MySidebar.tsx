// src/components/Sidebar.tsx
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export default function MySidebar() {
    return (
        <Sidebar
            // className="h-screen bg-blue-300 text-black"
            rootStyles={{
                backgroundColor: '#55238a',

            }}
        >
            <Menu>
                <MenuItem component={<Link to="/overview" />}> Overview </MenuItem>
                <MenuItem component={<Link to="/applications" />}> Applications </MenuItem>
                <MenuItem component={<Link to="/personalDetail" />}> Personal Detail </MenuItem>
            </Menu>
        </Sidebar>
    );
}

