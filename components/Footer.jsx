import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '@/styles/footer.module.css';

export default function Footer() {
    const footerRef = useRef(null);

    useEffect(() => {
        const footer = footerRef.current;

        if (!footer) {
            return;
        }

        const divider = footer.getElementsByClassName(styles.secondRow)[0];

        function clearGlow() {
            footer.style.setProperty('--pointer-glow-top', '0');
            footer.style.setProperty('--pointer-glow-divider', '0');
        }

        function handlePointerMove(event) {
            const bounds = footer.getBoundingClientRect();
            const dividerBounds = divider.getBoundingClientRect();
            const horizontalDistance = Math.max(bounds.left - event.clientX, 0, event.clientX - bounds.right);
            const pointerX = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
            const topDistance = Math.hypot(horizontalDistance, event.clientY - bounds.top);
            const dividerDistance = Math.hypot(horizontalDistance, event.clientY - dividerBounds.top);
            const topGlowIntensity = Math.max(0, 0.3 * (1 - topDistance / 80));
            const dividerGlowIntensity = Math.max(0, 0.3 * (1 - dividerDistance / 80));

            footer.style.setProperty('--pointer-x', `${pointerX}%`);
            footer.style.setProperty('--pointer-glow-top', `${topGlowIntensity}`);
            footer.style.setProperty('--pointer-glow-divider', `${dividerGlowIntensity}`);
        }

        function handlePointerOut(event) {
            if (event.relatedTarget === null) {
                clearGlow();
            }
        }

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerout', handlePointerOut);
        window.addEventListener('blur', clearGlow);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerout', handlePointerOut);
            window.removeEventListener('blur', clearGlow);
        };
    }, []);

    return (
        <footer ref={footerRef} className={styles.footer} aria-label='Footer'>
            <div className={styles.firstRow}>
                <div className={styles.brandWrap}>
                    <Link href='/' className={styles.logoLink} aria-label='Homepage'>
                        <img className={styles.logo} src='/GRLabs.png' alt='Gianluca Rainis Labs Logo' aria-hidden='true' />
                    </Link>
                    <p className={styles.motto}>Engineering Ideas into Reality.</p>
                </div>

                <div className={styles.links}>
                    <a href='https://github.com/gianluca-rainis' target='_blank' rel='noopener noreferrer' className={styles.externalLink}>
                        <img src='/GitHubLogo.svg' alt='GitHub Logo' />
                    </a>
                    <a href='https://www.linkedin.com/in/gianluca-rainis/' target='_blank' rel='noopener noreferrer' className={styles.externalLink}>
                        <img src='/LinkedInLogo.svg' alt='LinkedIn Logo' />
                    </a>
                    <a href='mailto:gianlucarainis@gianlucarainis.com' target='_blank' rel='noopener noreferrer' className={styles.externalLink}>
                        <img src='/EmailLogo.svg' alt='Email Logo' />
                    </a>
                </div>
            </div>
            <div className={styles.secondRow}>
                <div className={styles.brandWrap}>
                    <p className={styles.secondRowText}>Copyright © {new Date().getFullYear()} Gianluca Rainis</p>
                    <p className={styles.secondRowText}>All Rights Reserved</p>
                </div>

                <div className={styles.links}>
                    <Link href='/' aria-label='projects.gianlucarainis.com'>
                        projects.gianlucarainis.com
                    </Link>
                </div>
            </div>
        </footer>
    );
}
