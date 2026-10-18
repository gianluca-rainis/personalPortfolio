import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en-US">
            <Head>
                {/* Favicon */}
                <link rel="shortcut icon" type="image/png" href="/icon.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
