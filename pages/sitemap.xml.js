const SITE_URL = 'https://projects.gianlucarainis.com';

const pages = [
    '',
    '/projects',
    '/docs',
];

export async function getServerSideProps({ res }) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages.map((page) => `
            <url>
                <loc>${SITE_URL}${page}</loc>
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
