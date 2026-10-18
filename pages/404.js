import React from 'react';
import Nav from '@/components/Nav';
import Head from '@/components/Head';
import { usePathname } from 'next/navigation';

export async function getStaticProps() {
    return {
        props: {
            pageTitle: "Error 404 - Page not Found"
        }
    };
}

export default function Page404({ pageTitle }) {
    const path = usePathname();

    return (
        <>
            <Head pageTitle={pageTitle} pageUrl={path} />

            <Nav />

            <main className="errorPageMain">
                <h1>Error 404</h1>
                <h2>Page not found</h2>
                <p>
                    We're sorry, but the page you're looking for doesn't exist or has moved.
                </p>
            </main>
        </>
    );
}
