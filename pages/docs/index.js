import React from 'react';
import { useMemo, useState } from 'react';
import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from '@/styles/docs.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAllDocs } from '@/lib/docs';

export async function getStaticProps() {
    return {
        props: {
            pageTitle: 'Docs',
            docs: await getAllDocs()
        }
    };
}

export default function Docs({ pageTitle, docs }) {
    const path = usePathname();
    const [searched, setSearched] = useState('');
    const [selectedTag, setSelectedTag] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedProject, setSelectedProject] = useState('all');
    const [sortOrder, setSortOrder] = useState('date-desc');
    const tags = [...new Set(docs.flatMap((doc) => doc.tags))].sort();
    const types = [...new Set(docs.flatMap((doc) => doc.type))].sort();
    const statuses = [...new Set(docs.flatMap((doc) => doc.status))].sort();
    const projects = [...new Set(docs.map((doc) => doc.project).filter(Boolean))].sort();

    const visibleDocs = useMemo(() => {
        const query = searched.trim().toLowerCase();

        const filteredDocs = docs.filter((doc) => {
            const matchesTag = selectedTag === 'all' || doc.tags.includes(selectedTag);
            const matchesType = selectedType === 'all' || doc.type === selectedType;
            const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
            const matchesProject = selectedProject === 'all' || doc.project === selectedProject;
            const searchableText = [doc.title, doc.description, doc.type, doc.status, doc.project, ...doc.tags]
                .join(' ')
                .toLowerCase();

            return matchesTag && matchesType && matchesStatus && matchesProject && searchableText.includes(query);
        });

        return filteredDocs.sort((first, second) => {
            if (sortOrder === 'title-asc') {
                return first.title.localeCompare(second.title);
            }

            const dateDifference = first.date.localeCompare(second.date);

            return sortOrder === 'date-asc' ? dateDifference : -dateDifference;
        });
    }, [docs, searched, selectedTag, selectedType, selectedStatus, selectedProject, sortOrder]);
    
    return (
        <>
            <Head pageTitle={pageTitle} pageUrl={path} />
            
            <Nav />

            <main className={styles.docs}>
                <header className={styles.compactHeader}>
                    <div className={styles.headerTitle}>
                        <p className={styles.pageEyebrow}>02 / Knowledge base</p>
                        <h1>Docs</h1>
                    </div>
                    <p className={styles.docTotal}>{String(docs.length).padStart(2, '0')} documents</p>
                </header>

                <section className={styles.archive} aria-label='Documentation archive'>
                    <div className={styles.toolbar}>
                        <label className={styles.searchField}>
                            <span aria-hidden='true' className={styles.searchIcon} />
                            <span className={styles.visuallyHidden}>Search documents by keyword</span>
                            <input type='search' placeholder='Search docs' onChange={(event) => setSearched(event.target.value)} />
                        </label>

                        <label className={styles.selectControl}>
                            <span>Tag</span>
                            <span className={styles.selectValue} aria-hidden='true'>
                                {selectedTag === 'all' ? 'All tags' : selectedTag}
                            </span>
                            <select value={selectedTag} onChange={(event) => setSelectedTag(event.target.value)}>
                                <option value='all'>All tags</option>
                                {tags.map((tag) =>
                                    <option value={tag} key={tag}>{tag}</option>
                                )}
                            </select>
                        </label>
                        <label className={styles.selectControl}>
                            <span>Type</span>
                            <span className={styles.selectValue} aria-hidden='true'>
                                {selectedType === 'all' ? 'All types' : selectedType}
                            </span>
                            <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
                                <option value='all'>All types</option>
                                {types.map((type) =>
                                    <option value={type} key={type}>{type}</option>
                                )}
                            </select>
                        </label>
                        <label className={styles.selectControl}>
                            <span>Status</span>
                            <span className={styles.selectValue} aria-hidden='true'>
                                {selectedStatus === 'all' ? 'All status' : selectedStatus}
                            </span>
                            <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
                                <option value='all'>All status</option>
                                {statuses.map((status) =>
                                    <option value={status} key={status}>{status}</option>
                                )}
                            </select>
                        </label>
                        <label className={styles.selectControl}>
                            <span>Project</span>
                            <span className={styles.selectValue} aria-hidden='true'>
                                {selectedProject === 'all' ? 'All projects' : selectedProject}
                            </span>
                            <select value={selectedProject} onChange={(event) => setSelectedProject(event.target.value)}>
                                <option value='all'>All projects</option>
                                {projects.map((project) =>
                                    <option value={project} key={project}>{project}</option>
                                )}
                            </select>
                        </label>
                        <label className={styles.selectControl}>
                            <span>Sort</span>
                            <span className={styles.selectValue} aria-hidden='true'>
                                {sortOrder === 'date-desc' ? 'Newest' : sortOrder === 'date-asc' ? 'Oldest' : 'A to Z'}
                            </span>
                            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                                <option value='date-desc'>Newest</option>
                                <option value='date-asc'>Oldest</option>
                                <option value='title-asc'>A to Z</option>
                            </select>
                        </label>
                    </div>

                    <div className={styles.resultsLine} aria-live='polite'>
                        <p>Documentation</p>
                        <p>{String(visibleDocs.length).padStart(2, '0')} / {String(docs.length).padStart(2, '0')}</p>
                    </div>

                    {visibleDocs.length > 0 ? (
                        <div className={styles.docGrid}>
                            {visibleDocs.map((doc) =>
                                <article className={styles.docCard} key={doc.slug}>
                                    <Link href={`/docs/${doc.slug}`} className={styles.docLink}>
                                        <div className={styles.docContent}>
                                            <div className={styles.docContentHeader}>
                                                <h2>{doc.title}</h2>
                                                <p className={styles.docMeta}>
                                                    {doc.type} | {doc.date} | {doc.status}
                                                </p>
                                            </div>
                                            <p>{doc.description}</p>
                                            {doc.tags.length > 0 && (
                                                <ul className={styles.docTags} aria-label={`${doc.title} tags`}>
                                                    {doc.tags.map((tag) => <li key={tag}>{tag}</li>)}
                                                </ul>
                                            )}
                                            {doc.project && <p className={styles.docProject}>Project: {doc.project}</p>}
                                            <span className={styles.readLink}>Read document <span className={styles.arrowIcon} aria-hidden='true' /></span>
                                        </div>
                                    </Link>
                                </article>
                            )}
                        </div>
                    ) : (
                        <p className={styles.emptyState}>
                            {docs.length
                                ? 'No documents match your search and filters.'
                                : 'No documents yet.'}
                        </p>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}
