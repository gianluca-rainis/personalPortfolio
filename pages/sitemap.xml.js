import projects from '@/data/projects.json';
import { getAllDocs } from '@/lib/docs';

const SITE_URL = 'https://projects.gianlucarainis.com';

const pages = [
    {
        loc: '',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 1.0,
    },
    {
        loc: '/projects',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
    },
    {
        loc: '/docs',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
    },
];

export async function getServerSideProps({ res }) {
    const dynamicPages = projects.map((project) => ({
        loc: project.href,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.5,
    }));

    const docs = await getAllDocs();
    const docPages = docs.filter((doc) => doc.listed).map((doc) => ({
        loc: `/docs/${doc.slug}`,
        lastmod: new Date(doc.updated ?? doc.date).toISOString(),
        changefreq: 'yearly',
        priority: 0.5,
    }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages.concat(dynamicPages, docPages).map((page) => `
            <url>
                <loc>${SITE_URL}${page.loc}</loc>
                <lastmod>${page.lastmod}</lastmod>
                <changefreq>${page.changefreq}</changefreq>
                <priority>${page.priority}</priority>
            </url>
        `).join('')}
    </urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default function Sitemap() {
    return null;
}
