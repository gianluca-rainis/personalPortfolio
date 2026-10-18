import React from 'react'
import HeadNext from 'next/head'

export default function Head({ pageTitle="", pageUrl="https://projects.gianlucarainis.com/" }) {
    return (
        <>
            <HeadNext>
                <title>{pageTitle ? `Gianluca Rainis - ${pageTitle}` : 'Gianluca Rainis'}</title>
                <link rel="canonical" href={pageUrl} />

                <meta name="description" content="Gianluca Rainis is a student of Computer Science who is passionate about software development, hardware design and innovation." />
                <meta name="author" content="Gianluca Rainis" />
                <meta name="keywords" content="Gianluca Rainis - Student, Developer" />
                <meta name="application-name" content="Gianluca Rainis" lang="en" />
                
                {/* Open Graph */}
                <meta property="og:url" content={pageUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Gianluca Rainis" />
                <meta property="og:title" content={pageTitle || 'Gianluca Rainis'} />
                <meta property="og:description" content="Gianluca Rainis is a student of Computer Science who is passionate about software development, hardware design and innovation." />
                <meta property="og:image" content="https://projects.gianlucarainis.com/gianlucarainisPreview.png" />
                <meta property="og:image:secure_url" content="https://projects.gianlucarainis.com/gianlucarainisPreview.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Gianluca Rainis preview image" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="projects.gianlucarainis.com" />
                <meta name="twitter:url" content={pageUrl} />
                <meta name="twitter:title" content={pageTitle || 'Gianluca Rainis'} />
                <meta name="twitter:description" content="Gianluca Rainis is a student of Computer Science who is passionate about software development, hardware design and innovation." />
                <meta name="twitter:image" content="https://projects.gianlucarainis.com/gianlucarainisPreview.png" />
                
                {/* Favicon and CSS are in _document.js */}
                
                {/* JSON-LD Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@type": "WebSite",
                            "@context": "https://schema.org",
                            "name": "Gianluca Rainis",
                            "url": "https://projects.gianlucarainis.com"
                        })
                    }}
                />
            </HeadNext>
        </>
    )
}
