import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from '@/styles/home.module.css';
import { usePathname } from 'next/navigation';
import projects from '@/data/projects.json';

const featuredProjects = projects.filter((project) => project.featured);

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
                        <span className={styles.sectionCount}>01 — {featuredProjects.at(-1)?.number ?? '00'}</span>
                    </div>
                    <div className={styles.projectRail}>
                        {featuredProjects.reverse().map((project) => (
                            <article className={styles.project} key={project.number}>
                                <Link href={project.href} className={styles.project} aria-label={project.title}>
                                    <div className={`${styles.projectImage} ${(project.image && project.image !== "") ? styles.projectImageWithImage : ""}`} role='img' aria-label={`Image of ${project.title}`} 
                                        style={(project.image && project.image != "") ? {background: "linear-gradient(135deg, rgba(32, 255, 68, 0.07), rgba(255, 255, 255, 0.025))"} : {}}>
                                        { (project.image && project.image != "") ? 
                                            <Image src={project.image} alt={project.imageAlt} fill className={styles.image} />
                                            :
                                            <>
                                                <span>Image to come</span>
                                                <span className={styles.imageNumber}>{project.number}</span>
                                            </>
                                        }
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
                                                <li key={tag}>{tag}</li>
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
                            <span className={styles.sectionCount}>01 — {projects.at(-1)?.number ?? '00'}</span>
                        </div>
                    </div>
                    <div className={styles.projectRail}>
                        {projects.reverse().map((project) => (
                            <article className={styles.project} key={project.number}>
                                <Link href={project.href} className={styles.project} aria-label={project.title}>
                                    <div className={`${styles.projectImage} ${(project.image && project.image !== "") ? styles.projectImageWithImage : ""}`} role='img' aria-label={`Image of ${project.title}`} 
                                        style={(project.image && project.image != "") ? {background: "linear-gradient(135deg, rgba(32, 255, 68, 0.07), rgba(255, 255, 255, 0.025))"} : {}}>
                                        { (project.image && project.image != "") ? 
                                            <Image src={project.image} alt={project.imageAlt} fill className={styles.image} />
                                            :
                                            <>
                                                <span>Image to come</span>
                                                <span className={styles.imageNumber}>{project.number}</span>
                                            </>
                                        }
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
                                                <li key={tag}>{tag}</li>
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
