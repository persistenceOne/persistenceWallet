import React from "react";
import {NavLink} from 'react-router-dom';
import {Nav, Navbar} from "react-bootstrap";
import logo from "../assets/images/logo_bold.svg";
import {useTranslation} from "react-i18next";

const RouteNotFound = () => {
    const {t} = useTranslation();
    return (
        <div className="home-page pageError">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <div className="container">
                    <Navbar.Brand><NavLink to="/dashboard/wallet">
                        <img src={logo} alt="logo"/>
                    </NavLink></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <a className="nav-link" href="https://persistence.one/" target="_blank"
                                rel="noopener noreferrer">Learn More</a>
                            <li className="nav-item link">
                                <a className="nav-link primary-medium-color"
                                    href="https://notes.persistence.one/s/9l80_chis" rel="noopener noreferrer"
                                    target="_blank">
                                    {t("HELP")}
                                </a>
                            </li>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            <div className="text-container">
                <h3>Page Not Found</h3>
            </div>
        </div>
    );
};
export default RouteNotFound;