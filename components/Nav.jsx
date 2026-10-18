import Link from 'next/link';
import styles from '@/styles/nav.module.css';

export default function Nav() {
    return (
        <nav className={styles.nav} aria-label='Primary navigation'>
            <div className={styles.brandWrap}>
                <Link href='/' className={styles.avatarLink} aria-label='Homepage'>
                    <img className={styles.avatar} src='/icon.png' alt='' aria-hidden='true' />
                </Link>
                <Link href='/' className={styles.brand} aria-label='Homepage'>
                    Gianluca Rainis
                </Link>
            </div>

            <div className={styles.links}>
                <a href='https://github.com/gianluca-rainis' target='_blank' rel='noopener noreferrer'>
                    GitHub
                </a>
                <a href='https://www.linkedin.com/in/gianluca-rainis' target='_blank' rel='noopener noreferrer'>
                    LinkedIn
                </a>
                <Link href='/curriculum' aria-label='Curriculum Vitae'>
                    Curriculum Vitae
                </Link>
                <Link href='/contact' aria-label='Contact Me'>
                    Contact Me
                </Link>
            </div>

            <div className={styles.statusArea}>
                
            </div>
        </nav>
    );
}
