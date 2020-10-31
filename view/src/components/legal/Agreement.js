import React, { Fragment, useEffect } from "react";

import NavBar from "../NavBar";
import Footer from "../Footer";

import "./legal.css";

export default function Agreement() {
    useEffect(() => {
        document.title = "CoScript - Agreements";
        window.scrollTo(0, 0);
    }, []);

    const informationLink = require("../../img/agreement.PNG");
    const agreementLink = require("../../img/agreement2.PNG");

    return (
        <Fragment>
            <NavBar />
            <main className='agreement-main'>
                <header className='agreement-header'>
                    <h1 className='agreement-h1'>
                        Collaborative Writers Agreements
                    </h1>
                </header>
                <p className='agreement-introduction'>
                    This area provides information on how you can draft up a
                    Collaborative Writers Agreement, and the reasons why you may
                    want to do so. This may not be something that every user
                    feels is necessary, but for some users it could provide an
                    extra layer of security and comfort whilst working with
                    others. Please be considerate when working with other
                    people, and if you feel that a formal agreement will help
                    this process then follow the links to learn how to put an
                    agreement in place.
                </p>
                <div className='source-info-container'>
                    <h2 className='source-info-header'>Rights of Writers</h2>
                    <a
                        href='http://www.rightsofwriters.com/2011/01/good-fences-when-and-why-co-writers.html'
                        rel='noopener noreferrer'
                        target='_blank'>
                        <img
                            className='source-link-img'
                            src={agreementLink}
                            alt='wiki-how website landing page'
                        />
                    </a>
                    <p className='source-info-description'>
                        Legal advice on entering into a collaborative writing
                        agreement, including a few examples of where one has
                        been beneficial in settling disputes. Sets out a list of
                        considerations that authors may find useful when
                        drafting their own agreements{" "}
                        <a
                            href='http://www.rightsofwriters.com/2011/01/good-fences-when-and-why-co-writers.html'
                            rel='noopener noreferrer'
                            target='_blank'>
                            http://www.rightsofwriters.com/2011/01/good-fences-when-and-why-co-writers.html
                        </a>
                    </p>
                </div>
                <div className='source-info-container'>
                    <h2 className='source-info-header'>Rocket Lawyers</h2>
                    <a
                        href='https://www.rocketlawyer.com/gb/en/sem/collaboration-agreement'
                        rel='noopener noreferrer'
                        target='_blank'>
                        <img
                            className='source-link-img'
                            src={informationLink}
                            alt='wiki-how website landing page'
                        />
                    </a>
                    <p className='source-info-description'>
                        A free and simple online contract provider that allows
                        users to draft their own agreements and add as many
                        participants as they like. Many users will not want to
                        share their information and this removes the need to
                        share personal details like email addresses that would
                        be needed in order to sign a hard copy of an agreement{" "}
                        <a
                            href='https://www.rocketlawyer.com/gb/en/sem/collaboration-agreement'
                            rel='noopener noreferrer'
                            target='_blank'>
                            https://www.rocketlawyer.com/gb/en/sem/collaboration-agreement
                        </a>
                    </p>
                </div>
            </main>
            <Footer />
        </Fragment>
    );
}
