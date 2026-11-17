import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import '@/styles/styles.css';
import '@/styles/error.css';

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isApplePlatform = /Mac|iPhone|iPad/.test(navigator.userAgent);

        if (prefersReducedMotion || isApplePlatform) {
            return;
        }

        const lenis = new Lenis({ autoRaf: true, anchors: true });

        return () => lenis.destroy();
    }, []);
    
    return (
        <Component {...pageProps} />
    );
}
