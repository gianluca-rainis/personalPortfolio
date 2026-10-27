import React from 'react'
import HeadNext from 'next/head'

export default function Head({ pageTitle="", pageUrl="https://projects.gianlucarainis.com/" }) {
    return (
        <>
            <HeadNext>
                <title>{pageTitle ? `Gianluca Rainis Labs - ${pageTitle}` : 'Gianluca Rainis Labs'}</title>
                <link rel="canonical" href={pageUrl} />

                <meta name="description" content="Portfolio of Gianluca Rainis, Computer Science student: a collection of hardware, software and game development projects, from custom PCBs and ASICs to web apps and Unity games." />
                <meta name="author" content="Gianluca Rainis" />
                <meta name="keywords" content="Gianluca Rainis Labs" />
                <meta name="application-name" content="Gianluca Rainis Labs" lang="en" />
                
                {/* Open Graph */}
                <meta property="og:url" content={pageUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Gianluca Rainis Labs" />
                <meta property="og:title" content={pageTitle || 'Gianluca Rainis Labs'} />
                <meta property="og:description" content="Portfolio of Gianluca Rainis, Computer Science student: a collection of hardware, software and game development projects, from custom PCBs and ASICs to web apps and Unity games." />
                <meta property="og:image" content="https://projects.gianlucarainis.com/GRLabsPreview.png" />
                <meta property="og:image:secure_url" content="https://projects.gianlucarainis.com/GRLabsPreview.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Gianluca Rainis Labs preview image" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="projects.gianlucarainis.com" />
                <meta name="twitter:url" content={pageUrl} />
                <meta name="twitter:title" content={pageTitle || 'Gianluca Rainis Labs'} />
                <meta name="twitter:description" content="Portfolio of Gianluca Rainis, Computer Science student: a collection of hardware, software and game development projects, from custom PCBs and ASICs to web apps and Unity games." />
                <meta name="twitter:image" content="https://projects.gianlucarainis.com/GRLabsPreview.png" />
                
                {/* Favicon and CSS are in _document.js */}
                
                {/* JSON-LD Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@type": "WebSite",
                            "@context": "https://schema.org",
                            "name": "Gianluca Rainis Labs",
                            "url": "https://projects.gianlucarainis.com"
                        })
                    }}
                />
            </HeadNext>
        </>
    )
}
