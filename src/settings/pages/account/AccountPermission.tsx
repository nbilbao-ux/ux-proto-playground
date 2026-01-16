import React, { useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { useFieldHighlight } from '@/settings/useFieldHighlight';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Checkbox,
  Divider,
  FieldControl,
  FieldHint,
  FieldLabel,
  FieldRow,
  Input,
  Toggle,
  VStack,
} from '@/ui/primitives';

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioLabel = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.88);
`;

const RadioInput = styled.input`
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;
  accent-color: rgba(106, 167, 255, 0.45);
`;

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 8px;
`;

const SearchContainer = styled.div`
  margin-top: 12px;
`;

export function AccountPermission() {
  const [shipmentAccess, setShipmentAccess] = useState<'all' | 'custom'>('all');
  const [allowWarehouseReceiving, setAllowWarehouseReceiving] = useState(true);
  const [defaultReadOnlyAppointments, setDefaultReadOnlyAppointments] = useState(false);
  const [searchLocations, setSearchLocations] = useState('');
  const [allowDemurrageDetention, setAllowDemurrageDetention] = useState(false);
  
  // Field highlight refs
  const shipmentAccessRef = useFieldHighlight('shipment-access');
  const warehouseReceivingRef = useFieldHighlight('warehouse-receiving');
  const readOnlyAppointmentsRef = useFieldHighlight('read-only-appointments');
  const searchLocationsRef = useFieldHighlight('search-locations');
  const demurrageDetentionRef = useFieldHighlight('demurrage-detention');

  return (
    <SettingsPageLayout
      title="Permission"
      subtitle="Control how your account is allowed to interact with company data and APIs."
    >
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
          </CardHeader>
          <CardBody>
            <FieldHint style={{ marginBottom: 16 }}>
              Sharon will only have access to shipments an admin has defined here
            </FieldHint>
            <div ref={shipmentAccessRef}>
              <FieldLabel style={{ marginBottom: 12 }}>Give Sharon access to</FieldLabel>
              <RadioGroup>
                <RadioLabel $checked={shipmentAccess === 'all'}>
                  <RadioInput
                    type="radio"
                    name="shipmentAccess"
                    value="all"
                    checked={shipmentAccess === 'all'}
                    onChange={(e) => setShipmentAccess(e.target.value as 'all' | 'custom')}
                  />
                  All shipments within my organization
                </RadioLabel>
                <RadioLabel $checked={shipmentAccess === 'custom'}>
                  <RadioInput
                    type="radio"
                    name="shipmentAccess"
                    value="custom"
                    checked={shipmentAccess === 'custom'}
                    onChange={(e) => setShipmentAccess(e.target.value as 'all' | 'custom')}
                  />
                  A custom set of shipments within my organization
                </RadioLabel>
              </RadioGroup>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Warehouse Receiving Permissions</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow ref={warehouseReceivingRef}>
              <div>
                <FieldLabel>Allow access to Warehouse Receiving</FieldLabel>
              </div>
              <FieldControl>
                <Toggle
                  checked={allowWarehouseReceiving}
                  onChange={setAllowWarehouseReceiving}
                  aria-label="Allow access to Warehouse Receiving"
                />
              </FieldControl>
            </FieldRow>
            {allowWarehouseReceiving && (
              <>
                <Divider />
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
                  <SectionTitle>Default Permissions for newly added warehouses</SectionTitle>
                </div>
                <FieldRow ref={readOnlyAppointmentsRef}>
                  <div>
                    <FieldLabel>Read-only access to the appointments</FieldLabel>
                  </div>
                  <FieldControl>
                    <Toggle
                      checked={defaultReadOnlyAppointments}
                      onChange={setDefaultReadOnlyAppointments}
                      aria-label="Read-only access to the appointments"
                    />
                  </FieldControl>
                </FieldRow>
                <Divider />
                <div style={{ padding: '12px 16px' }} ref={searchLocationsRef}>
                  <SectionTitle>Allow access to following warehouses</SectionTitle>
                  <SearchContainer>
                    <Input
                      type="text"
                      placeholder="Search locations"
                      value={searchLocations}
                      onChange={(e) => setSearchLocations(e.target.value)}
                      aria-label="Search locations"
                    />
                  </SearchContainer>
                </div>
              </>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demurrage & Detention Permissions</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow ref={demurrageDetentionRef}>
              <div>
                <FieldLabel>Allow access to Demurrage & Detention data</FieldLabel>
              </div>
              <FieldControl>
                <Toggle
                  checked={allowDemurrageDetention}
                  onChange={setAllowDemurrageDetention}
                  aria-label="Allow access to Demurrage & Detention data"
                />
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

