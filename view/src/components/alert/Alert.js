import React from "react";

// Redux
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import "./alert.css";

export const Alert = withRouter(({ alerts, userProfile, projectData, ...props }) => {
    return (
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => {
            switch (props.location.pathname) {
                case "/login":
                    return (
                        <div key={alert.id} className={`login-alert alert-${alert.alertType}`}>
                            {alert.msg}
                        </div>
                    );
                case "/account":
                    return (
                        <div key={alert.id} className={`account-alert alert-${alert.alertType}`}>
                            {alert.msg}
                        </div>
                    );
                case "/update-credentials":
                    return (
                        <div key={alert.id} className={`update-alert alert-${alert.alertType}`}>
                            {alert.msg}
                        </div>
                    );
                case `/landing${projectData ? projectData.url : ""}/contact`:
                    return (
                        <div key={alert.id} className={`contact-alert alert-${alert.alertType}`}>
                            {alert.msg}
                        </div>
                    );
                case "/profile":
                    return (
                        <div key={alert.id} className={`delete-alert alert-${alert.alertType}`}>
                            {alert.msg}
                        </div>
                    );
                case "/messages":
                case "/public-profile":
                    return (
                        <div key={alert.id} className={`message-alert alert-${alert.alertType}`}>
                            {alert.msg}
                        </div>
                    );
                case `/profile/user/${userProfile ? userProfile.id : ""}`:
                    return (
                        <div key={alert.id} className={`request-alert alert-${alert.alertType}`}>
                            {alert.msg}
                        </div>
                    );
                default:
                    return (
                        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                            {alert.msg}
                        </div>
                    );
            }
        })
    );
});

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    userProfile: PropTypes.object,
    projectData: PropTypes.object,
};

// The state here comes from the rootReducer - reducers/index.js
const setProps = (state) => ({
    alerts: state.alertpopup,
    userProfile: state.auth.userProfile,
    projectData: state.documents.projectData,
});

export default connect(setProps)(Alert);
