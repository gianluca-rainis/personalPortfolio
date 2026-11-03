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
                    <Link href='/projects' className={styles.backLink}><span className={styles.backarrowIcon} aria-hidden='true' /> All projects</Link>
                    <div>
                        <div className={styles.projectHeaderInfo}>
                            <h1>Title</h1>
                            <ul>
                                <li className={styles.projectCategory}>Category</li>
                                <li className={styles.projectStatus}>Status</li>
                            </ul>
                        </div>
                        <p className={styles.projectDescription}>Description</p>
                        <ul className={styles.projectTags}>
                            <li>Tag</li>
                            <li>Tag</li>
                            <li>Tag</li>
                        </ul>
                    </div>
                    <img src="/project-image.jpg" alt="Project image" className={styles.projectImage} />
                    <div className={styles.projectLinks}>
                        <a href="https://github.com/" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/GitHubLogo.svg" alt="GitHub icon" />
                            <div className={styles.projectLinkText}>
                                <p>View on GitHub <span className={styles.forwardarrowIcon} aria-hidden='true' /></p>
                                <p>Source Code, Documentation & More</p>
                            </div>
                        </a>
                        <a href="https://github.com/" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/book.svg" alt="Documentation icon" />
                            <div className={styles.projectLinkText}>
                                <p>Read the Documentation <span className={styles.forwardarrowIcon} aria-hidden='true' /></p>
                                <p>Technical Informations, Guides, Tutorials & Examples</p>
                            </div>
                        </a>
                        <a href="https://gianlucarainis.com/" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/link.svg" alt="Link icon" />
                            <div className={styles.projectLinkText}>
                                <p>Live demo <span className={styles.forwardarrowIcon} aria-hidden='true' /></p>
                                <p>Try the application</p>
                            </div>
                        </a>
                    </div>
                </header>
                <section className={styles.projectContent}>
                    <aside className={styles.aside}>
                        <nav className={styles.desktopAside} aria-label="Project sections">
                            <Link href="#overview"><img src="/book.svg" alt="" aria-hidden="true" /> Overview</Link>
                            <Link href="#architecture"><img src="/book.svg" alt="" aria-hidden="true" /> Architecture</Link>
                            <Link href="#code"><img src="/book.svg" alt="" aria-hidden="true" /> Code</Link>
                            <Link href="#resources"><img src="/book.svg" alt="" aria-hidden="true" /> Resources</Link>
                            <Link href="#support"><img src="/book.svg" alt="" aria-hidden="true" /> Support</Link>
                        </nav>
                        <details className={styles.asideMenu}>
                            <summary>On this page</summary>
                            <nav aria-label="Project sections">
                                <Link href="#overview"><img src="/book.svg" alt="" aria-hidden="true" /> Overview</Link>
                                <Link href="#architecture"><img src="/book.svg" alt="" aria-hidden="true" /> Architecture</Link>
                                <Link href="#code"><img src="/book.svg" alt="" aria-hidden="true" /> Code</Link>
                                <Link href="#resources"><img src="/book.svg" alt="" aria-hidden="true" /> Resources</Link>
                                <Link href="#support"><img src="/book.svg" alt="" aria-hidden="true" /> Support</Link>
                            </nav>
                        </details>
                    </aside>
                    <article className={styles.projectArticle}>
                        <section id="overview">
                            <h2>Overview</h2>
                        </section>
                        <section id="architecture">
                            <h2>Architecture</h2>
                        </section>
                        <section id="code">
                            <h2>Code</h2>
                        </section>
                        <section id="resources">
                            <h2>Resources</h2>
                        </section>
                        <section id="support">
                            <h2>Support</h2>
                        </section>
                    </article>
                </section>
            </main>

            <Footer />
        </>
    );
}
