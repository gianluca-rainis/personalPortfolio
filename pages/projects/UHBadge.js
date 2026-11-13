import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from '@/styles/projects.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MoveLeft, MoveRight, BookOpenText, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export async function getStaticProps() {
    return {
        props: {
            pageTitle: "UHBadge"
        }
    };
}

export default function ProjectPage({ pageTitle }) {
    const path = usePathname();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState('');

    async function handleSupportSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setFormStatus('');

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senderName: formData.get('senderName'),
                    replyEmail: formData.get('replyEmail'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Unable to send your message.');
            }

            form.reset();
            setFormStatus('Your support message has been sent. Thank you!');
        } catch (error) {
            setFormStatus(error.message || 'Unable to send your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Head pageTitle={pageTitle} pageUrl={path} projectData={{
                name: 'UHBadge',
                description: 'Universal Hacker Badge - The ultimate badge for hackers. It\'s a PCB badge with an RP2350, an e-Ink display, NFC, microSD, WiFi, Bluetooth, and more!',
                codeRepository: 'https://github.com/gianluca-rainis/UHBadge'
            }} />
            <Nav />

            <main className={styles.projectPage}>
                <header className={styles.projectHeader}>
                    <Link href='/projects' className={styles.backLink}><MoveLeft className={styles.backarrowIcon} /> All projects</Link>
                    <div>
                        <div className={styles.projectHeaderInfo}>
                            <h1>UHBadge</h1>
                            <ul>
                                <li className={styles.projectCategory}>PCB</li>
                                <li className={styles.projectStatus}>In Development</li>
                            </ul>
                        </div>
                        <p className={styles.projectDescription}>Universal Hacker Badge - The ultimate badge for hackers. It's a PCB badge with an RP2350, an e-Ink display, NFC, microSD, WiFi, Bluetooth, and more!</p>
                        <ul className={styles.projectTags}>
                            <li>PCB</li>
                            <li>hardware</li>
                            <li>badge</li>
                            <li>hacker tools</li>
                        </ul>
                    </div>
                    <img src="/projects/UHBadgePreview.png" alt="Project image" className={styles.projectImage} />
                    <div className={styles.projectLinks}>
                        <a href="https://github.com/gianluca-rainis/UHBadge" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/GitHubLogo.svg" alt="GitHub icon" />
                            <div className={styles.projectLinkText}>
                                <p>View on GitHub <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Source Code, Documentation & More</p>
                            </div>
                        </a>
                        <a href="https://kicanvas.org/?repo=https://github.com/gianluca-rainis/UHBadge/blob/main/PCB" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                            <div className={styles.projectLinkText}>
                                <p>Online PCB Viewer <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>View the printed circuit board design</p>
                            </div>
                        </a>
                    </div>
                </header>
                <section className={styles.projectContent}>
                    <aside className={styles.aside}>
                        <nav className={styles.desktopAside} aria-label="Project sections">
                            <Link href="#overview"><BookOpenText /> Overview</Link>
                            <Link href="#architecture"><BookOpenText /> Architecture</Link>
                            <Link href="#code"><BookOpenText /> Code</Link>
                            <Link href="#resources"><BookOpenText /> Resources</Link>
                            <Link href="#support"><BookOpenText /> Support</Link>
                        </nav>
                        <details className={styles.asideMenu}>
                            <summary>On this page</summary>
                            <nav aria-label="Project sections">
                                <Link href="#overview"><BookOpenText /> Overview</Link>
                                <Link href="#architecture"><BookOpenText /> Architecture</Link>
                                <Link href="#code"><BookOpenText /> Code</Link>
                                <Link href="#resources"><BookOpenText /> Resources</Link>
                                <Link href="#support"><BookOpenText /> Support</Link>
                            </nav>
                        </details>
                    </aside>
                    <article className={styles.projectArticle}>
                        <section id="overview">
                            <h2>Overview</h2>
                            <p>
                                UHBadge (Universal Hacker Badge) is a PCB badge designed for hackers.
                                It is a board that you can wear, with a vertical e-Ink display, and that is meant to do much more than showing a name: it can share your contacts with NFC, connect to WiFi and Bluetooth and run custom programs loaded from a microSD card.
                            </p>
                            <p>
                                The badge is built around an RP2350 microcontroller, the same family of the Raspberry Pi Pico 2, and it is powered by a rechargeable battery that can be charged through the USB-C port.
                                Everything, from the schematic to the firmware, is open source.
                            </p>
                            <p>
                                The project is currently in development, and the first version of the board is in the final steps of its design.
                            </p>
                            <img src="/projects/UHBadge3DFront.png" alt="UHBadge 3D render, front" />
                            <citation>UHBadge 3D Render, front</citation>
                        </section>
                        <section id="architecture">
                            <h2>Architecture</h2>

                            <h3>Hardware</h3>
                            <p>
                                The board is organized around the RP2350, which controls all the other components.
                                The e-Ink display is mounted vertically: the long side of the display is 296 pixels and the short side is 128 pixels.
                            </p>
                            <p>
                                The e-Ink technology was chosen for a simple reason: the image stays on the screen without consuming power, so the badge shows its information for a long time on a single charge.
                            </p>

                            <h4>UHBadge main components Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Component</th>
                                        <th>Function</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>RP2350</td>
                                        <td>Main microcontroller</td>
                                    </tr>
                                    <tr>
                                        <td>2.9" e-Ink display</td>
                                        <td>Shows the badge and the interface (296x128 pixels, vertical)</td>
                                    </tr>
                                    <tr>
                                        <td>microSD slot</td>
                                        <td>Stores the information of the badge and the custom programs</td>
                                    </tr>
                                    <tr>
                                        <td>4 buttons</td>
                                        <td>Up, down, left and right, to navigate the interface</td>
                                    </tr>
                                    <tr>
                                        <td>NFC</td>
                                        <td>Shares custom strings and links</td>
                                    </tr>
                                    <tr>
                                        <td>Pi Radio Module 2</td>
                                        <td>WiFi and Bluetooth connectivity</td>
                                    </tr>
                                    <tr>
                                        <td>Battery and charger</td>
                                        <td>Power supply of the badge, with rechargeable battery</td>
                                    </tr>
                                    <tr>
                                        <td>USB-C</td>
                                        <td>Charging, power and firmware update</td>
                                    </tr>
                                    <tr>
                                        <td>Expansion pins</td>
                                        <td>Connection of additional hardware</td>
                                    </tr>
                                </tbody>
                            </table>
                            <img src="/projects/UHBadgeSchematics.png" alt="UHBadge schematic" />
                            <citation>UHBadge schematic</citation>

                            <h3>Interface</h3>
                            <p>
                                When the badge starts, it shows the logo and then the main interface.
                                The four buttons move the user between the screens, and the central screen is the starting point from which all the others can be reached.
                            </p>

                            <h4>UHBadge screens Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Direction</th>
                                        <th>Screen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Center</td>
                                        <td>The standard badge, with the information saved on the microSD</td>
                                    </tr>
                                    <tr>
                                        <td>Down</td>
                                        <td>Contact information (NFC sends a custom link)</td>
                                    </tr>
                                    <tr>
                                        <td>Up</td>
                                        <td>WiFi and Bluetooth connection, and other settings</td>
                                    </tr>
                                    <tr>
                                        <td>Right</td>
                                        <td>GitHub badge, with name, username, repositories and statistics</td>
                                    </tr>
                                    <tr>
                                        <td>Right, then Down</td>
                                        <td>Contribution graph and GitHub statistics</td>
                                    </tr>
                                    <tr>
                                        <td>Right, then Up</td>
                                        <td>Custom trophies</td>
                                    </tr>
                                    <tr>
                                        <td>Left</td>
                                        <td>Menu with icons (Bluetooth, WiFi, NFC, custom tools, settings and more)</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>
                                The GitHub badge gets its data from the GitHub API.
                                The menu on the left is a grid of icons with two columns and four rows, which can be scrolled vertically.
                                It also includes the third-party tools read from the microSD card, so anyone can add a new tool to the badge without touching the firmware.
                                To go back to the main screen, it is enough to go all the way to the right.
                            </p>

                            <h3>Features</h3>
                            <ul>
                                <li><strong>NFC</strong>: transmits custom strings and URLs.</li>
                                <li><strong>WiFi and Bluetooth</strong>: wireless connection of the badge.</li>
                                <li><strong>Custom programs</strong>: they can be loaded from the microSD card.</li>
                                <li><strong>USB-C</strong>: used to charge the battery, to power the badge and to load a custom firmware.</li>
                            </ul>
                            <img src="/projects/UHBadgePCB.png" alt="UHBadge PCB" />
                            <citation>UHBadge PCB layout</citation>
                        </section>
                        <section id="code">
                            <h2>Code</h2>
                            <p>
                                UHBadge has two parts: the hardware design, made with KiCad, and the firmware, written in C with the Pico SDK.
                                The following sections explore how they are organized.
                            </p>

                            <h3>Hardware design</h3>
                            <p>
                                The schematic and the PCB are designed in KiCad.
                                Some components are not available in the default KiCad libraries, so the project uses a custom footprint library for them.
                                The Gerber files needed for the production of the board are included in the repository.
                            </p>

                            <h3>Firmware</h3>
                            <p>
                                The firmware is written for the RP2350 using version 2.x of the Pico SDK, and it is built with CMake.
                                It contains the drivers of the components of the badge and the logic of the interface.
                            </p>

                            <h4>Build the firmware</h4>
                            <p>
                                From the directory of the repository, the following commands build the firmware.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`cd firmware/build

cmake ..
make -j$(sysctl -n hw.ncpu)`}
                                </code>
                            </pre>
                            <p>
                                At the end of the build, the <code>UHBadge.uf2</code> file is in the <code>firmware/build</code> directory.
                                To install it, put the badge in bootloader mode and copy the file on the drive that appears on the computer, as with any other RP2350 board.
                            </p>
                            <p>
                                If you just want to reinstall the original firmware, you can download the latest release from the GitHub repository from <code>/production</code> and copy the <code>UHBadge.uf2</code> file on the badge.
                            </p>
                        </section>
                        <section id="resources">
                            <h2>Resources</h2>
                            <p>
                                Explore the resources available for UHBadge, including the design files, the firmware and the documentation.
                            </p>

                            <h3>3D Render</h3>
                            <p>
                                This is how the board looks like from the back.
                            </p>
                            <img src="/projects/UHBadge3DBack.png" alt="UHBadge 3D render, back" />
                            <citation>UHBadge 3D Render, back</citation>

                            <h3>Source Repository</h3>
                            <p>
                                All project files, including the KiCad project, the Gerber files and the firmware, are publicly available on GitHub.
                            </p>
                            <p>
                                <a href="https://github.com/gianluca-rainis/UHBadge" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Visit the GitHub repository <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>

                            <h3>License</h3>
                            <p>
                                The hardware design files (schematics, PCB and BOM) are licensed under the CERN-OHL-S v2.0 license.
                                The software, the firmware and the documentation are licensed under the MIT License.
                            </p>

                            <h3>Credits</h3>
                            <p>
                                The whole project is made by me.
                                No AI was used in the conception, design or engineering of the hardware: every circuit and every design decision is my own work.
                                AI was used only as a writing assistant for some parts of the firmware, to help with technical drivers and low-level functions, and everything was reviewed, verified and edited by me.
                            </p>
                        </section>
                        <section id="support">
                            <h2>Support</h2>
                            <p>
                                Found a bug, have a question, or want to contribute to UHBadge?
                                Send me a message and I will get back to you.
                            </p>
                            <form className={styles.supportForm} onSubmit={handleSupportSubmit}>
                                <label>
                                    Name <span>(optional)</span>
                                    <input type="text" name="senderName" autoComplete="name" maxLength="100" />
                                </label>
                                <label>
                                    Reply email <span>(optional)</span>
                                    <input type="email" name="replyEmail" autoComplete="email" maxLength="254" />
                                </label>
                                <label>
                                    Subject
                                    <input type="text" name="subject" required maxLength="500" />
                                </label>
                                <label>
                                    Message
                                    <textarea name="message" required rows="7" maxLength="10000" />
                                </label>
                                <button className={styles.supportSubmit} type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send message'}
                                </button>
                                {formStatus && (
                                    <p className={styles.supportStatus} role="status" aria-live="polite">
                                        {formStatus}
                                    </p>
                                )}
                            </form>
                        </section>
                    </article>
                </section>
            </main>

            <Footer />
        </>
    );
}
