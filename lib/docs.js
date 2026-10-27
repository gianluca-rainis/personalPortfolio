import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { serialize } from 'next-mdx-remote/serialize';

export const DOCS_DIRECTORY = path.join(process.cwd(), 'docs');

async function findMdxFiles(directory = DOCS_DIRECTORY) {
    let entries;

    try {
        entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
        if (error.code === 'ENOENT' && directory === DOCS_DIRECTORY) {
            return [];
        }

        throw error;
    }

    const files = await Promise.all(entries
        .filter((entry) => !entry.name.startsWith('.'))
        .map(async (entry) => {
            const entryPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                return findMdxFiles(entryPath);
            }

            return entry.isFile() && entry.name.endsWith('.mdx') ? [entryPath] : [];
        }));

    return files.flat();
}

export function getDocMetadata(frontmatter, slug) {
    const requiredStringFields = ['title', 'description', 'type', 'date', 'status'];

    for (const field of requiredStringFields) {
        if (typeof frontmatter[field] !== 'string' || !frontmatter[field].trim()) {
            throw new Error(`The "${field}" frontmatter field for "${slug}" must be a non-empty string.`);
        }
    }

    const tags = frontmatter.tags;

    if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string' || !tag.trim())) {
        throw new Error(`The "tags" frontmatter field for "${slug}" must be a list of non-empty strings.`);
    }

    for (const field of ['date', 'updated']) {
        const value = frontmatter[field];

        if (value !== undefined && (typeof value !== 'string'
            || !/^\d{4}-\d{2}-\d{2}$/.test(value)
            || new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) !== value
        )) {
            throw new Error(`The "${field}" frontmatter field for "${slug}" must use YYYY-MM-DD format.`);
        }
    }

    for (const field of ['updated', 'project']) {
        if (frontmatter[field] !== undefined && (typeof frontmatter[field] !== 'string' || !frontmatter[field].trim())) {
            throw new Error(`The optional "${field}" frontmatter field for "${slug}" must be a non-empty string when provided.`);
        }
    }

    return {
        slug,
        title: frontmatter.title.trim(),
        description: frontmatter.description.trim(),
        type: frontmatter.type,
        date: frontmatter.date,
        updated: frontmatter.updated ?? null,
        tags,
        project: frontmatter.project ?? null,
        status: frontmatter.status.trim()
    };
}

export async function getAllDocs() {
    const files = await findMdxFiles();

    const docs = await Promise.all(files.map(async (filePath) => {
        const source = await readFile(filePath, 'utf8');
        const slug = path.relative(DOCS_DIRECTORY, filePath)
            .replace(/\.mdx$/, '')
            .split(path.sep)
            .join('/');
            
        const { frontmatter } = await serialize(source, { parseFrontmatter: true });

        return getDocMetadata(frontmatter, slug);
    }));

    return docs.sort((first, second) => first.title.localeCompare(second.title));
}
