/**
 * Search index for settings pages
 * Maps search terms to pages and field identifiers
 */

export type SearchableField = {
  pagePath: string;
  pageLabel: string;
  fieldId: string;
  fieldLabel: string;
  fieldHint?: string;
  searchTerms: string[]; // Additional search terms beyond the field label
};

export const SETTINGS_SEARCH_INDEX: SearchableField[] = [
  // Account Profile
  {
    pagePath: '/settings/account/profile',
    pageLabel: 'Personal Info',
    fieldId: 'profile-picture',
    fieldLabel: 'Profile Picture',
    fieldHint: 'Upload a photo to personalize your account',
    searchTerms: ['avatar', 'photo', 'image', 'picture'],
  },
  {
    pagePath: '/settings/account/profile',
    pageLabel: 'Personal Info',
    fieldId: 'first-name',
    fieldLabel: 'First name',
    fieldHint: 'Your given name',
    searchTerms: ['firstname', 'given name', 'forename'],
  },
  {
    pagePath: '/settings/account/profile',
    pageLabel: 'Personal Info',
    fieldId: 'last-name',
    fieldLabel: 'Last name',
    fieldHint: 'Your family name',
    searchTerms: ['lastname', 'surname', 'family name'],
  },
  {
    pagePath: '/settings/account/profile',
    pageLabel: 'Personal Info',
    fieldId: 'phone-number',
    fieldLabel: 'Phone number',
    fieldHint: 'Your contact phone number',
    searchTerms: ['phone', 'telephone', 'mobile', 'contact'],
  },
  {
    pagePath: '/settings/account/profile',
    pageLabel: 'Personal Info',
    fieldId: 'email-address',
    fieldLabel: 'Email Address',
    fieldHint: 'Your primary email address',
    searchTerms: ['email', 'mail'],
  },
  {
    pagePath: '/settings/account/profile',
    pageLabel: 'Personal Info',
    fieldId: 'preferred-language',
    fieldLabel: 'Preferred Language',
    fieldHint: 'Select your preferred language for the interface',
    searchTerms: ['language', 'locale', 'lang'],
  },
  {
    pagePath: '/settings/account/profile',
    pageLabel: 'Personal Info',
    fieldId: 'title',
    fieldLabel: 'Title',
    fieldHint: 'Your job title or role',
    searchTerms: ['job title', 'role', 'position'],
  },

  // Account Permission
  {
    pagePath: '/settings/account/permission',
    pageLabel: 'Permission',
    fieldId: 'shipment-access',
    fieldLabel: 'Give Sharon access to',
    searchTerms: ['shipment', 'access', 'permission'],
  },
  {
    pagePath: '/settings/account/permission',
    pageLabel: 'Permission',
    fieldId: 'warehouse-receiving',
    fieldLabel: 'Allow access to Warehouse Receiving',
    searchTerms: ['warehouse', 'receiving', 'permission'],
  },
  {
    pagePath: '/settings/account/permission',
    pageLabel: 'Permission',
    fieldId: 'read-only-appointments',
    fieldLabel: 'Read-only access to the appointments',
    searchTerms: ['appointments', 'read only', 'readonly'],
  },
  {
    pagePath: '/settings/account/permission',
    pageLabel: 'Permission',
    fieldId: 'demurrage-detention',
    fieldLabel: 'Allow access to Demurrage & Detention data',
    searchTerms: ['demurrage', 'detention', 'permission'],
  },

  // Account Notifications - Freight Section
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'freight-shipment-scope',
    fieldLabel: 'Which quotes, bookings and shipments do you want to be notified about?',
    searchTerms: ['freight', 'shipment', 'scope', 'quotes', 'bookings'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'weekly-digest',
    fieldLabel: 'Weekly Digest',
    fieldHint: 'Receive a weekly summary via email of your active shipments.',
    searchTerms: ['weekly', 'digest', 'summary'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'delivery-order-emails',
    fieldLabel: 'Delivery order emails',
    fieldHint: 'Receive delivery order and delivery notice emails.',
    searchTerms: ['delivery', 'order', 'emails'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'daily-digest',
    fieldLabel: 'Daily Digest',
    fieldHint: 'Receive a daily summary via email of any updates that have occurred on your shipments in the past 24 hours.',
    searchTerms: ['daily', 'digest', 'summary'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'quotes-bookings',
    fieldLabel: 'Quotes and Bookings',
    fieldHint: 'Notifications related to all booking and quoting activity',
    searchTerms: ['quotes', 'bookings', 'quote', 'booking'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'requotes',
    fieldLabel: 'Requotes',
    fieldHint: 'Receive a notification for price changes and rate expirations',
    searchTerms: ['requote', 'price', 'rate'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'booking-review',
    fieldLabel: 'Booking review',
    fieldHint: 'Email notifications for when bookings are amended or completed',
    searchTerms: ['booking', 'review', 'amended'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'exceptions-messages',
    fieldLabel: 'Exceptions and Messages',
    fieldHint: 'Get notified when an exception occurs or a message is posted',
    searchTerms: ['exceptions', 'messages', 'exception', 'message'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'direct-mentions-replies',
    fieldLabel: 'Direct Mentions and Replies',
    fieldHint: 'Get notified when you are tagged or when someone responds to your message',
    searchTerms: ['mentions', 'replies', 'tagged', 'tags'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'export-documents',
    fieldLabel: 'Export documents submission',
    fieldHint: 'Receive a notification when documents have been digitized',
    searchTerms: ['export', 'documents', 'digitized'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'shipment-document-reminders',
    fieldLabel: 'Shipment document reminders & updates',
    fieldHint: 'Receive notifications when a document is required, or has been updated',
    searchTerms: ['shipment', 'document', 'reminders', 'updates'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'demurrage-detention-notifications',
    fieldLabel: 'Demurrage and Detention',
    fieldHint: 'Last free day expired, last free day within 2 days',
    searchTerms: ['demurrage', 'detention'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'delivery-date-scheduled',
    fieldLabel: 'Delivery Date Scheduled',
    fieldHint: 'Receive a notification when a delivery date is scheduled or updated',
    searchTerms: ['delivery', 'date', 'scheduled'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'pickup-date-scheduled',
    fieldLabel: 'Pickup Date Scheduled',
    fieldHint: 'Receive a notification when a pickup date is scheduled or updated',
    searchTerms: ['pickup', 'date', 'scheduled'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'tasks',
    fieldLabel: 'Tasks',
    fieldHint: 'Receive a notification when a task needs action',
    searchTerms: ['tasks', 'task'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'schedule-changes',
    fieldLabel: 'Schedule changes',
    fieldHint: 'Get notified about delays and early arrivals',
    searchTerms: ['schedule', 'changes', 'delays', 'arrivals'],
  },

  // Account Notifications - Order Management Section
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'order-management-general-events',
    fieldLabel: 'General Events',
    fieldHint: 'Receive notifications for general order management events and exceptions.',
    searchTerms: ['order', 'management', 'general', 'events'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'booking-flagged-approval',
    fieldLabel: 'Booking has been flagged for approval',
    fieldHint: 'Receive a notification when there are bookings that need to be approved',
    searchTerms: ['booking', 'flagged', 'approval'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'booking-flagged-violations',
    fieldLabel: 'Booking has been flagged with violations',
    fieldHint: 'Receive a notification when there are bookings with violations',
    searchTerms: ['booking', 'flagged', 'violations'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'booking-approved-shipper',
    fieldLabel: 'Booking has been approved (shipper)',
    fieldHint: 'As the shipper, receive a notification when my booking has been approved',
    searchTerms: ['booking', 'approved', 'shipper'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'booking-rejected-shipper',
    fieldLabel: 'Booking has been rejected (shipper)',
    fieldHint: 'As the shipper, receive a notification when my booking has been rejected',
    searchTerms: ['booking', 'rejected', 'shipper'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'booking-approved-consignee',
    fieldLabel: 'Booking has been approved (consignee)',
    fieldHint: 'As the consignee, receive a notification when my booking has been approved',
    searchTerms: ['booking', 'approved', 'consignee'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'booking-rejected-consignee',
    fieldLabel: 'Booking has been rejected (consignee)',
    fieldHint: 'As the consignee, receive a notification when my booking has been rejected',
    searchTerms: ['booking', 'rejected', 'consignee'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'order-messages',
    fieldLabel: 'Messages',
    fieldHint: 'Receive notifications for messages about purchase orders',
    searchTerms: ['order', 'messages', 'purchase', 'orders'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'receive-po-update-emails',
    fieldLabel: 'Receive purchase order update emails',
    searchTerms: ['purchase', 'order', 'update', 'emails', 'po'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'receive-po-summary-emails',
    fieldLabel: 'Receive purchase order summary report emails',
    searchTerms: ['purchase', 'order', 'summary', 'report', 'emails', 'po'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'unbooked-orders-report',
    fieldLabel: 'Receive report in-app',
    fieldHint: 'Receive a report that includes all unbooked orders that missed CRDs, missed must book by dates, and are upcoming.',
    searchTerms: ['unbooked', 'orders', 'report', 'crd'],
  },

  // Account Notifications - Invoicing and Billing
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'invoices-credit-memos',
    fieldLabel: 'Invoices and Credit Memos',
    searchTerms: ['invoices', 'credit', 'memos', 'invoice'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'statement-of-account',
    fieldLabel: 'Statement of Account',
    searchTerms: ['statement', 'account'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'invoice-entity-selection',
    fieldLabel: 'Which entities would you like to receive invoice emails for?',
    searchTerms: ['entities', 'invoice', 'emails'],
  },
  {
    pagePath: '/settings/account/notifications',
    pageLabel: 'Notifications',
    fieldId: 'turn-off-all-notifications',
    fieldLabel: 'Turn off all notifications',
    fieldHint: 'When notifications are turned off, you will not receive any in-app or email communications that are selected on this page. You may still receive role-based notifications.',
    searchTerms: ['turn off', 'disable', 'all', 'notifications'],
  },

  // Admin Users
  {
    pagePath: '/settings/admin/users',
    pageLabel: 'Users',
    fieldId: 'invite-email',
    fieldLabel: 'Invite by email',
    searchTerms: ['invite', 'email', 'user', 'member'],
  },

  // Network Contacts
  // Note: Table column headers and search bar placeholders are excluded

  // Network Facilities
  // Note: Table column headers and search bar placeholders are excluded
];

/**
 * Search through the index and return matching fields
 */
export function searchSettingsFields(query: string): SearchableField[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return SETTINGS_SEARCH_INDEX.filter((field) => {
    const searchableText = [
      field.fieldLabel,
      field.fieldHint,
      field.pageLabel,
      ...field.searchTerms,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

/**
 * Group search results by page
 */
export function groupSearchResultsByPage(results: SearchableField[]): Map<string, SearchableField[]> {
  const grouped = new Map<string, SearchableField[]>();
  
  for (const field of results) {
    const existing = grouped.get(field.pagePath) || [];
    grouped.set(field.pagePath, [...existing, field]);
  }
  
  return grouped;
}
