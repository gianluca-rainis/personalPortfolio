import React from 'react';
import Link from 'next/link';
import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from '@/styles/projects.module.css';
import { usePathname } from 'next/navigation';

export async function getStaticProps() {
    return {
        props: {
            pageTitle: "Projects"
        }
    };
}

export default function Projects({ pageTitle }) {
    const path = usePathname();
    
    return (
        <>
            <Head pageTitle={pageTitle} pageUrl={path} />
            
            <Nav />

            <main className="projects">
                
            </main>

            <Footer />
        </>
    );
}
