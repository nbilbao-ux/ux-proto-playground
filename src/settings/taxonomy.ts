export type SettingsNavPage = {
  label: string;
  path: string;
  keywords?: string[];
};

export type SettingsNavSection = {
  label: string;
  pages: SettingsNavPage[];
};

export const SETTINGS_NAV: SettingsNavSection[] = [
  {
    label: 'User Account',
    pages: [
      { label: 'Personal Info', path: '/settings/account/profile', keywords: ['name', 'avatar', 'email', 'profile', 'personal'] },
      { label: 'Permission', path: '/settings/account/permission', keywords: ['roles', 'access'] },
      { label: 'Notifications', path: '/settings/account/notifications', keywords: ['email', 'push', 'digest'] },
      { label: 'Security', path: '/settings/account/security', keywords: ['mfa', '2fa', 'sessions', 'password'] },
    ],
  },
  {
    label: 'Shipments',
    pages: [
      { label: 'Shipments Preferences', path: '/settings/shipments/preferences', keywords: ['defaults', 'shipment'] },
      { label: "Buyer's Consolidation", path: '/settings/shipments/buyers-consolidation', keywords: ['buyer', 'buyers', 'merge', 'consolidation'] },
      { label: 'Optimization', path: '/settings/shipments/optimization', keywords: ['optimize', 'optimization', 'service levels'] },
      { label: 'Capital', path: '/settings/shipments/capital', keywords: ['financing', 'capital', 'funding'] },
    ],
  },
  {
    label: 'Network',
    pages: [
      { label: 'Organizations', path: '/settings/network/organizations', keywords: ['org', 'company', 'organization'] },
      { label: 'Contacts', path: '/settings/network/contacts', keywords: ['person', 'contact', 'people'] },
      { label: 'Facilities & Locations', path: '/settings/network/facilities', keywords: ['facility', 'warehouse', 'location', 'address'] },
      { label: 'Trade Lanes', path: '/settings/network/trade-lanes', keywords: ['lane', 'port', 'route'] },
      { label: 'Invitations', path: '/settings/network/invitations', keywords: ['invite', 'invitation', 'connect'] },
    ],
  },
  {
    label: 'Administration',
    pages: [
      { label: 'Company', path: '/settings/admin/company', keywords: ['org', 'workspace'] },
      { label: 'Legal Entities', path: '/settings/admin/legal-entities', keywords: ['entity', 'tax'] },
      { label: 'Users', path: '/settings/admin/users', keywords: ['members', 'seats'] },
      { label: 'Notifications', path: '/settings/admin/notifications', keywords: ['system', 'incident'] },
      { label: 'ERP Integrations', path: '/settings/admin/erp-integrations', keywords: ['netsuite', 'sap', 'erp'] },
      { label: 'API', path: '/settings/admin/api', keywords: ['api', 'credentials', 'webhooks', 'keys', 'oauth'] },
      { label: 'Billing', path: '/settings/admin/billing', keywords: ['plan', 'invoice', 'payment'] },
    ],
  },
];

