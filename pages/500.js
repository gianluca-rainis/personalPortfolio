import React from 'react';
import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export async function getStaticProps() {
    return {
        props: {
            pageTitle: "Error 500 - Internal Server Error"
        }
    };
}

export default function Page500({ pageTitle }) {
    return (
        <>
            <Head pageTitle={pageTitle} />
            
            <Nav />

            <main className="errorPageMain">
                <h1>Error 500</h1>
                <h2>Internal Server Error</h2>
                <p>
                    We're sorry, but we encountered a server error. Please try again later.
                </p>
            </main>

            <Footer />
        </>
    );
}
