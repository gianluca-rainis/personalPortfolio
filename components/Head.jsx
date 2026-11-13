import React from 'react';
import HeadNext from 'next/head';
import { useRouter } from 'next/router';

const siteUrl = 'https://projects.gianlucarainis.com';
const mainSiteUrl = 'https://www.gianlucarainis.com';
const siteName = 'Gianluca Rainis Labs';
const description = 'Portfolio of Gianluca Rainis, Computer Science student: a collection of hardware, software and game development projects, from custom PCBs and ASICs to web apps and Unity games.';
const previewImage = `${siteUrl}/GRLabsPreview.png`;
const authorRef = {
    '@type': 'Person',
    '@id': `${mainSiteUrl}/#person`,
    name: 'Gianluca Rainis',
    url: mainSiteUrl
};

export default function Head({ pageTitle='', pageUrl, projectData=null }) {
    const router = useRouter();
    const path = router.asPath.split('?')[0].split('#')[0];
    const canonicalUrl = pageUrl || `${siteUrl}${path === '/' ? '' : path}`;
    const fullTitle = pageTitle ? `${siteName} - ${pageTitle}` : siteName;
    const finalDescription = projectData?.description || description;

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteName,
            alternateName: ['GRLabs', 'GR Labs'],
            url: siteUrl,
            author: authorRef,
            publisher: authorRef
        }
    ];

    if (projectData) {
        jsonLd.push({
            '@context': 'https://schema.org',
            '@type': projectData.codeRepository ? 'SoftwareSourceCode' : 'CreativeWork',
            name: projectData.name,
            description: projectData.description,
            url: canonicalUrl,
            author: authorRef,
            ...(projectData.codeRepository && { codeRepository: projectData.codeRepository })
        });
    }

    return (
        <HeadNext>
            <title>{fullTitle}</title>
            <link rel="canonical" href={canonicalUrl} />
            <meta name="description" content={finalDescription} />
            <meta name="author" content="Gianluca Rainis" />
            <meta name="robots" content="index, follow, max-image-preview:large" />

            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={previewImage} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Gianluca Rainis Labs preview image" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={previewImage} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </HeadNext>
    )
}
