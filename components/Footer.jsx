import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/footer.module.css';

export default function Footer() {
    // const [menuOpen, setMenuOpen] = useState(false);

    // Handle the window resize
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 600) {
                // Handle resize here
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <footer className={styles.footer} aria-label='Footer'>
            {/* <div className={styles.brandWrap}>
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
            </div> */}
        </footer>
    );
}
