import React from "react";
import { withRouter } from "react-router-dom";

import "./unauthorised.css";

const Unauthorised = ({ ...props }) => {
    const spinner = require("../../img/loading.svg");

    setTimeout(() => {
        props.history.push("/");
    }, 4000);

    return (
        <main className='unauthorised-body'>
            <section className='unauthorised-container'>
                <h1 className='coscript-h1'>CoScript</h1>
                <p className='verify-text'>
                    Unauthorised request. Redirecting...
                </p>
                <div className='ajax-spinner-container'>
                    <img src={spinner} alt='loading spinner' />
                </div>
            </section>
        </main>
    );
};

export default withRouter(Unauthorised);
