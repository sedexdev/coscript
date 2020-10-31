import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { reduxStore, persistor } from "./redux/store/reduxStore";
import { PersistGate } from "redux-persist/integration/react";
import { loadUser } from "./redux/actions/auth";

// Application components
import Index from "./components/index/Index";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import TextEditor from "./components/editor/TextEditor";
import ReadOnly from "./components/read-only/ReadOnly";
import Messages from "./components/user-data/messages/Messages";
import Profile from "./components/user-data/profile/Profile";
import PublicProfile from "./components/user-data/public-profile/PublicProfile";
import Account from "./components/user-data/account/Account";
import Projects from "./components/projects-publications/Projects";
import Publications from "./components/projects-publications/Publications";
import Verify from "./components/verify/Verify";
import Unauthorised from "./components/unauthorised/Unauthorised";
import Landing from "./components/landing-page/Landing";
import Component404 from "./components/404/Component404";
import RedirectHome from "./components/redirect/Redirect";
import ChangePassword from "./components/change-password/ChangePassword";
import Copyright from "./components/legal/Copyright";
import Agreement from "./components/legal/Agreement";
import Terms from "./components/legal/Terms";

import PropTypes from "prop-types";

import "./App.css";

const App = ({ user, userProfile, projectData, fileData }) => {
    useEffect(() => {
        reduxStore.dispatch(loadUser());
    }, []);

    const profilePath = userProfile ? userProfile.url : "";
    const projectPath = projectData ? projectData.url : "";
    const filePath = fileData ? fileData.url : "";
    const isLoggedIn = user ? user.isLoggedIn : false;

    return (
        <Provider store={reduxStore}>
            <PersistGate persistor={persistor}>
                <div className='App'>
                    <Router>
                        <Switch>
                            <Route exact path='/' component={Index} />
                            <Route exact path='/login' component={Login} />
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route
                                exact
                                path='/projects'
                                component={Projects}
                            />
                            <Route
                                exact
                                path='/publications'
                                component={Publications}
                            />
                            <Route
                                exact
                                path={`/landing${projectPath}`}
                                component={Landing}
                            />
                            <Route
                                exact
                                path='/redirect'
                                isLoggedIn={isLoggedIn}
                                component={RedirectHome}
                            />
                            <Route
                                exact
                                path='/unauthorised'
                                component={Unauthorised}
                            />
                            <Route exact path='/verify' component={Verify} />
                            <Route
                                exact
                                path='/copyright'
                                component={Copyright}
                            />
                            <Route
                                exact
                                path='/agreement'
                                component={Agreement}
                            />
                            <Route exact path='/terms' component={Terms} />
                            <Private
                                exact
                                path={`/editor${filePath}`}
                                isLoggedIn={isLoggedIn}
                                component={TextEditor}
                            />
                            <Private
                                exact
                                path={`/editor${projectPath}`}
                                isLoggedIn={isLoggedIn}
                                component={TextEditor}
                            />
                            <Private
                                exact
                                path='/editor'
                                isLoggedIn={isLoggedIn}
                                component={TextEditor}
                            />
                            <Private
                                exact
                                path={`/read${projectPath}`}
                                isLoggedIn={isLoggedIn}
                                component={ReadOnly}
                            />
                            <Private
                                exact
                                path='/messages'
                                isLoggedIn={isLoggedIn}
                                component={Messages}
                            />
                            <Private
                                exact
                                path='/profile'
                                isLoggedIn={isLoggedIn}
                                component={Profile}
                            />
                            <Route
                                path={`/profile${profilePath}`}
                                component={PublicProfile}
                            />
                            <Private
                                exact
                                path='/account'
                                isLoggedIn={isLoggedIn}
                                component={Account}
                            />
                            {/* Make this endpoint inaccessible to logged in users by direct url */}
                            <Protected
                                exact
                                path='/update-credentials'
                                user={user}
                                component={ChangePassword}
                            />
                            <Route component={Component404} />
                        </Switch>
                    </Router>
                </div>
            </PersistGate>
        </Provider>
    );
};

const Private = ({ isLoggedIn, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

const Protected = ({ user, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (user && user.isLoggedIn && user.authToken) {
                    return <Component {...props} />;
                }
                if (user && user.passwordUpdated) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/redirect",
                                state: { passwordChanged: true },
                            }}
                        />
                    );
                } else {
                    return <Redirect to='/unauthorised' />;
                }
            }}
        />
    );
};

App.propTypes = {
    user: PropTypes.object,
};

const mapProps = (state) => ({
    user: state.auth.user,
    userProfile: state.auth.userProfile,
    projectData: state.documents.projectData,
    fileData: state.files.fileData,
});

export default connect(mapProps, {})(App);
