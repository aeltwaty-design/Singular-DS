'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useTranslations } from 'next-intl';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();

  return (
    <>
      <Navbar
        translations={{
          home: t('nav.home'),
          getStarted: t('nav.getStarted'),
          foundations: t('nav.foundations'),
          components: t('nav.components'),
          search: t('nav.search'),
          toggleTheme: t('nav.toggleTheme'),
          toggleLanguage: t('nav.toggleLanguage'),
        }}
      />

      <main className="flex-1 pt-20">{children}</main>

      <Footer
        translations={{
          tagline: t('footer.tagline'),
          copyright: t('footer.copyright'),
          madeWith: t('footer.madeWith'),
          forCommunity: t('footer.forCommunity'),
          resources: t('footer.resources'),
          community: t('footer.community'),
          legal: t('footer.legal'),
          releases: t('footer.releases'),
          blog: t('footer.blog'),
          discord: t('footer.discord'),
          twitter: t('footer.twitter'),
          privacy: t('footer.privacy'),
          terms: t('footer.terms'),
          license: t('footer.license'),
          links: {
            documentation: t('footer.links.documentation'),
            github: t('footer.links.github'),
            figma: t('footer.links.figma'),
            changelog: t('footer.links.changelog'),
          },
        }}
      />
    </>
  );
}

