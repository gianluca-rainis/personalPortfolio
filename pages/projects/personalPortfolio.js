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
            pageTitle: "Personal Portfolio"
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
            <Head pageTitle={pageTitle} pageUrl={path} />
            <Nav />

            <main className={styles.projectPage}>
                <header className={styles.projectHeader}>
                    <Link href='/projects' className={styles.backLink}><MoveLeft className={styles.backarrowIcon} /> All projects</Link>
                    <div>
                        <div className={styles.projectHeaderInfo}>
                            <h1>Personal Portfolio</h1>
                            <ul>
                                <li className={styles.projectCategory}>Website</li>
                                <li className={styles.projectStatus}>In Development</li>
                            </ul>
                        </div>
                        <p className={styles.projectDescription}>My personal portfolio, with a high-tech inspired interface.</p>
                        <ul className={styles.projectTags}>
                            <li>personal portfolio</li>
                            <li>website</li>
                            <li>nextjs</li>
                            <li>react</li>
                            <li>high-tech</li>
                        </ul>
                    </div>
                    <img src="/projects/personalPortfolioPreview.png" alt="Project image" className={styles.projectImage} />
                    <div className={styles.projectLinks}>
                        <a href="https://github.com/gianluca-rainis/personalPortfolio" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/GitHubLogo.svg" alt="GitHub icon" />
                            <div className={styles.projectLinkText}>
                                <p>View on GitHub <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Source Code, Documentation & More</p>
                            </div>
                        </a>
                        <a href="https://projects.gianlucarainis.com/" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                            <div className={styles.projectLinkText}>
                                <p>Live demo <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Browse the portfolio</p>
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
                                This portfolio is the place where all my projects live.
                                It's built with Next.js and React, and it has a high-tech inspired interface.
                                It collects the projects I work on in one place, together with the documentation, the researches and the guides that explain how they work.
                            </p>
                            <p>
                                The projects are not just a list of links: every project has its own page, with an overview, the architecture, the most interesting parts of the code and the resources to try it or read more.
                                The documents are written in MDX, so they are rendered directly inside the site, with their own metadata.
                            </p>
                            <img src="/projects/personalPortfolioPreview.png" alt="Personal portfolio home page" />
                            <citation>The home page of the portfolio</citation>
                        </section>
                        <section id="architecture">
                            <h2>Architecture</h2>

                            <h3>Website structure</h3>
                            <p>
                                The portfolio is a Next.js application made of five kinds of pages.
                                Every page shares the same head, navigation bar and footer, which are separate components reused across the site.
                            </p>
                            <ul>
                                <li><strong>Home</strong>: shows the featured projects and all the other projects. It also works as a manifesto for the website.</li>
                                <li><strong>Projects</strong>: shows all the projects, with filters and a search function.</li>
                                <li><strong>Docs</strong>: collects the documentation, the documents, the researches and the guides about the projects.</li>
                                <li><strong>Project Page</strong>: one page for every project, with detailed information, images and technical informations.</li>
                                <li><strong>Document Page</strong>: one page for every document, with integrated MDX rendering and document metadata.</li>
                            </ul>

                            <h3>Projects</h3>
                            <p>
                                The information shown in the project cards is stored in a dedicated data folder, separated from the interface.
                                The home page and the projects page read that same data to build their lists, so a card only has to be written once.
                            </p>
                            <p>
                                Every project also has its own page, written separately from the data, usually with an overview, the architecture, the code and the resources.
                                The projects page lets the visitor narrow the list of cards with filters and a search function, so even a long list stays easy to explore.
                            </p>
                            <img src="/projects/personalPortfolioProjects.png" alt="Personal portfolio projects page" />
                            <citation>The projects page, with filters and search</citation>

                            <h3>Documents</h3>
                            <p>
                                The documents are MDX files stored in a separate folder of the repository.
                                MDX allows writing the content in Markdown and using React components inside it, so a document can be a simple guide or a more complex page.
                            </p>
                            <p>
                                Each document has its own metadata (for example title and description) that is shown with the content and used to list it in the docs page.
                            </p>
                            <img src="/projects/personalPortfolioDocs.png" alt="Personal portfolio docs page" />
                            <citation>The docs page</citation>
                        </section>
                        <section id="code">
                            <h2>Code</h2>
                            <p>
                                The portfolio is developed with Next.js and React, with CSS modules for the styles.
                                The code is split in components, data, documents and internal functions, so each part can be changed without touching the rest.
                                The following sections explore some of the key parts of the implementation.
                            </p>

                            <h3>Project structure</h3>
                            <p>
                                The repository follows the standard Next.js layout, with some extra folders for the content of the portfolio.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`personalPortfolio/
├── components/        # UI pieces of the site
├── data/              # The projects informations
├── docs/              # The documentation to show in the Docs section
├── lib/               # Implementation of internal functions
├── pages/             # Site pages
├── public/            # Images and downloadable files
├── styles/            # Global styles and CSS modules
├── mdx-components.tsx # Component to support the mdx files rendering
└── next.config.mjs    # Next.js Configuration to support the mdx files`}
                                </code>
                            </pre>
                            <p>
                                The content is kept apart from the interface: <code>data</code> and <code>docs</code> hold what is shown, while <code>components</code>, <code>pages</code> and <code>styles</code> decide how it is shown.
                            </p>

                            <h3>Projects data</h3>
                            <p>
                                Every project is described by a single object, which contains everything the cards and the filters need.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`{
    {
        "number": "07",
        "category": "Website",
        "title": "Personal Portfolio",
        "description": "My personal portfolio, with a high-tech inspired interface.",
        "image": "/projects/personalPortfolioPreview.png",
        "imageAlt": "Image of my personal portfolio's home page",
        "tags": ["personal portfolio", "website", "nextjs", "react", "high-tech"],
        "status": "In Development",
        "href": "/projects/personalPortfolio",
        "featured": true
    },
}`}
                                </code>
                            </pre>
                            <p>
                                The <code>featured</code> value decides which projects are shown in the first section of the home page.
                            </p>

                            <h3>Filters and search</h3>
                            <p>
                                The projects page keeps the filters and the search text in its state, and computes the visible list from the full data every time one of them changes.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`const visibleProjects = useMemo(() => {
    const query = searched.trim().toLowerCase();

    const filteredProjects = projects.filter((project) => {
        const matchesTag = selectedTag === 'all' || project.tags.includes(selectedTag);
        
        const searchableText = [
            project.number,
            project.category,
            project.title,
            project.description,
            project.imageAlt,
            project.status,
            ...project.tags
        ].join(' ').toLowerCase();

        return matchesTag && searchableText.includes(query);
    });

    return filteredProjects.sort((first, second) => {
        if (sortOrder === 'title-asc') {
            return first.title.localeCompare(second.title);
        }

        const numberDifference = Number(first.number) - Number(second.number);

        return sortOrder === 'number-asc' ? numberDifference : -numberDifference;
    });
}, [searched, selectedTag, sortOrder]);`}
                                </code>
                            </pre>
                            <p>
                                The original list is never modified, so removing a filter or clearing the search brings back every project.
                            </p>

                            <h3>MDX rendering</h3>
                            <p>
                                The Next.js configuration includes a dedicated file to support MDX, and a components file that tells the site how to render each element of a document.
                                This way all the documents share the same look of the rest of the portfolio.
                            </p>
                        </section>
                        <section id="resources">
                            <h2>Resources</h2>
                            <p>
                                Explore the resources available for the portfolio, including the source code, the documentation and the live version.
                            </p>

                            <h3>Live Website</h3>
                            <p>
                                The portfolio is online and always up to date.
                                Browse the projects, use the filters and open some documents to see how the pages work.
                            </p>
                            <p>
                                <a href="https://projects.gianlucarainis.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Visit projects.gianlucarainis.com <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>

                            <h3>Source Repository</h3>
                            <p>
                                All project files, including the pages, the components, the data and the documents, are publicly available on GitHub under the MIT license.
                            </p>
                            <p>
                                <a href="https://github.com/gianluca-rainis/personalPortfolio" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Visit the GitHub repository <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>
                        </section>
                        <section id="support">
                            <h2>Support</h2>
                            <p>
                                Found a bug, have a question, or want to contribute to my personal portfolio?
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
