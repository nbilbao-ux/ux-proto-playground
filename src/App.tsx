import React from 'react';
import '@ffa/latitude-typescript';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SettingsShell } from './settings/SettingsShell';
import { AccountNotifications } from './settings/pages/account/AccountNotifications';
import { AccountPermission } from './settings/pages/account/AccountPermission';
import { AccountProfile } from './settings/pages/account/AccountProfile';
import { AccountSecurity } from './settings/pages/account/AccountSecurity';
import { AdminBilling } from './settings/pages/admin/AdminBilling';
import { AdminCompany } from './settings/pages/admin/AdminCompany';
import { AdminErpIntegrations } from './settings/pages/admin/AdminErpIntegrations';
import { AdminLegalEntities } from './settings/pages/admin/AdminLegalEntities';
import { AdminNotifications } from './settings/pages/admin/AdminNotifications';
import { AdminUsers } from './settings/pages/admin/AdminUsers';
import { AdminWebhooks } from './settings/pages/admin/AdminWebhooks';
import { NetworkOrganizations } from './settings/pages/network/NetworkOrganizations';
import { NetworkContacts } from './settings/pages/network/NetworkContacts';
import { NetworkFacilities } from './settings/pages/network/NetworkFacilities';
import { NetworkCarriers } from './settings/pages/network/NetworkCarriers';
import { NetworkLocations } from './settings/pages/network/NetworkLocations';
import { NetworkPartners } from './settings/pages/network/NetworkPartners';
import { NetworkPortsLanes } from './settings/pages/network/NetworkPortsLanes';
import { NetworkSuppliers } from './settings/pages/network/NetworkSuppliers';
import { ShipmentsCapital } from './settings/pages/shipments/ShipmentsCapital';
import { ShipmentsOptimization } from './settings/pages/shipments/ShipmentsOptimization';
import { ShipmentsPreferences } from './settings/pages/shipments/ShipmentsPreferences';
import { ShipmentsBuyersConsolidation } from './settings/pages/shipments/ShipmentsBuyersConsolidation';

/**
 * Main App component for the UX Proto Playground
 * 
 * This is a starter template for creating prototypes using
 * the Latitude TypeScript UI library.
 * 
 * For detailed usage instructions, refer to:
 * https://flexport.atlassian.net/wiki/x/agBo3
 */
function App() {
  return (
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
        <Route path="network/ports-lanes" element={<NetworkPortsLanes />} />
        <Route path="network/locations" element={<NetworkLocations />} />
        <Route path="network/suppliers" element={<NetworkSuppliers />} />
        <Route path="network/carriers" element={<NetworkCarriers />} />
        <Route path="network/partners" element={<NetworkPartners />} />

        <Route path="admin/company" element={<AdminCompany />} />
        <Route path="admin/legal-entities" element={<AdminLegalEntities />} />
        <Route path="admin/users" element={<AdminUsers />} />
        <Route path="admin/notifications" element={<AdminNotifications />} />
        <Route path="admin/erp-integrations" element={<AdminErpIntegrations />} />
        <Route path="admin/webhooks" element={<AdminWebhooks />} />
        <Route path="admin/billing" element={<AdminBilling />} />

        <Route path="*" element={<Navigate to="/settings/account/profile" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

