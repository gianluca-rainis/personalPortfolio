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
            pageTitle: "FreeIdeas"
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
                name: 'FreeIdeas',
                description: 'FreeIdeas - A place where your Ideas can be Free | FreeIdeas is a site where you can publish your ideas about any type of projects, and where you can find inspiration for your next project.',
                codeRepository: 'https://github.com/gianluca-rainis/FreeIdeas'
            }} />
            <Nav />

            <main className={styles.projectPage}>
                <header className={styles.projectHeader}>
                    <Link href='/projects' className={styles.backLink}><MoveLeft className={styles.backarrowIcon} /> All projects</Link>
                    <div>
                        <div className={styles.projectHeaderInfo}>
                            <h1>FreeIdeas</h1>
                            <ul>
                                <li className={styles.projectCategory}>Website</li>
                                <li className={styles.projectStatus}>Finished</li>
                            </ul>
                        </div>
                        <p className={styles.projectDescription}>FreeIdeas - A place where your Ideas can be Free | FreeIdeas is a site where you can publish your ideas about any type of projects, and where you can find inspiration for your next project.</p>
                        <ul className={styles.projectTags}>
                            <li>freeideas</li>
                            <li>website</li>
                            <li>social network</li>
                            <li>nextjs</li>
                            <li>react</li>
                        </ul>
                    </div>
                    <img src="/projects/FreeIdeasPreview.png" alt="Project image" className={styles.projectImage} />
                    <div className={styles.projectLinks}>
                        <a href="https://github.com/gianluca-rainis/FreeIdeas" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/GitHubLogo.svg" alt="GitHub icon" />
                            <div className={styles.projectLinkText}>
                                <p>View on GitHub <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Source Code, Documentation & More</p>
                            </div>
                        </a>
                        <a href="https://github.com/gianluca-rainis/FreeIdeas/blob/main/TECHNICAL_REPORT.md" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <BookOpenText />
                            <div className={styles.projectLinkText}>
                                <p>Read the Documentation <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Technical Informations, Guides, Tutorials & Examples</p>
                            </div>
                        </a>
                        <a href="https://www.freeideas.pro/" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                            <div className={styles.projectLinkText}>
                                <p>Live demo <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Publish your first idea on FreeIdeas</p>
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
                                FreeIdeas is a website where anyone can publish their ideas about any type of project, and where anyone can find inspiration for the next one.
                                You can search for ideas, publish your own, ask for help on them, or just browse through the ideas of others.
                            </p>
                            <p>
                                The idea behind the project is that <strong>all ideas are equal</strong>, and as such they deserve the same visibility.
                                The goal is to create an international community of creatives who share their ideas and help each other to bring them to life.
                            </p>
                            <img src="/projects/FreeIdeasHome.png" alt="FreeIdeas home page" />
                            <citation>The home page of FreeIdeas</citation>

                            <h3>Philosophy</h3>
                            <p>
                                Every idea published on the site is public, so anyone can read it, give advice and take inspiration from it.
                                To give the same visibility to everybody, the home page highlights the latest 22 published ideas, and the search page sorts the ideas from the newest to the oldest by default.
                            </p>
                            <p>
                                The site is in English on purpose: it allows anyone to take part in the community, regardless of their location, language or culture.
                                The project promotes freedom of expression and digital inclusion, so that creatives can share their ideas without being labeled or judged.
                            </p>

                            <h3>Name, logo and slogan</h3>
                            <p>
                                The name FreeIdeas means "free ideas", and it describes the core concept of the site: a space open to the ideas of everyone.
                                In the logo, the word "Free" is written with different shades of green, which evoke nature, vitality and the responsibility to take care of it.
                                The word "Ideas" is written with a different shade of yellow for each letter, which evokes gold and the value of every single idea, in a font that looks like a careful sketch.
                            </p>
                            <p>
                                The slogan is <i>A place where <strong>your</strong> Ideas can be Free</i>.
                                The word "your" is in bold because the site exists only for its users: without the creatives who publish their ideas, it would have no purpose.
                            </p>
                        </section>
                        <section id="architecture">
                            <h2>Architecture</h2>

                            <h3>Website behavior</h3>
                            <p>
                                FreeIdeas is a full-stack Next.js application.
                                The pages are React components, and the back-end is made of Next.js API routes, one for each operation that the interface needs (for example publishing an idea, saving a comment or following an account).
                                The data is saved in a relational database, and the user session is handled with a cookie.
                            </p>
                            <p>
                                The site is responsive, so it can be used from computers, phones and tablets, and it has a light and a dark color theme.
                                Each idea and each public account has its own unique link, so they can be shared easily.
                            </p>

                            <h4>FreeIdeas main pages Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Page</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Home</td>
                                        <td>Presentation of the site and the latest 22 published ideas</td>
                                    </tr>
                                    <tr>
                                        <td>Search an idea</td>
                                        <td>Search for ideas and public accounts, from the newest to the oldest</td>
                                    </tr>
                                    <tr>
                                        <td>Idea</td>
                                        <td>The page of a single idea, with its information, comments and votes</td>
                                    </tr>
                                    <tr>
                                        <td>Publish an idea</td>
                                        <td>The form to publish a new idea or to update an old one</td>
                                    </tr>
                                    <tr>
                                        <td>Account</td>
                                        <td>The account of the logged user, and the public page of the other accounts</td>
                                    </tr>
                                    <tr>
                                        <td>Login and Create account</td>
                                        <td>Access to the site</td>
                                    </tr>
                                    <tr>
                                        <td>Reserved area</td>
                                        <td>The administration panel of the site</td>
                                    </tr>
                                    <tr>
                                        <td>Information pages</td>
                                        <td>About, FAQ, contacts, feedback, license, privacy policy and terms of use</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3>Ideas</h3>
                            <p>
                                An idea is the heart of the site.
                                To publish one, it is required to write a title and a description, to upload a main image and to choose a license.
                            </p>
                            <p>
                                Every idea can be completed with some optional content: an external link, additional information (each one with its own image, title and description) and logs, which are used by the author to tell how the idea evolves over time.
                                The date of a log is set automatically to the current day.
                            </p>
                            <p>
                                Other users can interact with an idea in many ways: they can vote it, save it, follow it, comment it, and report it if something is wrong.
                                The comments can also be replies to other comments, so they can become small conversations where the community helps the author.
                            </p>
                            <p>
                                The author can also update or delete the idea whenever they want, and see who they are talking to through the username of the other authors, which links to their account if it is public.
                            </p>
                            <img src="/projects/FreeIdeasIdea.png" alt="FreeIdeas idea page" />
                            <citation>The page of an idea</citation>

                            <h3>Licenses</h3>
                            <p>
                                Published ideas are free to use, with the only restrictions that the author decides.
                                When an idea is published, the author chooses between the default license, which is the FreeIdeas License, and a personalized license, loaded as a PDF file.
                            </p>

                            <h3>Accounts</h3>
                            <p>
                                An account can be made public or private.
                                The page of a private account cannot be visited by the other users, while the page of a public account shows its published ideas.
                                The owner can edit the information of their account, change the password through an email and delete the account.
                            </p>
                            <p>
                                Users can follow the ideas and the accounts they like, and they receive a notification when a followed idea or account is edited or deleted.
                                Notifications are also sent for the actions made on the user's own account, such as publishing or deleting an idea or changing the account information.
                            </p>

                            <h3>Reserved area</h3>
                            <p>
                                The reserved area is the administration panel of the site, and it is separated from the normal login.
                                From there the administrator can manage four things: the accounts, the ideas, the notifications and the reports sent by the users.
                            </p>
                            <ul>
                                <li><strong>Accounts</strong>: search, edit and delete them, including the private ones.</li>
                                <li><strong>Ideas</strong>: search, edit and delete them, and delete their comments.</li>
                                <li><strong>Notifications</strong>: search, create and delete them.</li>
                                <li><strong>Reports</strong>: search and delete them.</li>
                            </ul>

                            <h3>Database</h3>
                            <p>
                                The data is organized in a relational database with these tables.
                            </p>
                            <h4>FreeIdeas database Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Table</th>
                                        <th>Content</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>accounts</code></td>
                                        <td>The users, with their information and the public or private status</td>
                                    </tr>
                                    <tr>
                                        <td><code>ideas</code></td>
                                        <td>The published ideas, each one linked to its author</td>
                                    </tr>
                                    <tr>
                                        <td><code>additionalinfo</code></td>
                                        <td>The additional information of an idea (image, title and description)</td>
                                    </tr>
                                    <tr>
                                        <td><code>authorupdates</code></td>
                                        <td>The logs written by the author of an idea</td>
                                    </tr>
                                    <tr>
                                        <td><code>comments</code></td>
                                        <td>The comments of an idea, which can be replies to other comments</td>
                                    </tr>
                                    <tr>
                                        <td><code>idealabels</code></td>
                                        <td>The labels of an idea, and its numbers of saves, likes and dislikes</td>
                                    </tr>
                                    <tr>
                                        <td><code>accountideadata</code></td>
                                        <td>What every account did on every idea: saved, liked or disliked</td>
                                    </tr>
                                    <tr>
                                        <td><code>notifications</code></td>
                                        <td>The notifications of every account, with their read status</td>
                                    </tr>
                                    <tr>
                                        <td><code>reports</code></td>
                                        <td>The reports of ideas and accounts</td>
                                    </tr>
                                    <tr>
                                        <td><code>follow</code></td>
                                        <td>The accounts and the ideas followed by every account</td>
                                    </tr>
                                    <tr>
                                        <td><code>reservedareaaccounts</code></td>
                                        <td>The administrator accounts of the reserved area</td>
                                    </tr>
                                </tbody>
                            </table>
                            <img src="/projects/FreeIdeasER.png" alt="FreeIdeas entity relationship diagram" />
                            <citation>The entity relationship diagram of the database</citation>
                        </section>
                        <section id="code">
                            <h2>Code</h2>
                            <p>
                                FreeIdeas is developed with Next.js and React, and it was born as a PHP and JavaScript website that was then migrated to Next.js.
                                The code is split in components, hooks, API routes and utilities, so each part can be changed without breaking the others.
                                The following sections explore the key parts of the implementation.
                            </p>

                            <h3>Project structure</h3>
                            <p>
                                The repository follows the standard Next.js layout, with some extra folders for the shared logic of the application.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`FreeIdeas/
├── components/     # UI components, with the ones of the reserved area
├── contexts/       # Shared context of the application
├── hooks/          # Custom hooks (auth, modals, notifications, theme...)
├── lib/            # Database connection, session and CORS
├── pages/
│   ├── api/        # API routes, one for every operation
│   ├── account/    # Public page of an account
│   ├── idea/       # Page of an idea
│   └── ...         # The other pages of the site
├── public/         # Images, logos and static files
├── styles/         # Global styles and CSS modules
├── utils/          # API configuration, errors and fetch with timeout
└── proxy.js        # Next.js proxy`}
                                </code>
                            </pre>

                            <h3>API routes</h3>
                            <p>
                                Every operation of the site is a separate API route inside <code>pages/api</code>, with a name that describes what it does, like <code>saveNewIdea</code>, <code>followAccountIdea</code> or <code>deleteComment</code>.
                                The pages never talk directly with the database: they send a request to the right route, and the route checks the session of the user before doing the operation.
                            </p>
                            <p>
                                The libraries used by the routes are the following:
                            </p>
                            <ul>
                                <li><code>bcrypt</code>: for the passwords of the accounts.</li>
                                <li><code>iron-session</code>: for the encrypted session cookie of the logged user.</li>
                                <li><code>formidable</code>: to receive the files uploaded in the forms, like the images and the licenses.</li>
                                <li><code>nodemailer</code>: to send the emails, for example to change the password.</li>
                                <li><code>mysql2</code>: to connect the application to the database.</li>
                            </ul>

                            <h3>Hooks and context</h3>
                            <p>
                                The logic that is needed by many components is moved into custom hooks, so it is written only once.
                            </p>
                            <ul>
                                <li><code>useAuth</code>: the state of the logged user.</li>
                                <li><code>useModals</code>: the opening and closing of the modal windows.</li>
                                <li><code>useNotifications</code>: the notifications of the user.</li>
                                <li><code>usePasswordVisibility</code>: the show and hide button of the password fields.</li>
                                <li><code>useThemeImages</code>: the images that change with the light and dark theme.</li>
                            </ul>
                            <p>
                                The data shared by the whole application lives in a common context, so any component can read it without passing it through every level of the tree.
                            </p>

                            <h3>Database design</h3>
                            <p>
                                The relations between the tables are defined with foreign keys, so the database itself keeps the data consistent.
                                An idea is always linked to the account of its author.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`CREATE TABLE ideas (
    id INT NOT NULL AUTO_INCREMENT,
    authorid INT NOT NULL,
    title TEXT NOT NULL,
    data DATE NOT NULL,
    ideaimage mediumblob,
    description TEXT NOT NULL,
    downloadlink TEXT,
    license mediumblob,
    PRIMARY KEY (id),
    FOREIGN KEY (authorid) REFERENCES accounts(id)
);`}
                                </code>
                            </pre>
                            <p>
                                The same approach is used for the comments, where a comment has a reference to the idea and a reference to another comment.
                                This second reference is what allows the replies.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`CREATE TABLE comments (
    id INT NOT NULL AUTO_INCREMENT,
    authorid INT NULL,
    data DATE NOT NULL,
    description TEXT NOT NULL,
    ideaid INT NOT NULL,
    superCommentid INT,
    PRIMARY KEY (id),
    FOREIGN KEY (authorid) REFERENCES accounts(id),
    FOREIGN KEY (ideaid) REFERENCES ideas(id),
    FOREIGN KEY (superCommentid) REFERENCES comments(id)
);`}
                                </code>
                            </pre>
                            <p>
                                The <code>authorid</code> of a comment can be empty, so a comment can stay on the idea even if the account that wrote it was deleted.
                            </p>
                        </section>
                        <section id="resources">
                            <h2>Resources</h2>
                            <p>
                                Explore the resources available for FreeIdeas, including the live website, the technical documentation and the source code.
                            </p>

                            <h3>Live Website</h3>
                            <p>
                                FreeIdeas is online and open to everyone. Create an account, publish an idea or look for some inspiration.
                            </p>
                            <p>
                                <a href="https://www.freeideas.pro/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Visit freeideas.pro <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>

                            <h3>Documentation</h3>
                            <p>
                                The technical report describes the features, the files, the dependencies, the environment variables and the whole structure of the database, with the entity relationship diagram.
                                The README describes the philosophy and the purpose of the project.
                            </p>
                            <a href="https://github.com/gianluca-rainis/FreeIdeas/blob/main/TECHNICAL_REPORT.md" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                <p style={{ display: 'flex' }}>Read the technical report <MoveRight className={styles.forwardarrowIcon} /></p>
                            </a>
                            <a href="https://github.com/gianluca-rainis/FreeIdeas/blob/main/README.md" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                <p style={{ display: 'flex' }}>Read the project documentation <MoveRight className={styles.forwardarrowIcon} /></p>
                            </a>

                            <h3>Source Repository</h3>
                            <p>
                                All project files, including the pages, the API routes and the components, are publicly available on GitHub.
                            </p>
                            <p>
                                <a href="https://github.com/gianluca-rainis/FreeIdeas" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Visit the GitHub repository <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>

                            <h3>License</h3>
                            <p>
                                FreeIdeas is distributed under the FreeIdeas License, which allows the personal, educational and non-profit use of the code, and requires a written permission for the commercial use.
                                The name FreeIdeas actually refers to two different licenses: one for the source code of the project, and one for the ideas published on the website.
                                Any project that includes code from FreeIdeas, even just a few lines, has to follow the license of the project.
                            </p>

                            <h3>Credits</h3>
                            <p>
                                The whole project was developed by me.
                                AI was used only in the debug phase and as an assistant for the migration from PHP and JavaScript to Next.js and React.
                                It was not used in the design of the site or in its conception.
                            </p>
                        </section>
                        <section id="support">
                            <h2>Support</h2>
                            <p>
                                Found a bug, have a question, or want to contribute to FreeIdeas?
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
