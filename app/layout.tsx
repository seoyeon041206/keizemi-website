import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://keizemi-keio.sykim140400.chatgpt.site'),
  title: 'KEIZEMI | 慶應義塾大学 経済学部ゼミナール委員会',
  description: '慶應義塾大学経済学部の研究会、入ゼミ試験、説明会、ゼミ活動に関する公式情報。',
  openGraph: {
    title: 'KEIZEMI | 慶應義塾大学 経済学部ゼミナール委員会',
    description: 'ゼミ選びから、ゼミ生活のその先へ。研究会・入ゼミ・イベントの公式情報。',
    type: 'website',
    locale: 'ja_JP',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'KEIZEMI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KEIZEMI | 慶應義塾大学 経済学部ゼミナール委員会',
    description: 'ゼミ選びから、ゼミ生活のその先へ。研究会・入ゼミ・イベントの公式情報。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
