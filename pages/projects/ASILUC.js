import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from '@/styles/projects.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MoveLeft, MoveRight } from 'lucide-react';

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
                    <Link href='/projects' className={styles.backLink}><MoveLeft className={styles.backarrowIcon} /> All projects</Link>
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
                                <p>View on GitHub <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Source Code, Documentation & More</p>
                            </div>
                        </a>
                        <a href="https://github.com/gianluca-rainis/ASILUC/blob/main/docs/info.md" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/book.svg" alt="Documentation icon" />
                            <div className={styles.projectLinkText}>
                                <p>Read the Documentation <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Technical Informations, Guides, Tutorials & Examples</p>
                            </div>
                        </a>
                        <a href="https://gds-viewer.tinytapeout.com/?model=https://gianluca-rainis.github.io/ASILUC/tinytapeout.oas&pdk=gf180mcuD" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/link.svg" alt="Link icon" />
                            <div className={styles.projectLinkText}>
                                <p>GDS Viewer <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Look at the ASILUC's 3D model</p>
                            </div>
                        </a>
                        <a href="https://gds-explorer.tinytapeout.com/viewer?file=https://gianluca-rainis.github.io/ASILUC/tinytapeout.oas&pdk=gf180mcuD" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/link.svg" alt="Link icon" />
                            <div className={styles.projectLinkText}>
                                <p>TinyTapeout Simulator <MoveRight className={styles.forwardArrowIcon} /></p>
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
                            <h3>Additional Informations</h3>
                            <p>
                                <strong>Some additional details</strong>:
                            </p>
                            <ul>
                                <li>While the command is <code>NOP</code>, ASILUC stays in the Idle phase.</li>
                                <li>In Idle ASILUC looks for changes on <code>uio_in[3:0]</code>.</li>
                                <li>If the command read in the third cycle is <code>NOP</code> or <code>Reserved</code>, ASILUC returns to Idle without starting any transaction or operation.</li>
                                <li>If an error occurs during execution, <i>busy</i> goes to 0, <i>status</i> goes to 0, <i>highByte</i> to 0, and <i>error</i> to 1. The error code, associated with the type of error that occurred, is set to <code>uo_out[3:0]</code>. It waits <i>3 clock cycles</i> like this and then returns to normal.</li>
                                <li>The <code>SUB</code> result is <code>A - B</code> in <strong>16-bit two’s complement</strong>. High byte is: <code>0x00</code> if <code>A ≥ B</code>; <code>0xFF</code> if <code>A &lt; B</code>. In case the result is a negative number, <code>|A - B| = 256 - low byte</code>.</li>
                            </ul>
                            <p>
                                <strong>For the master</strong>:
                            </p>
                            <ul>
                                <li>Hold the command stable until <code>status</code> rises.</li>
                                <li>Reset the command to <code>0000</code> between operations.</li>
                                <li>Use a timeout to handle the case where <code>status</code> does not rise.</li>
                                <li><strong>Count clocks from the rising edge of <code>status</code></strong>: the first number must be stable in the first <i>3 cycles</i> (sampled last), the second in the next 3.</li>
                                <li>Once <code>status</code> has risen, the command can return to <code>0000</code> at any time, as ASILUC no longer reads it.</li>
                            </ul>
                            <img src="/projects/ASILUCPreview3D.png" alt="ASILUC 3D Render" />
                            <citation>ASILUC 3D Render</citation>

                            <h3>ASILUC's tables</h3>
                            <h4>ASILUC behavior Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sequence</th>
                                        <th>Operation</th>
                                        <th>Duration (clk)</th>
                                        <th>busy</th>
                                        <th>status</th>
                                        <th>highByte</th>
                                        <th>error</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ø</td>
                                        <td>Idle</td>
                                        <td>∞</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>0</td>
                                        <td>Command Reading</td>
                                        <td>0-2</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Command Accepted / Input (first number)</td>
                                        <td>3-5</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Input (second number)</td>
                                        <td>6-8</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Calculating</td>
                                        <td>Variable</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Output (lowest byte)</td>
                                        <td>0-2 (After Calculating)</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Output (highest byte)</td>
                                        <td>3-5 (After Calculating)</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Ø</td>
                                        <td>Error</td>
                                        <td>0-2</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h4>ASILUC status bits Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Operation</th>
                                        <th>busy (<code>uio_out[7]</code>)</th>
                                        <th>status (<code>uio_out[6]</code>)</th>
                                        <th>highByte (<code>uio_out[5]</code>)</th>
                                        <th>error (<code>uio_out[4]</code>)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Idle</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Command Accepted</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Input (first number)</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Input (second number)</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Calculating</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Output (lowest byte)</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Output (highest byte)</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Error</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h4>ASILUC command bits Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Command</td>
                                        <td><code>uio_in[3:0]</code></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>NOP</code></td>
                                        <td><code>0000</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>SUM</code></td>
                                        <td><code>0001</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>SUB</code></td>
                                        <td><code>0010</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>MUL</code></td>
                                        <td><code>0011</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>DIV</code></td>
                                        <td><code>0100</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>Reserved</code> (handled as <code>NOP</code>)</td>
                                        <td><code>0101</code>-<code>1111</code></td>
                                    </tr>
                                </tbody>
                            </table>
                            <h4>ASILUC error codes Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Error</td>
                                        <td><code>uo_out[3:0]</code></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Generic Error</td>
                                        <td><code>0000</code></td>
                                    </tr>
                                    <tr>
                                        <td>Div 0</td>
                                        <td><code>0001</code></td>
                                    </tr>
                                    <tr>
                                        <td>Unused (if one occurs, it is treated as Generic Error)</td>
                                        <td><code>0010</code>-<code>1111</code></td>
                                    </tr>
                                </tbody>
                            </table>
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
