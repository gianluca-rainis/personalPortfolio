import Link from 'next/link';
import styles from '@/styles/footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer} aria-label='Footer'>
            <div className={styles.firstRow}>
                <div className={styles.brandWrap}>
                    <Link href='/' className={styles.logoLink} aria-label='Homepage'>
                        <img className={styles.logo} src='/GRProjects.svg' alt='Gianluca Rainis Projects Logo' aria-hidden='true' />
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
