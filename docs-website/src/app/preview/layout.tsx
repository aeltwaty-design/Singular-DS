'use client';

import { ReactNode } from 'react';

/**
 * Preview Layout
 * Minimal layout for screen previews without navbar/footer
 */
export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
      {children}
    </div>
  );
}
