/**
 * Contact form “Service needed” dropdown — categories + core hubs + catch-all (Core30 Prompt 7).
 */
import { CORE_SERVICE_SLUGS, getServicePage, servicePages } from './siteArchitecture';

export interface ServiceSelectGroup {
  label: string;
  options: { value: string; label: string }[];
}

export const contactFormServiceGroups: ServiceSelectGroup[] = [
  {
    label: 'Service categories',
    options: servicePages
      .filter((p) => p.kind === 'category')
      .map((p) => ({ value: p.title, label: p.title })),
  },
  {
    label: 'Core service hubs',
    options: CORE_SERVICE_SLUGS.map((slug) => {
      const p = getServicePage(slug);
      return p ? { value: p.title, label: p.title } : null;
    }).filter((x): x is { value: string; label: string } => x !== null),
  },
];

export const CONTACT_FORM_OTHER_OPTION = 'Other / Not sure';
