import React, { Suspense, lazy } from 'react';
import '@ffa/latitude-typescript';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SettingsShell } from './settings/SettingsShell';

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const AccountNotifications = lazy(() => import('./settings/pages/account/AccountNotifications').then(module => ({ default: module.AccountNotifications })));
const AccountPermission = lazy(() => import('./settings/pages/account/AccountPermission').then(module => ({ default: module.AccountPermission })));
const AccountProfile = lazy(() => import('./settings/pages/account/AccountProfile').then(module => ({ default: module.AccountProfile })));
const AccountSecurity = lazy(() => import('./settings/pages/account/AccountSecurity').then(module => ({ default: module.AccountSecurity })));
const AdminBilling = lazy(() => import('./settings/pages/admin/AdminBilling').then(module => ({ default: module.AdminBilling })));
const AdminCompany = lazy(() => import('./settings/pages/admin/AdminCompany').then(module => ({ default: module.AdminCompany })));
const AdminErpIntegrations = lazy(() => import('./settings/pages/admin/AdminErpIntegrations').then(module => ({ default: module.AdminErpIntegrations })));
const AdminLegalEntities = lazy(() => import('./settings/pages/admin/AdminLegalEntities').then(module => ({ default: module.AdminLegalEntities })));
const AdminNotifications = lazy(() => import('./settings/pages/admin/AdminNotifications').then(module => ({ default: module.AdminNotifications })));
const AdminUsers = lazy(() => import('./settings/pages/admin/AdminUsers').then(module => ({ default: module.AdminUsers })));
const AdminAPI = lazy(() => import('./settings/pages/admin/AdminAPI').then(module => ({ default: module.AdminAPI })));
const AdminSecurity = lazy(() => import('./settings/pages/admin/AdminSecurity').then(module => ({ default: module.AdminSecurity })));
const AdminAI = lazy(() => import('./settings/pages/admin/AdminAI').then(module => ({ default: module.AdminAI })));
const NetworkOrganizations = lazy(() => import('./settings/pages/network/NetworkOrganizations').then(module => ({ default: module.NetworkOrganizations })));
const NetworkContacts = lazy(() => import('./settings/pages/network/NetworkContacts').then(module => ({ default: module.NetworkContacts })));
const NetworkFacilities = lazy(() => import('./settings/pages/network/NetworkFacilities').then(module => ({ default: module.NetworkFacilities })));
const NetworkCarriers = lazy(() => import('./settings/pages/network/NetworkCarriers').then(module => ({ default: module.NetworkCarriers })));
const NetworkLocations = lazy(() => import('./settings/pages/network/NetworkLocations').then(module => ({ default: module.NetworkLocations })));
const NetworkPartners = lazy(() => import('./settings/pages/network/NetworkPartners').then(module => ({ default: module.NetworkPartners })));
const NetworkPortsLanes = lazy(() => import('./settings/pages/network/NetworkPortsLanes').then(module => ({ default: module.NetworkPortsLanes })));
const NetworkSuppliers = lazy(() => import('./settings/pages/network/NetworkSuppliers').then(module => ({ default: module.NetworkSuppliers })));
const ShipmentsCapital = lazy(() => import('./settings/pages/shipments/ShipmentsCapital').then(module => ({ default: module.ShipmentsCapital })));
const ShipmentsOptimization = lazy(() => import('./settings/pages/shipments/ShipmentsOptimization').then(module => ({ default: module.ShipmentsOptimization })));
const ShipmentsPreferences = lazy(() => import('./settings/pages/shipments/ShipmentsPreferences').then(module => ({ default: module.ShipmentsPreferences })));
const ShipmentsBuyersConsolidation = lazy(() => import('./settings/pages/shipments/ShipmentsBuyersConsolidation').then(module => ({ default: module.ShipmentsBuyersConsolidation })));

/**
 * Main App component for the UX Proto Playground
 * 
 * This is a starter template for creating prototypes using
 * the Latitude TypeScript UI library.
 * 
 * For detailed usage instructions, refer to:
 * https://flexport.atlassian.net/wiki/x/agBo3
 */
// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    fontSize: '16px',
    color: '#666'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/settings" element={<SettingsShell />}>
          <Route index element={<Navigate to="/settings/account/profile" replace />} />

          <Route path="account/profile" element={<AccountProfile />} />
          <Route path="account/permission" element={<AccountPermission />} />
          <Route path="account/notifications" element={<AccountNotifications />} />
          <Route path="account/security" element={<AccountSecurity />} />

          <Route path="shipments/preferences" element={<ShipmentsPreferences />} />
          <Route path="shipments/buyers-consolidation" element={<ShipmentsBuyersConsolidation />} />
          <Route path="shipments/sbuyer-consolidation" element={<Navigate to="/settings/shipments/buyers-consolidation" replace />} />
          <Route path="shipments/optimization" element={<ShipmentsOptimization />} />
          <Route path="shipments/soptimization" element={<Navigate to="/settings/shipments/optimization" replace />} />
          <Route path="shipments/capital" element={<ShipmentsCapital />} />
          <Route path="shipments/scapital" element={<Navigate to="/settings/shipments/capital" replace />} />

          <Route path="network/organizations" element={<NetworkOrganizations />} />
          <Route path="network/contacts" element={<NetworkContacts />} />
          <Route path="network/facilities" element={<NetworkFacilities />} />
          <Route path="network/trade-lanes" element={<NetworkPortsLanes />} />
          <Route path="network/ports-lanes" element={<Navigate to="/settings/network/trade-lanes" replace />} />
          <Route path="network/locations" element={<NetworkLocations />} />
          <Route path="network/suppliers" element={<NetworkSuppliers />} />
          <Route path="network/carriers" element={<NetworkCarriers />} />
          <Route path="network/partners" element={<NetworkPartners />} />

          <Route path="admin/company" element={<AdminCompany />} />
          <Route path="admin/legal-entities" element={<AdminLegalEntities />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/notifications" element={<AdminNotifications />} />
          <Route path="admin/erp-integrations" element={<AdminErpIntegrations />} />
          <Route path="admin/api" element={<AdminAPI />} />
          <Route path="admin/ai" element={<AdminAI />} />
          <Route path="admin/billing" element={<AdminBilling />} />
          <Route path="admin/security" element={<AdminSecurity />} />

          <Route path="*" element={<Navigate to="/settings/account/profile" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;

