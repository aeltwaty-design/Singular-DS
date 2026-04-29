'use client';

import Link from 'next/link';
import { useBrand } from '@/components/providers/Providers';
import { Github, Figma, Twitter, Heart } from 'lucide-react';

interface FooterProps {
  translations: {
    tagline: string;
    copyright: string;
    madeWith: string;
    forCommunity: string;
    resources: string;
    community: string;
    legal: string;
    releases: string;
    blog: string;
    discord: string;
    twitter: string;
    privacy: string;
    terms: string;
    license: string;
    links: {
      documentation: string;
      github: string;
      figma: string;
      changelog: string;
    };
  };
}

export function Footer({ translations }: FooterProps) {
  const { brandColors } = useBrand();

  const footerLinks = [
    {
      title: translations.resources,
      links: [
        { label: translations.links.documentation, href: '/docs' },
        { label: translations.links.changelog, href: '/changelog' },
        { label: translations.releases, href: '/releases' },
        { label: translations.blog, href: '/blog' },
      ],
    },
    {
      title: translations.community,
      links: [
        { label: translations.links.github, href: 'https://github.com', external: true },
        { label: translations.links.figma, href: 'https://figma.com', external: true },
        { label: translations.discord, href: 'https://discord.com', external: true },
        { label: translations.twitter, href: 'https://twitter.com', external: true },
      ],
    },
    {
      title: translations.legal,
      links: [
        { label: translations.privacy, href: '/privacy' },
        { label: translations.terms, href: '/terms' },
        { label: translations.license, href: '/license' },
      ],
    },
  ];

  return (
    <footer suppressHydrationWarning className="relative mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
      {/* Gradient accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${brandColors.primary}, ${brandColors.secondary}, transparent)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: brandColors.primary }}
              >
                <img src="/logo.svg" alt="Singular" className="w-6 h-6 brightness-0 invert" />
              </div>
              <span className="font-display font-semibold text-lg text-neutral-900 dark:text-white">
                Singular
              </span>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              {translations.tagline}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://figma.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <Figma className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            {translations.copyright}
          </p>
          <p className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-500">
            {translations.madeWith} <Heart className="w-4 h-4 text-red-500" /> {translations.forCommunity}
          </p>
        </div>
      </div>
    </footer>
  );
}
