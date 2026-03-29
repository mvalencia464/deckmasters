/**
 * Data for /admin/site-structure — visual map of routes + service hierarchy.
 * Source of truth for services: `siteArchitecture.ts`.
 */

import {
  serviceCategoryOrder,
  getServicePage,
  getChildren,
  servicePages,
  type ServicePageEntry,
} from './siteArchitecture';

export const topLevelSiteRoutes: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services (index)' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/schedule', label: 'Get a quote / schedule' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/wall-of-love', label: 'Reviews (Wall of Love)' },
  { href: '/blog', label: 'Blog index' },
  { href: '/alaska', label: 'Alaska landing' },
  { href: '/featured-project', label: 'Featured project' },
  { href: '/dock-building', label: 'Dock building' },
  { href: '/partners', label: 'Partners' },
  { href: '/hiring', label: 'Careers' },
  { href: '/for-the-nerds', label: 'For the nerds' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

/** Internal tools — linked from /admin/* pages; copywriting library is noindex but not under /admin */
export const adminInternalNav: { href: string; label: string }[] = [
  { href: '/admin/publishing', label: 'Publishing & launch plan' },
  { href: '/admin/site-structure', label: 'Site structure' },
  { href: '/for-the-nerds', label: 'For the nerds' },
  { href: '/copywriting-library', label: 'Copywriting library' },
];

export type ServiceTreeSection =
  | { mode: 'flat'; leaves: ServicePageEntry[] }
  | {
      mode: 'nested';
      groups: { core: ServicePageEntry; leaves: ServicePageEntry[] }[];
    };

export function getServiceTreeSections(): { category: ServicePageEntry; tree: ServiceTreeSection }[] {
  return serviceCategoryOrder.map((categoryId) => {
    const catPage = getServicePage(categoryId)!;
    const topLevel = getChildren(categoryId);
    const hasCore = topLevel.some((k) => k.kind === 'core');
    if (!hasCore) {
      return { category: catPage, tree: { mode: 'flat', leaves: topLevel } };
    }
    return {
      category: catPage,
      tree: {
        mode: 'nested',
        groups: topLevel.map((core) => ({
          core,
          leaves: getChildren(core.slug),
        })),
      },
    };
  });
}

export function getServicePageStats() {
  return {
    total: servicePages.length,
    categories: servicePages.filter((p) => p.kind === 'category').length,
    cores: servicePages.filter((p) => p.kind === 'core').length,
    children: servicePages.filter((p) => p.kind === 'child').length,
  };
}

export const kindStyles: Record<
  ServicePageEntry['kind'],
  { label: string; class: string }
> = {
  category: {
    label: 'Category',
    class: 'border-brand-orange bg-brand-orange/10 text-brand-orange',
  },
  core: {
    label: 'Core hub',
    class: 'border-accent/40 bg-accent/10 text-accent-dark',
  },
  child: {
    label: 'Child',
    class: 'border-neutral-300 bg-neutral-50 text-neutral-600',
  },
};
