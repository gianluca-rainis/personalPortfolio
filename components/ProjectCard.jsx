import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/projectcard.module.css';

export default function ProjectCard({ project }) {
    return (
        <article className={styles.card}>
            <Link href={project.href} className={styles.projectLink} aria-label={`View ${project.title}`}>
                <div className={styles.imageFrame}>
                    <Image src={project.image} alt={project.imageAlt} fill className={styles.image} />
                    <div className={styles.imageMeta}>
                        <span>{project.number}</span>
                        <span>{project.category}</span>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.titleRow}>
                        <h2>{project.title}</h2>
                        <p className={styles.status}>{project.status}</p>
                    </div>
                    <p className={styles.description}>{project.description}</p>
                    <ul className={styles.tags} aria-label={`${project.title} tags`}>
                        {project.tags.map((tag) => 
                            <li key={tag}>{tag}</li>
                        )}
                    </ul>
                    <p className={styles.viewLink}>
                        View project <span className={styles.arrowIcon} aria-hidden='true' />
                    </p>
                </div>
            </Link>
        </article>
    );
}
