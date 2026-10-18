import '@/styles/styles.css';
import { ThemeProvider } from '@/components/ThemeContext';

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
