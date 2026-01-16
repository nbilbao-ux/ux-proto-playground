import React, { useState, useEffect } from 'react';
import { Button, FieldControl, FieldHint, FieldLabel, FieldRow, Input, Modal, Select, Toggle, VStack } from '@/ui/primitives';
import { validateAddress } from '../services/matchingService';
import { facilityService, organizationService } from '../services/entityService';
import type { Facility, Organization, FacilityType, PhysicalLocation, AddressCandidate } from '../types';

interface AddFacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (facility: Facility) => void;
  defaultOrganizationId?: string;
}

export function AddFacilityModal({
  isOpen,
  onClose,
  onSuccess,
  defaultOrganizationId,
}: AddFacilityModalProps) {
  const [step, setStep] = useState<'form' | 'address'>('form');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [addressCandidates, setAddressCandidates] = useState<AddressCandidate[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<PhysicalLocation | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  // Form state
  const [name, setName] = useState('');
  const [type, setType] = useState<FacilityType>('warehouse');
  const [organizationId, setOrganizationId] = useState(defaultOrganizationId || '');
  const [ownershipType, setOwnershipType] = useState<'owned' | 'leased' | 'third_party'>('owned');

  // Address state
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      const orgs = await organizationService.getAll();
      setOrganizations(orgs);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleValidateAddress = async () => {
    if (!addressLine1.trim() && !city.trim() && !country.trim()) {
      // No address provided, skip validation
      await createFacility();
      return;
    }

    setValidating(true);
    setStep('address');

    try {
      const candidates = await validateAddress({
        addressLine1,
        city,
        state,
        postalCode,
        country,
      });

      setAddressCandidates(candidates);

      // If no candidates or single high-confidence candidate, auto-select
      if (candidates.length === 0) {
        await createFacility();
      } else if (candidates.length === 1 && candidates[0].confidence >= 90) {
        setSelectedAddress(candidates[0].physicalLocation);
        await createFacility();
      }
    } catch (error) {
      console.error('Address validation error:', error);
    } finally {
      setValidating(false);
    }
  };

  const handleSelectAddress = (location: PhysicalLocation) => {
    setSelectedAddress(location);
    createFacility();
  };

  const handleSubmit = async () => {
    if (!name.trim() || !organizationId) return;
    await handleValidateAddress();
  };

  const createFacility = async () => {
    setLoading(true);

    try {
      const newFacility = await facilityService.create({
        name,
        type,
        organizationId,
        physicalLocationId: selectedAddress?.id,
        physicalLocation: selectedAddress || undefined,
        ownershipType,
        matchStatus: selectedAddress ? 'matched' : 'unlinked',
        verificationStatus: selectedAddress ? 'verified' : 'unverified',
      });

      onSuccess(newFacility);
      handleClose();
    } catch (error) {
      console.error('Create error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('form');
    setName('');
    setType('warehouse');
    setOrganizationId(defaultOrganizationId || '');
    setOwnershipType('owned');
    setAddressLine1('');
    setCity('');
    setState('');
    setPostalCode('');
    setCountry('');
    setAddressCandidates([]);
    setSelectedAddress(null);
    setValidating(false);
    setLoading(false);
    onClose();
  };

  const footer = step === 'form' ? (
    <>
      <Button $variant="ghost" onClick={handleClose} disabled={loading}>
        Cancel
      </Button>
      <Button
        $variant="primary"
        onClick={handleSubmit}
        disabled={loading || !name.trim() || !organizationId}
      >
        {loading ? 'Processing...' : 'Continue'}
      </Button>
    </>
  ) : (
    <>
      <Button $variant="ghost" onClick={() => setStep('form')} disabled={loading}>
        Back
      </Button>
      <Button
        $variant="ghost"
        onClick={createFacility}
        disabled={loading}
      >
        Skip
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        step === 'form'
          ? 'Add Facility'
          : 'Validate Address'
      }
      footer={footer}
    >
      {step === 'form' ? (
        <VStack $gap={16}>
          <FieldRow>
            <div>
              <FieldLabel>Facility name *</FieldLabel>
            </div>
            <FieldControl>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="LA Warehouse"
                aria-label="Facility name"
              />
            </FieldControl>
          </FieldRow>

          <FieldRow>
            <div>
              <FieldLabel>Type *</FieldLabel>
            </div>
            <FieldControl>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value as FacilityType)}
                aria-label="Facility type"
              >
                <option value="warehouse">Warehouse</option>
                <option value="distribution_center">Distribution Center</option>
                <option value="office">Office</option>
                <option value="yard">Yard</option>
                <option value="terminal">Terminal</option>
                <option value="port">Port</option>
              </Select>
            </FieldControl>
          </FieldRow>

          <FieldRow>
            <div>
              <FieldLabel>Organization *</FieldLabel>
            </div>
            <FieldControl>
              <Select
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                aria-label="Organization"
              >
                <option value="">Select organization</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </Select>
            </FieldControl>
          </FieldRow>

          <FieldRow>
            <div>
              <FieldLabel>Ownership</FieldLabel>
              <FieldHint>How this facility is owned or operated</FieldHint>
            </div>
            <FieldControl>
              <Select
                value={ownershipType}
                onChange={(e) => setOwnershipType(e.target.value as 'owned' | 'leased' | 'third_party')}
                aria-label="Ownership type"
              >
                <option value="owned">Owned</option>
                <option value="leased">Leased</option>
                <option value="third_party">Third Party</option>
              </Select>
            </FieldControl>
          </FieldRow>

          <FieldRow>
            <div>
              <FieldLabel>Address</FieldLabel>
              <FieldHint>Optional - will be validated and normalized</FieldHint>
            </div>
            <FieldControl>
              <VStack $gap={8}>
                <Input
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Street address"
                  aria-label="Address line 1"
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    style={{ flex: 1 }}
                    aria-label="City"
                  />
                  <Input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State/Province"
                    style={{ flex: 1 }}
                    aria-label="State"
                  />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Input
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postal code"
                    style={{ flex: 1 }}
                    aria-label="Postal code"
                  />
                  <Input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    style={{ flex: 1 }}
                    aria-label="Country"
                  />
                </div>
              </VStack>
            </FieldControl>
          </FieldRow>
        </VStack>
      ) : step === 'address' ? (
        <VStack $gap={12}>
          {validating ? (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>
              Validating address...
            </div>
          ) : addressCandidates.length === 0 ? (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>
              No address matches found. Facility will be created with provided address.
            </div>
          ) : (
            <>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
                Found {addressCandidates.length} address candidate{addressCandidates.length !== 1 ? 's' : ''}:
              </div>
              {addressCandidates.map((candidate, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 12,
                    background: selectedAddress?.id === candidate.physicalLocation.id
                      ? 'rgba(106,167,255,0.08)'
                      : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${
                      selectedAddress?.id === candidate.physicalLocation.id
                        ? 'rgba(106,167,255,0.45)'
                        : 'var(--border)'
                    }`,
                    borderRadius: 8,
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSelectAddress(candidate.physicalLocation)}
                >
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    {candidate.normalizedAddress}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {candidate.confidence}% confidence
                  </div>
                </div>
              ))}
            </>
          )}
        </VStack>
      ) : null}
    </Modal>
  );
}
