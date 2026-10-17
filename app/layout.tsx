import type { Metadata, Viewport } from 'next';
import './globals.css';
import './site.css';
import { Announcement, Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: { default: 'learn-genai.in — Prompt the Next Era', template: '%s · learn-genai.in' },
  description: 'A free path for students, software engineers and founders who want to use generative AI on real work, and still explain it.',
  openGraph: { title: 'learn-genai.in — Prompt the Next Era', description: 'Use AI on real work. Still explain every line. Six stops, about two hours, free.', type: 'website' },
};
export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#fff8ec' }, { media: '(prefers-color-scheme: dark)', color: '#14131f' }] };

const themeInit = `try{var t=localStorage.getItem('lg-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
      <body className="lg-root">
        <a href="#main" className="skip">Skip to content</a>
        <Announcement />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
