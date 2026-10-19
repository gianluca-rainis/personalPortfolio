import Link from 'next/link';
import styles from '@/styles/nav.module.css';

export default function Nav() {
    return (
        <nav className={styles.nav} aria-label='Primary navigation'>
            <div className={styles.brandWrap}>
                <Link href='/' className={styles.logoLink} aria-label='Homepage'>
                    <img className={styles.logo} src='/GRProjects.svg' alt='' aria-hidden='true' />
                </Link>
                <Link href='/' className={styles.brand} aria-label='Homepage'>
                    <p>Gianluca Rainis</p>
                    <p className={styles.projectsP}>Projects</p>
                </Link>
            </div>

            <div className={styles.links}>
                <Link href='/projects' aria-label='All Projects'>
                    All Projects
                </Link>
                <Link href='/docs' aria-label='Docs'>
                    Docs
                </Link>
                <a href='https://gianlucarainis.com' target='_blank' rel='noopener noreferrer'>
                    About Me
                </a>
            </div>
        </nav>
    );
}
