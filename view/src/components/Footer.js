import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getMostRecentProject } from "../redux/actions/documents";

import PropTypes from "prop-types";

import "./footer.css";

export const Footer = ({ user, loading, getMostRecentProject, ...props }) => {
    const authLinks = (
        <div className='footer-links'>
            <Link to='/'>Home</Link>
            <Link to='/profile'>Profile</Link>
            <Link
                to='#'
                onClick={async () => {
                    await getMostRecentProject();
                    const { projectData } = props;
                    projectData
                        ? props.history.push(`/editor${projectData.url}`)
                        : props.history.push("/editor");
                }}>
                Workspace
            </Link>
            <Link to='/projects'>Active Projects</Link>
            <Link to='/publications'>Publications</Link>
        </div>
    );

    const guestLinks = (
        <div className='footer-links'>
            <Link to='/'>Home</Link>
            <Link to='/projects'>Active Projects</Link>
            <Link to='/publications'>Publications</Link>
        </div>
    );

    const isLoggedIn = user ? user.isLoggedIn : false;

    return (
        <footer className='footer'>
            <h2 className='footer-h2'>CoScript</h2>
            <div className='footer-container'>
                <div className='links-container socials'>
                    <p>Socials</p>
                    <div className='footer-links'>
                        <a href='https://github.com/AndrewMacmillan87/coscript'>
                            GitHub
                        </a>
                        <a href='/'>Twitter</a>
                        <a href='/'>Facebook</a>
                    </div>
                </div>
                <div className='links-container site-map'>
                    <p>Site Map</p>

                    {!loading && (
                        <Fragment>
                            {isLoggedIn ? authLinks : guestLinks}
                        </Fragment>
                    )}
                </div>
                <div className='links-container legals'>
                    <p>Legal</p>
                    <div className='footer-links'>
                        <a href='/terms'>Terms and Conditions</a>
                        <a href='/copyright'>Copyright Info</a>
                        <a href='/agreement'>Writers Agreements</a>
                        <a href='/'>Accreditation</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
    getMostRecentProject: PropTypes.func.isRequired,
};

const mapProps = (state) => ({
    user: state.auth.user,
    loading: state.auth.loading,
    projectData: state.documents.projectData,
});

export default connect(mapProps, { getMostRecentProject })(withRouter(Footer));
