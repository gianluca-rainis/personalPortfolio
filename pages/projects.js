import React from 'react';
import { useMemo, useState } from 'react';
import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import styles from '@/styles/projects.module.css';
import { usePathname } from 'next/navigation';
import projects from '@/data/projects.json';

export async function getStaticProps() {
    return {
        props: {
            pageTitle: "Projects"
        }
    };
}

export default function Projects({ pageTitle }) {
    const path = usePathname();
    const [selectedTag, setSelectedTag] = useState('all');
    const [sortOrder, setSortOrder] = useState('number-desc');
    const tags = [...new Set(projects.flatMap((project) => project.tags))].sort();

    const visibleProjects = useMemo(() => {
        const filteredProjects = selectedTag === 'all' ? [...projects] : projects.filter((project) => project.tags.includes(selectedTag));

        return filteredProjects.sort((first, second) => {
            if (sortOrder === 'title-asc') {
                return first.title.localeCompare(second.title);
            }

            const numberDifference = Number(first.number) - Number(second.number);

            return sortOrder === 'number-asc' ? numberDifference : -numberDifference;
        });
    }, [selectedTag, sortOrder]);
    
    return (
        <>
            <Head pageTitle={pageTitle} pageUrl={path} />
            
            <Nav />

            <main className={styles.projects}>
                <header className={styles.compactHeader}>
                    <div className={styles.headerTitle}>
                        <p className={styles.pageEyebrow}>01 / Selected work</p>
                        <h1>Projects</h1>
                    </div>
                    <span className={styles.projectTotal}>{String(projects.length).padStart(2, '0')} projects</span>
                </header>

                <section className={styles.archive} aria-label='Project archive'>
                    <div className={styles.toolbar}>
                        <label className={styles.searchField}>
                            <span aria-hidden='true' className={styles.searchIcon} />
                            <span className={styles.visuallyHidden}>Search projects by keyword</span>
                            <input type='search' placeholder='Search projects' disabled />
                        </label>

                        <label className={styles.selectControl}>
                            <span>Tag</span>
                            <select value={selectedTag} onChange={(event) => setSelectedTag(event.target.value)}>
                                <option value='all'>All tags</option>
                                {tags.map((tag) => 
                                    <option value={tag} key={tag}>{tag}</option>
                                )}
                            </select>
                        </label>

                        <label className={styles.selectControl}>
                            <span>Sort</span>
                            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                                <option value='number-desc'>Newest</option>
                                <option value='number-asc'>Oldest</option>
                                <option value='title-asc'>A to Z</option>
                            </select>
                        </label>
                    </div>

                    <div className={styles.resultsLine} aria-live='polite'>
                        <span>Archive</span>
                        <span>{String(visibleProjects.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                    </div>

                    {visibleProjects.length > 0 ? (
                        <div className={styles.projectGrid}>
                            {visibleProjects.map((project) => 
                                <ProjectCard project={project} key={project.number} />
                            )}
                        </div>
                    ) : (
                        <p className={styles.emptyState}>No projects match this tag.</p>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}
