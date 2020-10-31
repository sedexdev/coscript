import React, { Fragment, useEffect } from "react";

import NavBar from "../NavBar";
import Footer from "../Footer";

import "./legal.css";

export default function Copyright() {
    useEffect(() => {
        document.title = "CoScript - Copyright";
        window.scrollTo(0, 0);
    }, []);

    const wikiHowImage = require("../../img/copyright.PNG");
    const pwImage = require("../../img/copyright2.PNG");
    const wikipediaImage = require("../../img/copyright3.PNG");

    return (
        <Fragment>
            <NavBar />
            <main className='copyright-main'>
                <header className='copyright-header'>
                    <h1 className='copyright-h1'>
                        Copyright &copy; What you Should Know
                    </h1>
                </header>
                <p className='copyright-introduction'>
                    The work you make is valuable to you. You, and the people
                    you work with, spent a long time putting it together and
                    coming up with the ideas that layed the foundations for your
                    creation. Getting your work Copyrighted is not as
                    complicated as some might think and provides you with the
                    peace of mind that the work you create is attributed to you
                    and your coworkers. The following sources provide
                    information on what a Copyright is and how you can ensure
                    your work is protected. This is not obligatory but it is
                    recommended, so please have a read through these sources.
                </p>
                <p className='copyright-introduction-note'>
                    If you think these sources could be expanded, please email
                    suggestions to{" "}
                    <a href='mailto:legal@cosript.co.uk'>legal@cosript.co.uk</a>
                </p>
                <div className='source-info-container'>
                    <h2 className='source-info-header'>Wiki-How</h2>
                    <a
                        href='https://www.wikihow.com/Copyright-Your-Writing-for-Free'
                        rel='noopener noreferrer'
                        target='_blank'>
                        <img
                            className='source-link-img'
                            src={wikiHowImage}
                            alt='wiki-how website landing page'
                        />
                    </a>
                    <p className='source-info-description'>
                        A simple and well laid out, step-by-step guide to
                        understanding and putting in place a Copyright{" "}
                        <a
                            href='https://www.wikihow.com/Copyright-Your-Writing-for-Free'
                            rel='noopener noreferrer'
                            target='_blank'>
                            https://www.wikihow.com/Copyright-Your-Writing-for-Free
                        </a>
                    </p>
                </div>
                <div className='source-info-container'>
                    <h2 className='source-info-header'>Wikipedia</h2>
                    <a
                        href='https://en.wikipedia.org/wiki/Copyright'
                        rel='noopener noreferrer'
                        target='_blank'>
                        <img
                            className='source-link-img'
                            src={wikipediaImage}
                            alt='wiki-how website landing page'
                        />
                    </a>
                    <p className='source-info-description'>
                        In depth description of the history and purpose of
                        Copyright, as well as coverage of legal enforcement,
                        consequences of breaking Copyright and its limitations{" "}
                        <a
                            href='https://en.wikipedia.org/wiki/Copyright'
                            rel='noopener noreferrer'
                            target='_blank'>
                            https://en.wikipedia.org/wiki/Copyright
                        </a>
                    </p>
                </div>
                <div className='source-info-container'>
                    <h2 className='source-info-header'>pw.org</h2>
                    <a
                        href='https://www.pw.org/content/copyright'
                        rel='noopener noreferrer'
                        target='_blank'>
                        <img
                            className='source-link-img'
                            src={pwImage}
                            alt='pw.org website landing page'
                        />
                    </a>
                    <p className='source-info-description'>
                        A coverage of how Copyright is implemented in the U.S.
                        This may not be relevant to everyone reading this but
                        the site contains many useful links and articles that
                        could be helpful to new writers{" "}
                        <a
                            href='https://www.pw.org/content/copyright'
                            rel='noopener noreferrer'
                            target='_blank'>
                            https://www.pw.org/content/copyright
                        </a>
                    </p>
                </div>
            </main>
            <Footer />
        </Fragment>
    );
}
