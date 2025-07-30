import React from "react";
import { Link, withRouter } from "react-router-dom";

import homeIcon from "../../img/icons/home.svg";

import "./mobile-nav.css";

class MobileNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        this.handleClick = this.handleClick.bind(this);
        this.displayAccountLink = this.displayAccountLink.bind(this);
    }

    handleClick() {
        this.setState((state) => ({
            visible: !state.visible,
        }));
    }

    displayAccountLink() {
        if (this.props.location.pathname === "/profile") {
            return (
                <Link to="/account">
                    <p className="dropdown-link">Account</p>
                </Link>
            );
        }
    }

    render() {
        const menuIcon = require("../../img/menu.svg");
        const displayClass =
            this.props.location.pathname === "/profile"
                ? "dropdown-menu dropdown-content profile-display"
                : "dropdown-menu dropdown-content display";

        return (
            <nav className="profile-mobile-nav">
                <Link to="/">
                    <img className="home-icon" src={homeIcon} alt="home icon" />
                </Link>
                <button
                    className="profile-dropdown-icon-link"
                    onClick={this.handleClick}
                >
                    <img
                        className="profile-dropdown-icon"
                        src={menuIcon}
                        alt="Burger menu icon"
                    />
                </button>
                <div
                    id="dropdown-nav"
                    className={
                        this.state.visible
                            ? displayClass
                            : "dropdown-menu dropdown-content"
                    }
                >
                    <Link to="/profile">
                        <p className="dropdown-link">My Profile</p>
                    </Link>
                    {this.displayAccountLink()}
                    <Link to="/messages">
                        <p className="dropdown-link">Messages</p>
                    </Link>
                    <Link to="/projects">
                        <p className="dropdown-link">Active Projects</p>
                    </Link>
                    <Link to="/publications">
                        <p className="dropdown-link">Publications</p>
                    </Link>
                    <a
                        onClick={() => {
                            this.props.history["from"] = "logout";
                            this.props.history.push("/redirect");
                        }}
                        href=" "
                    >
                        <p className="dropdown-link">Logout</p>
                    </a>
                </div>
            </nav>
        );
    }
}

export default withRouter(MobileNav);
