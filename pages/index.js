import React from 'react';
import Link from 'next/link';
import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from '@/styles/home.module.css';
import { usePathname } from 'next/navigation';

const featuredProjects = [
    {
        number: '01', title: 'Project One', description: 'Description',
        link: '',
        tags: ['tag1', 'tag2']
    },
    {
        number: '02', title: 'Project Two', description: 'Description',
        link: '',
        tags: ['tag1', 'tag2']
    },
    {
        number: '03', title: 'Project Three', description: 'Description',
        link: '',
        tags: ['tag1', 'tag2']
    },
];

const allProjects = [
    ...featuredProjects,
    {
        number: '04', title: 'Project Four', description: 'Description',
        link: '',
        tags: ['tag1', 'tag2']
    },
    {
        number: '05', title: 'Project Five', description: 'Description',
        link: '',
        tags: ['tag1', 'tag2']
    },
    {
        number: '06', title: 'Project Six', description: 'Description',
        link: '',
        tags: ['tag1', 'tag2']
    },
];

export async function getStaticProps() {
    return {
        props: {
            pageTitle: ""
        }
    };
}

export default function HomePage({ pageTitle }) {
    const path = usePathname();

    return (
        <>
            <Head pageTitle={pageTitle} pageUrl={path} />

            <Nav />

            <header className={styles.header}>
                <h1>Site Currently in Development</h1>
            </header>

            <main className={styles.main}>
                <section className={styles.hero} aria-labelledby='home-title'>
                    <p className={styles.heroLabel}>Selected work / {new Date().getFullYear()}</p>
                    <h1 id='home-title'>
                        <span>Engineering Ideas</span>
                        <span className={styles.heroSecondLine}>into Reality</span>
                    </h1>
                    <div className={styles.heroFooter}>
                        <span>Curiosity, design, and code.</span>
                        <span className={styles.heroIndex}>GR / 01</span>
                    </div>
                </section>

                <section className={styles.projectSection} aria-labelledby='featured-title'>
                    <div className={styles.sectionHeading}>
                        <div>
                            <p className={styles.sectionEyebrow}>A closer look</p>
                            <h2 id='featured-title'>Featured projects</h2>
                        </div>
                        <span className={styles.sectionCount}>01 — {featuredProjects.at(featuredProjects.length-1).number}</span>
                    </div>
                    <div className={styles.projectRail}>
                        {featuredProjects.map((project) => (
                            <article className={styles.project} key={project.number}>
                                <Link href={project.link} className={styles.project} aria-label={project.title}>
                                    <div className={styles.projectImage} role='img' aria-label={`Image of ${project.title}`}>
                                        <span>Image to come</span>
                                        <span className={styles.imageNumber}>{project.number}</span>
                                    </div>
                                    <div className={styles.projectInfo}>
                                        <div className={styles.projectTitleRow}>
                                            <h3>{project.title}</h3>
                                            <span>{project.number}</span>
                                        </div>
                                        <p className={styles.projectDescription}>
                                            {project.description}
                                        </p>
                                        <ul className={styles.tags} aria-label='Project tags'>
                                            {project.tags.map((tag) => (
                                                <li>{tag}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.projectSection} aria-labelledby='all-projects-title'>
                    <div className={styles.sectionHeading}>
                        <div>
                            <p className={styles.sectionEyebrow}>The complete archive</p>
                            <h2 id='all-projects-title'>All projects</h2>
                        </div>
                        <div className={styles.allProjectView}>
                            <Link href='/projects' aria-label='All Projects'>
                                View all Projects <span className={styles.arrowIcon} aria-hidden='true' />
                            </Link>
                            <span className={styles.sectionCount}>01 — {allProjects.at(allProjects.length-1).number}</span>
                        </div>
                    </div>
                    <div className={styles.projectRail}>
                        {allProjects.map((project) => (
                            <article className={styles.project} key={project.number}>
                                <Link href={project.link} className={styles.project} aria-label={project.title}>
                                    <div className={styles.projectImage} role='img' aria-label={`Image of ${project.title}`}>
                                        <span>Image to come</span>
                                        <span className={styles.imageNumber}>{project.number}</span>
                                    </div>
                                    <div className={styles.projectInfo}>
                                        <div className={styles.projectTitleRow}>
                                            <h3>{project.title}</h3>
                                            <span>{project.number}</span>
                                        </div>
                                        <p className={styles.projectDescription}>
                                            {project.description}
                                        </p>
                                        <ul className={styles.tags} aria-label='Project tags'>
                                            {project.tags.map((tag) => (
                                                <li>{tag}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
