import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from '@/styles/projects.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export async function getStaticProps() {
    return {
        props: {
            pageTitle: "Project"
        }
    };
}

export default function ProjectPage({ pageTitle }) {
    const path = usePathname();

    return (
        <>
            <Head pageTitle={pageTitle} pageUrl={path} />
            <Nav />

            <main className={styles.projectPage}>
                <header className={styles.projectHeader}>
                    <Link href='/projects' className={styles.backLink}><span className={styles.arrowIcon} aria-hidden='true' /> All projects</Link>
                    <div>
                        <div className={styles.projectHeaderInfo}>
                            <h1>Title</h1>
                            <ul>
                                <li className={styles.projectCategory}>Category</li>
                                <li className={styles.projectStatus}>Status</li>
                            </ul>
                        </div>
                        <p className={styles.projectDescription}>Description</p>
                        <ul>
                            <li>Tag</li>
                            <li>Tag</li>
                            <li>Tag</li>
                        </ul>
                    </div>
                    <img src="/project-image.jpg" alt="Project image" />
                    <div>

                    </div>
                </header>
                <article className={styles.projectContent}>
                    
                </article>
            </main>

            <Footer />
        </>
    );
}
