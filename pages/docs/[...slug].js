import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from '@/styles/docs.module.css';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DOCS_DIRECTORY, getAllDocs, getDocMetadata } from '@/lib/docs';

export async function getStaticPaths() {
    const docs = await getAllDocs();

    return {
        paths: docs.map((doc) => ({
            params: { slug: doc.slug.split('/') }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const slug = params.slug.join('/');
    const filePath = path.join(DOCS_DIRECTORY, ...params.slug) + '.mdx';
    const source = await readFile(filePath, 'utf8');
    const mdxSource = await serialize(source, { parseFrontmatter: true });
    const metadata = getDocMetadata(mdxSource.frontmatter, slug);

    return {
        props: {
            mdxSource,
            ...metadata
        }
    };
}

export default function DocPage({ mdxSource, title, description, type, date, updated, tags, project, status }) {
    const path = usePathname();

    return (
        <>
            <Head pageTitle={title} pageUrl={path} />
            <Nav />

            <main className={styles.docPage}>
                <Link href='/docs' className={styles.backLink}><span className={styles.arrowIcon} aria-hidden='true' /> All docs</Link>
                <header className={styles.docHeader}>
                    <p className={styles.pageEyebrow}>{type}</p>
                    <p className={styles.docMeta}>
                        {date} {updated && ` | Updated ${updated}`} | {status}
                    </p>
                    <h1>{title}</h1>
                    <p className={styles.docDescription}>{description}</p>
                    {project && <p className={styles.docProject}>Project: {project}</p>}
                    {tags.length > 0 && (
                        <ul className={styles.docTags} aria-label={`${title} tags`}>
                            {tags.map((tag) => <li key={tag}>{tag}</li>)}
                        </ul>
                    )}
                </header>
                <article className={styles.mdxContent}>
                    <MDXRemote {...mdxSource} />
                </article>
            </main>

            <Footer />
        </>
    );
}
