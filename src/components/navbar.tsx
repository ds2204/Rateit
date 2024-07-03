import React, { useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [activeItem, setActiveItem] = useState("home"); // Initialize active item state
    const navigate = useNavigate();

    const handleItemClick = (name) => {
        setActiveItem(name); // Update active item state
    };

    const isLoggedIn = localStorage.getItem("guest_session_id") !== null;

    const logout = () => {
        localStorage.removeItem("guest_session_id");
        navigate("/auth");
    };

    return (
        <Menu fixed="top" size="huge" style={{ backgroundColor: "#282c34", borderBottom: "1px solid #61dafb" }}>
            <Menu.Item
                as={Link}
                to="/"
                name="home"
                active={activeItem === "home"}
                onClick={() => handleItemClick("home")}
                style={{ fontSize: "1.5rem", color: activeItem === "home" ? "#61dafb" : "white", fontWeight: "bold" }}
            >
                Home
            </Menu.Item>
            <Menu.Item
                as={Link}
                to="/rated"
                name="rated"
                active={activeItem === "rated"}
                onClick={() => handleItemClick("rated")}
                style={{ fontSize: "1.5rem", color: activeItem === "rated" ? "#61dafb" : "white", fontWeight: "bold" }}
            >
                Rated
            </Menu.Item>
            {isLoggedIn ? (
                <Menu.Menu position="right">
                    <Menu.Item
                        as={Button}
                        name="logout"
                        active={activeItem === "logout"}
                        onClick={logout}
                        style={{ fontSize: "1.5rem", color: "#61dafb", fontWeight: "bold" }}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Menu>
            ) : (
                <Menu.Menu position="right">
                    <Menu.Item
                        as={Link}
                        to="/auth"
                        name="auth"
                        active={activeItem === "auth"}
                        onClick={() => handleItemClick("auth")}
                        style={{ fontSize: "1.5rem", color: activeItem === "auth" ? "#61dafb" : "white", fontWeight: "bold" }}
                    >
                        Auth
                    </Menu.Item>
                </Menu.Menu>
            )}
        </Menu>
    );
};
