import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/nav.module.css';

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileMenuHeight, setMobileMenuHeight] = useState(200);

    // Handle the window resize
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 600) {
                setMenuOpen(false); // Hide the mobile menu
            }

            setMobileMenuHeight(window.innerHeight); // Update the height
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className={styles.nav} aria-label='Primary navigation'>
            <div className={styles.brandWrap}>
                <Link href='/' className={styles.logoLink} aria-label='Homepage'>
                    <img className={styles.logo} src='/GRProjects.svg' alt='Gianluca Rainis Projects Logo' aria-hidden='true' />
                </Link>
                <Link href='/' className={styles.brand} aria-label='Homepage'>
                    <p>Gianluca Rainis</p>
                    <p className={styles.projectsP}>Projects</p>
                </Link>
            </div>

            <div className={styles.links}>
                <div className={styles.computerLinks}>
                    <Link href='/projects' aria-label='All Projects'>
                        All Projects
                    </Link>
                    <Link href='/docs' aria-label='Docs'>
                        Docs
                    </Link>
                    <a href='https://github.com/gianluca-rainis' target='_blank' rel='noopener noreferrer' className={styles.externalLink}>
                        GitHub ↗
                    </a>
                    <a href='https://gianlucarainis.com' target='_blank' rel='noopener noreferrer' className={styles.externalLink}>
                        About Me ↗
                    </a>
                </div>
                <div className={styles.mobileLinks}>
                    <svg onClick={() => setMenuOpen(!menuOpen)} className={styles.menuImage} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M4 5h16"></path>
                        <path d="M4 12h16"></path>
                        <path d="M4 19h16"></path>
                    </svg>
                </div>
            </div>

            <div className={`${styles.mobileMenu} ${menuOpen?styles.open:""}`} style={{'height': mobileMenuHeight}} aria-hidden={!menuOpen}>
                <svg onClick={() => setMenuOpen(false)} className={styles.closeMenuImage} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
                <Link href='/projects' aria-label='All Projects'>
                    All Projects
                </Link>
                <Link href='/docs' aria-label='Docs'>
                    Docs
                </Link>
                <a href='https://github.com/gianluca-rainis' target='_blank' rel='noopener noreferrer' className={styles.externalLink}>
                    GitHub ↗
                </a>
                <a href='https://gianlucarainis.com' target='_blank' rel='noopener noreferrer' className={styles.externalLink}>
                    About Me ↗
                </a>
            </div>
        </nav>
    );
}
