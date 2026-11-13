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
            pageTitle: "Personal Website"
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
                name: 'Personal Website',
                description: 'My personal website, built with Next.js and React with a terminal-inspired theme.',
                codeRepository: 'https://github.com/gianluca-rainis/personalWebsite'
            }} />
            <Nav />

            <main className={styles.projectPage}>
                <header className={styles.projectHeader}>
                    <Link href='/projects' className={styles.backLink}><MoveLeft className={styles.backarrowIcon} /> All projects</Link>
                    <div>
                        <div className={styles.projectHeaderInfo}>
                            <h1>Personal Website</h1>
                            <ul>
                                <li className={styles.projectCategory}>Website</li>
                                <li className={styles.projectStatus}>Finished</li>
                            </ul>
                        </div>
                        <p className={styles.projectDescription}>My personal website and portfolio, with a terminal and OS-inspired interface.</p>
                        <ul className={styles.projectTags}>
                            <li>personal website</li>
                            <li>website</li>
                            <li>nextjs</li>
                            <li>react</li>
                            <li>terminal</li>
                        </ul>
                    </div>
                    <img src="/projects/personalWebsitePreview.png" alt="Project image" className={styles.projectImage} />
                    <div className={styles.projectLinks}>
                        <a href="https://github.com/gianluca-rainis/personalWebsite" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/GitHubLogo.svg" alt="GitHub icon" />
                            <div className={styles.projectLinkText}>
                                <p>View on GitHub <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Source Code, Documentation & More</p>
                            </div>
                        </a>
                        <a href="https://www.gianlucarainis.com/" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                            <div className={styles.projectLinkText}>
                                <p>Live demo <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>You are already here, but there is more to explore</p>
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
                                This website is my personal portfolio, built with Next.js and React.
                                The home page is the heart of the site: instead of a classic landing page, it is a small desktop where all the information about me lives inside terminals.
                            </p>
                            <p>
                                Every terminal is a working CLI that emulates a simple operating system shell. You can type custom commands to learn who I am, see my projects and explore what I do.
                                The rest of the site follows the same idea, with a navigation bar that looks like the top bar of an OS and a few small utilities that make the experience feel more like a real machine.
                            </p>
                            <p>
                                Besides the home page, the site has a page where you can view and download an updated copy of my CV (in English and in Italian), a contact page to send me a message directly, and a search page.
                            </p>
                            <img src="/projects/personalWebsitePreview.png" alt="Personal website home page" />
                            <citation>The home page of the website</citation>
                        </section>
                        <section id="architecture">
                            <h2>Architecture</h2>

                            <h3>Website behavior</h3>
                            <p>
                                The site is a Next.js application. Each page is a React component, and the shared parts of the interface (head, navigation bar, footer and terminals) are separate components reused across the pages.
                            </p>
                            <p>
                                The home page is the only page with a custom behavior: it shows one or more terminals that react to what the visitor types.
                                Every other page is a regular page that keeps the same look of the navigation bar, so moving around the site never breaks the OS feeling.
                            </p>

                            <h3>Terminals</h3>
                            <p>
                                Each terminal has its own state and its own history, so more than one can be open at the same time without interfering with the others.
                                The size of a terminal is dynamic: it grows with its content and adapts to the size of the screen.
                            </p>
                            <p>
                                To get closer to a real desktop environment, every terminal can be:
                            </p>
                            <ul>
                                <li><strong>opened in fullscreen</strong>, to focus on a single terminal.</li>
                                <li><strong>hidden</strong>, to get it out of the way without losing its content.</li>
                                <li><strong>closed</strong>, to remove it completely.</li>
                            </ul>

                            <h3>The Commands</h3>
                            <p>
                                The Commands works like in a normal shell: a name, followed by optional flags.
                                The terminal reads the line, finds the matching command and prints the result.
                            </p>
                            <h4>Terminal commands Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Command</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>help</code></td>
                                        <td>Lists the available commands</td>
                                    </tr>
                                    <tr>
                                        <td><code>clear</code></td>
                                        <td>Clears the terminal output</td>
                                    </tr>
                                    <tr>
                                        <td><code>info</code></td>
                                        <td>Shows the main profile overview</td>
                                    </tr>
                                    <tr>
                                        <td><code>info --personal</code></td>
                                        <td>Shows personal details</td>
                                    </tr>
                                    <tr>
                                        <td><code>info --contact</code></td>
                                        <td>Shows contact links</td>
                                    </tr>
                                    <tr>
                                        <td><code>info --education</code></td>
                                        <td>Shows education history</td>
                                    </tr>
                                    <tr>
                                        <td><code>info --work</code></td>
                                        <td>Shows work experience</td>
                                    </tr>
                                    <tr>
                                        <td><code>info --certifications</code></td>
                                        <td>Shows certifications</td>
                                    </tr>
                                    <tr>
                                        <td><code>info --hobbies</code></td>
                                        <td>Shows hobbies and interests</td>
                                    </tr>
                                    <tr>
                                        <td><code>keyboard --language</code></td>
                                        <td>Shows language skills</td>
                                    </tr>
                                    <tr>
                                        <td><code>image --ascii</code></td>
                                        <td>Shows a decorative ASCII image</td>
                                    </tr>
                                    <tr>
                                        <td><code>image --profile --ascii</code></td>
                                        <td>Shows the profile ASCII image</td>
                                    </tr>
                                    <tr>
                                        <td><code>presentation --about</code></td>
                                        <td>Shows the about me summary</td>
                                    </tr>
                                    <tr>
                                        <td><code>skills --table</code></td>
                                        <td>Shows technical skills</td>
                                    </tr>
                                    <tr>
                                        <td><code>ls projects/</code></td>
                                        <td>Lists some projects</td>
                                    </tr>
                                    <tr>
                                        <td><code>project [name]</code></td>
                                        <td>Shows details about a project</td>
                                    </tr>
                                    <tr>
                                        <td><code>cat hackclub.txt</code></td>
                                        <td>Shows the Hack Club note</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3>Navigation bar</h3>
                            <p>
                                The navigation bar is split in two parts.
                                On the left there are the links to my GitHub profile, my LinkedIn profile, the CV page and the contact page.
                            </p>
                            <p>
                                On the top right there is a set of small system utilities, which exist only to make the website feel like an OS:
                            </p>
                            <ul>
                                <li><strong>Calendar</strong>: a simple calendar.</li>
                                <li><strong>Search</strong>: a simple search through the content of the site.</li>
                                <li><strong>WiFi manager</strong>: an emulated WiFi manager.</li>
                                <li><strong>Theme manager</strong>: changes the colors of the home page.</li>
                                <li><strong>Battery</strong>: a battery emulator, with even a Power Save mode.</li>
                            </ul>
                            <img src="/projects/personalWebsiteThemes.png" alt="Personal website color themes" />
                            <citation>The home page in some of the available color themes</citation>

                            <h3>Other pages</h3>
                            <p>
                                The <strong>CV page</strong> shows an updated copy of my Curriculum Vitae, in both English and Italian, and lets you download it.
                                The <strong>contact page</strong> sends a message straight to my inbox, without leaving the site.
                                The <strong>search page</strong> shows the results of the search started from the navigation bar.
                            </p>
                        </section>
                        <section id="code">
                            <h2>Code</h2>
                            <p>
                                The website is developed with Next.js and React, with CSS modules for the styles.
                                The code is split in components, pages and styles, so each part of the interface can be changed without touching the rest.
                                The following sections explore some of the key parts of the implementation.
                            </p>

                            <h3>Project structure</h3>
                            <p>
                                The repository follows the standard Next.js layout, where every folder has a single job.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`personalWebsite/
├── components/    # UI pieces of the site
├── pages/         # Site pages and API routes
├── public/        # Images and downloadable files
└── styles/        # Global styles and CSS modules`}
                                </code>
                            </pre>
                            <p>
                                Pages and API routes live together in <code>pages</code>, so the contact form and the endpoint that receives its messages are part of the same project.
                            </p>

                            <h3>Terminal</h3>
                            <p>
                                The terminal is the most important component of the site.
                                It keeps the history of the lines already executed and decides what to print when a new command is submitted.
                            </p>

                            <h4>Command handling</h4>
                            <p>
                                Every command is registered in a single object, so adding a new one only means adding a new entry.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`function runCommand(commandText) {
    const result = executeCommand(commandText, { accentBrightHex });

    if (result.action === 'clear') {
        setSessions([]);
        return;
    }

    if (result.action === 'redirect' && getCurrentPath(router.asPath) !== result.href) {
        router.push(result.href);
        return;
    }

    setSessions((prev) => [...prev, result]);
}`}
                                </code>
                            </pre>
                            <p>
                                The line is split into a command name and its flags.
                                If the name is not in the registry, the terminal prints an error, like a real shell would do.
                            </p>

                            <h4>Window state</h4>
                            <p>
                                Each terminal is a small window, so its status is stored with a state that says if it is open, hidden or in fullscreen.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`const [isFocused, setIsFocused] = useState(false);
const [windowState, setWindowState] = useState('normal');
const [terminalHeight, setTerminalHeight] = useState(null);
const isMinimized = windowState === 'minimized';
const isMaximized = windowState === 'maximized';
const isClosed = windowState === 'closed';`}
                                </code>
                            </pre>
                            <p>
                                The component reads this state to decide its size and if it has to be rendered, so the three window buttons only need to change one value.
                            </p>

                            <h3>Contact form</h3>
                            <p>
                                The contact page sends the message to an API route of the same project.
                                The form works like the one at the end of this page: the data is sent with a <code>POST</code> request, and the interface shows the result of the operation.
                            </p>
                        </section>
                        <section id="resources">
                            <h2>Resources</h2>
                            <p>
                                Explore the resources available for the website, including source code, documentation and the live version.
                            </p>

                            <h3>Live Website</h3>
                            <p>
                                The website is online and always up to date. Open a terminal, try some commands and change the theme to see how the home page reacts.
                            </p>
                            <p>
                                <a href="https://gianlucarainis.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Visit gianlucarainis.com <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>

                            <h3>Source Repository</h3>
                            <p>
                                All project files, including the pages, the components and the styles, are publicly available on GitHub under the MIT license.
                            </p>
                            <p>
                                <a href="https://github.com/gianluca-rainis/personalWebsite" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Visit the GitHub repository <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>
                        </section>
                        <section id="support">
                            <h2>Support</h2>
                            <p>
                                Found a bug, have a question, or want to contribute to my personal website?
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
