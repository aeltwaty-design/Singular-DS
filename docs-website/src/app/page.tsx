import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { BrandsShowcase } from '@/components/home/BrandsShowcase';
import { QuickNavigation } from '@/components/home/QuickNavigation';
import { CodeExample } from '@/components/home/CodeExample';

export default async function HomePage() {
  const t = await getTranslations();

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

      <main className="flex-1">
        <Hero
          translations={{
            badge: t('hero.badge'),
            title: t('hero.title'),
            titleHighlight: t('hero.titleHighlight'),
            description: t('hero.description'),
            cta: {
              getStarted: t('hero.cta.getStarted'),
              viewGithub: t('hero.cta.viewGithub'),
            },
          }}
        />

        <Features
          translations={{
            title: t('features.title'),
            subtitle: t('features.subtitle'),
            tokens: {
              title: t('features.tokens.title'),
              description: t('features.tokens.description'),
            },
            themes: {
              title: t('features.themes.title'),
              description: t('features.themes.description'),
            },
            modes: {
              title: t('features.modes.title'),
              description: t('features.modes.description'),
            },
            rtl: {
              title: t('features.rtl.title'),
              description: t('features.rtl.description'),
            },
            flutter: {
              title: t('features.flutter.title'),
              description: t('features.flutter.description'),
            },
            docs: {
              title: t('features.docs.title'),
              description: t('features.docs.description'),
            },
          }}
        />

        <BrandsShowcase
          translations={{
            title: t('brands.title'),
            description: t('brands.description'),
            walaplus: {
              name: t('brands.walaplus.name'),
              description: t('brands.walaplus.description'),
            },
            walaone: {
              name: t('brands.walaone.name'),
              description: t('brands.walaone.description'),
            },
            doam: {
              name: t('brands.doam.name'),
              description: t('brands.doam.description'),
            },
          }}
          buttonLabels={{
            primary: t('brandsShowcase.primaryButton'),
            secondary: t('brandsShowcase.secondaryButton'),
            outlined: t('brandsShowcase.outlined'),
          }}
        />

        <QuickNavigation
          translations={{
            title: t('quickNav.title'),
            subtitle: t('quickNav.subtitle'),
            getStarted: {
              title: t('quickNav.getStarted.title'),
              description: t('quickNav.getStarted.description'),
            },
            foundations: {
              title: t('quickNav.foundations.title'),
              description: t('quickNav.foundations.description'),
            },
            components: {
              title: t('quickNav.components.title'),
              description: t('quickNav.components.description'),
            },
            patterns: {
              title: t('quickNav.patterns.title'),
              description: t('quickNav.patterns.description'),
            },
          }}
          learnMore={t('quickNav.learnMore')}
          comingSoon={t('quickNav.comingSoon')}
        />

        <CodeExample
          translations={{
            title: t('codeExample.title'),
            description: t('codeExample.description'),
            features: {
              typeSafe: t('codeExample.features.typeSafe'),
              autoTheme: t('codeExample.features.autoTheme'),
              semantic: t('codeExample.features.semantic'),
              intellisense: t('codeExample.features.intellisense'),
            },
          }}
        />
      </main>

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

