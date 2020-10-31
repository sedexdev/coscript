import React, { Fragment, useEffect } from "react";

import NavBar from "../NavBar";
import Footer from "../Footer";

import "./legal.css";

export default function Agreement() {
    useEffect(() => {
        document.title = "CoScript - Terms and Conditions";
        window.scrollTo(0, 0);
    }, []);

    return (
        <Fragment>
            <NavBar />
            <main className='terms-main'>
                <header className='terms-header'>
                    <h1 className='terms-h1'>Terms and Conditions</h1>
                </header>
                <p className='terms-body'>
                    Welcome to our website. If you continue to browse and use
                    this website, you are agreeing to comply with and be bound
                    by the following terms and conditions of use, which together
                    with our privacy policy govern CoScript's relationship with
                    you in relation to this website. If you disagree with any
                    part of these terms and conditions, please do not use our
                    website.
                </p>{" "}
                <p className='terms-body'>
                    The term CoScript or 'us' or 'we' refers to the owner of the
                    website whose registered office is [address]. Our company
                    registration number is [company registration number and
                    place of registration]. The term 'you' refers to the user or
                    viewer of our website.
                </p>
                <p className='terms-body'>
                    {" "}
                    The use of this website is subject to the following terms of
                    use:
                </p>
                <ul className='terms-list'>
                    {" "}
                    <li>
                        The content of the pages of this website is for your
                        general information and use only. It is subject to
                        change without notice.
                    </li>{" "}
                    <li>
                        This website uses cookies to monitor browsing
                        preferences. If you do allow cookies to be used, the
                        following personal information may be stored by us but
                        will not be granted for use by third parties: Email
                        address, name, username, password, any profile
                        information that you enter on the site.
                    </li>{" "}
                    <li>
                        {" "}
                        Neither we nor any third parties provide any warranty or
                        guarantee as to the accuracy, timeliness, performance,
                        completeness or suitability of the information and
                        materials found or offered on this website for any
                        particular purpose. You acknowledge that such
                        information and materials may contain inaccuracies or
                        errors and we expressly exclude liability for any such
                        inaccuracies or errors to the fullest extent permitted
                        by law.
                    </li>{" "}
                    <li>
                        Your use of any information or materials on this website
                        is entirely at your own risk, for which we shall not be
                        liable. It shall be your own responsibility to ensure
                        that any products, services or information available
                        through this website meet your specific requirements.
                    </li>{" "}
                    <li>
                        This website contains material which is owned by or
                        licensed to us. This material includes, but is not
                        limited to, the design, layout, look, appearance and
                        graphics. Reproduction is prohibited other than in
                        accordance with the copyright notice, which forms part
                        of these terms and conditions.
                    </li>{" "}
                    <li>
                        All trade marks reproduced in this website which are not
                        the property of, or licensed to, the operator are
                        acknowledged on the website.
                    </li>{" "}
                    <li>
                        Unauthorised use of this website may give rise to a
                        claim for damages and/or be a criminal offence.
                    </li>{" "}
                    <li>
                        From time to time this website may also include links to
                        other websites. These links are provided for your
                        convenience to provide further information. They do not
                        signify that we endorse the website(s).
                    </li>{" "}
                    <li>
                        We have no responsibility for the content of the linked
                        website(s). Your use of this website and any dispute
                        arising out of such use of the website is subject to the
                        laws of England, Northern Ireland, Scotland and Wales.
                    </li>
                </ul>
                <p className='terms-credit-link'>
                    The template for these Terms and Conditions was provided by{" "}
                    <a
                        href='https://www.nibusinessinfo.co.uk/content/sample-website-terms-and-conditions-use'
                        rel='noopener noreferrer'
                        target='_blank'>
                        NI Business Info
                    </a>
                </p>
            </main>
            <Footer />
        </Fragment>
    );
}
