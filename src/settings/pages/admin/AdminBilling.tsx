import React, { useState } from 'react';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardBody, CardHeader, CardTitle, Divider, FieldControl, FieldHint, FieldLabel, FieldRow, Input, Select, Tag, VStack } from '@/ui/primitives';

export function AdminBilling() {
  const [plan, setPlan] = useState('enterprise');
  const [poNumber, setPoNumber] = useState('PO-10421');
  const [paymentMethod, setPaymentMethod] = useState('invoice');

  return (
    <SettingsPageLayout title="Billing" subtitle="Plan, invoices, and payment configuration for the workspace.">
      <VStack $gap={14}>
        <Card>
          <CardHeader>
            <CardTitle>Plan</CardTitle>
            <Tag tone="accent">Enterprise</Tag>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Current plan</FieldLabel>
                <FieldHint>Controls product access and support tier</FieldHint>
              </div>
              <FieldControl>
                <Select value={plan} onChange={(e) => setPlan(e.target.value)} aria-label="Plan">
                  <option value="enterprise">Enterprise</option>
                  <option value="growth">Growth</option>
                  <option value="starter">Starter</option>
                </Select>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>PO number</FieldLabel>
                <FieldHint>Displayed on invoices and exports</FieldHint>
              </div>
              <FieldControl>
                <Input value={poNumber} onChange={(e) => setPoNumber(e.target.value)} aria-label="PO number" />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Payment method</FieldLabel>
                <FieldHint>How invoices are paid</FieldHint>
              </div>
              <FieldControl>
                <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} aria-label="Payment method">
                  <option value="invoice">Invoice (net terms)</option>
                  <option value="card">Card</option>
                  <option value="ach">ACH</option>
                </Select>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <Button $variant="ghost">Download invoices</Button>
              <Button $variant="primary">Contact billing</Button>
            </div>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}

