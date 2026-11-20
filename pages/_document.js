import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en-US">
            <Head>
                {/* Favicon */}
                <link rel="shortcut icon" type="image/webp" href="/icon.webp" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
