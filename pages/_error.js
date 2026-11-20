import React from 'react';
import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

GenericError.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : (err ? err.statusCode : 404);

    return {
        pageTitle: `Error ${statusCode?statusCode:""}`,
        statusCode: statusCode
    };
}

export default function GenericError({ pageTitle, statusCode }) {
    return (
        <>
            <Head pageTitle={pageTitle} />

            <Nav />

            <main className="errorPageMain">
                <h1>Error {statusCode}</h1>
                <h2>Generic Error</h2>
                <p>
                    We're sorry, but we've encountered an unexpected error. Please try again later.
                </p>
            </main>

            <Footer />
        </>
    );
}
