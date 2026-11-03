import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from '@/styles/projects.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export async function getStaticProps() {
    return {
        props: {
            pageTitle: "ASILUC"
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
                            <h1>ASILUC</h1>
                            <ul>
                                <li className={styles.projectCategory}>ASIC</li>
                                <li className={styles.projectStatus}>In Development</li>
                            </ul>
                        </div>
                        <p className={styles.projectDescription}>An ASIC designed to function as an ALU.</p>
                        <ul className={styles.projectTags}>
                            <li>ALU</li>
                            <li>ASIC</li>
                            <li>hardware</li>
                        </ul>
                    </div>
                    <img src="/projects/ASILUCPreview.png" alt="Project image" className={styles.projectImage} />
                    <div className={styles.projectLinks}>
                        <a href="https://github.com/gianluca-rainis/ASILUC" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/GitHubLogo.svg" alt="GitHub icon" />
                            <div className={styles.projectLinkText}>
                                <p>View on GitHub <span className={styles.forwardarrowIcon} aria-hidden='true' /></p>
                                <p>Source Code, Documentation & More</p>
                            </div>
                        </a>
                        <a href="https://github.com/gianluca-rainis/ASILUC/blob/main/docs/info.md" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/book.svg" alt="Documentation icon" />
                            <div className={styles.projectLinkText}>
                                <p>Read the Documentation <span className={styles.forwardarrowIcon} aria-hidden='true' /></p>
                                <p>Technical Informations, Guides, Tutorials & Examples</p>
                            </div>
                        </a>
                        <a href="https://gds-viewer.tinytapeout.com/?model=https://gianluca-rainis.github.io/ASILUC/tinytapeout.oas&pdk=gf180mcuD" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/link.svg" alt="Link icon" />
                            <div className={styles.projectLinkText}>
                                <p>GDS Viewer <span className={styles.forwardarrowIcon} aria-hidden='true' /></p>
                                <p>Look at the ASILUC's 3D model</p>
                            </div>
                        </a>
                        <a href="https://gds-explorer.tinytapeout.com/viewer?file=https://gianluca-rainis.github.io/ASILUC/tinytapeout.oas&pdk=gf180mcuD" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/link.svg" alt="Link icon" />
                            <div className={styles.projectLinkText}>
                                <p>TinyTapeout Simulator <span className={styles.forwardarrowIcon} aria-hidden='true' /></p>
                                <p>Try ASILUC in the TinyTapeout Simulator</p>
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
                            <p>
                                ASILUC is a custom designed ASIC (Application Specific Integrated Circuit) that works as a simple ALU.
                                ASILUC currently supports the sum, the subtraction, the moltiplication and the division of two 8-bit numbers.
                                The result is given as a 16-bit number to support even big numbers operations.
                            </p>
                        </section>
                        <section id="architecture">
                            <h2>Architecture</h2>
                            <h3>ASILUC behavior</h3>
                            <p>
                                ASILUC's default behavior is <code>NOP</code>. In this status, all inputs (<code>ui_in</code>) are ignored.
                            </p>
                            <p>
                                When <code>uio_in</code> strictly changes from <code>NOP</code> to one of the operations, ASILUC starts the command reading: it waits <strong>three clock cycles</strong> to read the command associated with the operation to be executed, so the signal has time to stabilize, preventing errors.
                                Once ASILUC reads the command, it reads the first 8-bit number from <code>ui_in</code> for <strong>3 cycles</strong> (the value saved is the one on the third cycle), and then, it reads the second 8-bit number for <strong>3 cycles</strong>.
                            </p>
                            <p>
                                <code>uio_in</code> ignores any unexpected command changes: the command read on the third cycle after the change from <code>NOP</code> is the one executed.
                                If the command returns to <code>NOP</code> before the third cycle, the reading is aborted.
                            </p>
                            <p>
                                Meanwhile, <code>uio_out</code> uses the 4 bits to signal the status of ASILUC:
                            </p>
                            <ul>
                                <li><code>uio_out[7]</code>: <i>busy</i> - 1 if ASILUC is executing operations or if ASILUC put a result byte on <code>uo_out</code>.</li>
                                <li><code>uio_out[6]</code>: <i>status</i> - 1 if ASILUC put a result byte on <code>uo_out</code>, if ASILUC is reading a number on <code>ui_in</code>, or if the given command has been accepted.</li>
                                <li><code>uio_out[5]</code>: <i>highByte</i> - indicates whether the byte on <code>uo_out</code> is the high byte (2nd byte of out) or the low byte (1st byte of out), or indicates whether the read number on <code>ui_in</code> is the second or the first.</li>
                                <li><code>uio_out[4]</code>: <i>error</i> - 1 if an error occurred.</li>
                            </ul>
                            <p>
                                ASILUC processes the operation in the time it needs, maintaining <i>busy</i> at 1.
                                Once ASILUC finishes processing the operation, it sets <i>status</i> to 1 and puts the low byte of the result on <code>uo_out</code> (which, until this point, has always been <code>0x00</code>) (<i>highByte</i> at 0) (keeps the low byte stable for <strong>3 cycles</strong>), and then the high byte of the result (<i>highByte</i> at 1) (keeps it stable for <strong>3 cycles</strong>).
                            </p>
                            <p>
                                Afterwards, it returns with <i>busy</i> at 0, <i>status</i> at 0, <i>highByte</i> at 0, <i>error</i> at 0, and <code>uo_out</code> at <code>0x00</code>.
                            </p>
                            <p>
                                The process restarts, listening to <code>uio_in</code> again.
                            </p>
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
