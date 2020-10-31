import React from "react";
import { Link } from "react-router-dom";
import Button from "../buttons/Button";

import "./Component404.css";

const Component404 = () => {
    return (
        <section className='four0four-body'>
            <div className='four0four-container'>
                <h1 className='four0four-header'>Ooops, 404...</h1>
                <p className='four0four-text'>
                    It looks like the page you were looking for isn't here :(
                </p>
                <Link to='/'>
                    <Button classes='small-btn' value='Home Page' />
                </Link>
            </div>
        </section>
    );
};

export default Component404;
