import React from 'react';
import Nav from '@/components/Nav';
import Head from '@/components/Head';
import { usePathname } from 'next/navigation';

export async function getStaticProps() {
    return {
        props: {
            pageTitle: ""
        }
    };
}

export default function HomePage({ pageTitle }) {
    const path = usePathname();

    return (
        <>
            <Head pageTitle={pageTitle} pageUrl={path} />

            <Nav />

            <main>
                <h1>Home Page</h1>
            </main>
        </>
    );
}
