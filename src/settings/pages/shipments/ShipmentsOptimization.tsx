import React, { useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Divider,
  FieldControl,
  FieldHint,
  FieldLabel,
  FieldRow,
  Input,
  Toggle,
  VStack,
  Button,
} from '@/ui/primitives';

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 8px;
`;

const SectionDescription = styled.div`
  font-size: 12px;
  line-height: 1.35;
  color: var(--text-muted);
  margin-bottom: 16px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const InputWithSuffix = styled(Input)<{ $suffix?: string }>`
  padding-right: ${(p) => (p.$suffix ? '50px' : '10px')};
  padding-left: 10px;
  text-align: right;
`;

const InputSuffix = styled.span`
  position: absolute;
  left: calc(100% - 50px); // Fixed left position: 50px from right edge to align all suffix left edges
  font-size: 13px;
  color: var(--text-muted);
  pointer-events: none;
  white-space: nowrap;
  text-align: left; // Left-align the suffix text within its container
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

const Th = styled.th`
  text-align: left;
  color: rgba(255, 255, 255, 0.60);
  font-weight: 600;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
`;

const ContainerGroupCard = styled.div`
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  margin-bottom: 12px;
  overflow: hidden;
`;

const ContainerGroupHeader = styled.div`
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
`;

const ContainerGroupTitle = styled.div`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.88);
`;

const ContainerGroupActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SupportingLanesSection = styled.div`
  padding: 12px 16px;
  border-top: 1px solid var(--border);
  cursor: pointer;
  background: rgba(255, 255, 255, 0.01);
  
  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

const SupportingLanesTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: rgba(106, 167, 255, 0.95);
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    text-decoration: underline;
    text-decoration-color: rgba(106, 167, 255, 0.4);
    text-underline-offset: 3px;
  }
`;

const SupportingLanesList = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LaneItem = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  padding-left: 8px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.88);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioLabel = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.88);
`;

const RadioInput = styled.input`
  width: 18px;
  height: 18px;
  margin: 0;
  margin-top: 2px;
  cursor: pointer;
  accent-color: rgba(106, 167, 255, 0.45);
  flex-shrink: 0;
`;

const RadioContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RadioTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
`;

const RadioDescription = styled.div`
  font-size: 12px;
  line-height: 1.35;
  color: var(--text-muted);
`;

const ApprovalMethodSection = styled.div`
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.01);
`;

type ContainerType = {
  type: string;
  targetUtilization: string;
  loadingFactor: string;
  weightLimitation: string;
  maxPallets: string;
};

type ContainerGroup = {
  id: string;
  name: string;
  containerTypes: ContainerType[];
  supportingLanes: Array<{ origin: string; destination: string }>;
};

type PortPairing = {
  id: string;
  origin: string;
  destination: string;
};

export function ShipmentsOptimization() {
  const [optimizationRecommendations, setOptimizationRecommendations] = useState(false);
  const [approvalMethod, setApprovalMethod] = useState<'manual' | 'automated'>('manual');
  const [minimumContainerUtilization, setMinimumContainerUtilization] = useState('75');
  const [maximumDwellTime, setMaximumDwellTime] = useState('7');
  const [targetArrivalDate, setTargetArrivalDate] = useState(false);
  const [lateArrivalPenalty, setLateArrivalPenalty] = useState('7');
  const [drayageDays, setDrayageDays] = useState('7');
  
  const [portPairings, setPortPairings] = useState<PortPairing[]>([]);
  
  const [containerGroups, setContainerGroups] = useState<ContainerGroup[]>([
    {
      id: 'g1',
      name: 'Group 1',
      containerTypes: [
        {
          type: '20ft',
          targetUtilization: '85.6%',
          loadingFactor: '65.0 cbm / 75.9cbm',
          weightLimitation: '19,500 kg',
          maxPallets: '20',
        },
        {
          type: '40ft',
          targetUtilization: '85.6%',
          loadingFactor: '65.0 cbm / 75.9cbm',
          weightLimitation: '19,500 kg',
          maxPallets: '20',
        },
      ],
      supportingLanes: [
        { origin: 'Qingdao, China', destination: 'Los Angeles, CA' },
        { origin: 'Shanghai, China', destination: 'Los Angeles, CA' },
      ],
    },
    {
      id: 'g2',
      name: 'Group 2',
      containerTypes: [
        {
          type: '20ft',
          targetUtilization: '85.6%',
          loadingFactor: '65.0 cbm / 75.9cbm',
          weightLimitation: '19,500 kg',
          maxPallets: '20',
        },
        {
          type: '40ft',
          targetUtilization: '85.6%',
          loadingFactor: '65.0 cbm / 75.9cbm',
          weightLimitation: '19,500 kg',
          maxPallets: '20',
        },
        {
          type: '45ft',
          targetUtilization: '85.6%',
          loadingFactor: '65.0 cbm / 75.9cbm',
          weightLimitation: '19,500 kg',
          maxPallets: '20',
        },
        {
          type: '40ft HC',
          targetUtilization: '85.6%',
          loadingFactor: '65.0 cbm / 75.9cbm',
          weightLimitation: '19,500 kg',
          maxPallets: '20',
        },
      ],
      supportingLanes: [
        { origin: 'Qingdao, China', destination: 'Los Angeles, CA' },
        { origin: 'Shanghai, China', destination: 'Los Angeles, CA' },
        { origin: 'Yantian, China', destination: 'Los Angeles, CA' },
        { origin: 'Yantian, China', destination: 'Rotterdam, Netherlands' },
        { origin: 'Yantian, China', destination: 'Toronto, Canada' },
      ],
    },
  ]);
  
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['g2']));

  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const handleAddGroup = () => {
    const newGroup: ContainerGroup = {
      id: `g${containerGroups.length + 1}`,
      name: `Group ${containerGroups.length + 1}`,
      containerTypes: [
        {
          type: '20ft',
          targetUtilization: '85.6%',
          loadingFactor: '65.0 cbm / 75.9cbm',
          weightLimitation: '19,500 kg',
          maxPallets: '20',
        },
      ],
      supportingLanes: [],
    };
    setContainerGroups([...containerGroups, newGroup]);
  };

  const handleDeleteGroup = (groupId: string) => {
    setContainerGroups(containerGroups.filter((g) => g.id !== groupId));
  };

  const handleAddLane = () => {
    const newLane: PortPairing = {
      id: `lane${portPairings.length + 1}`,
      origin: '',
      destination: '',
    };
    setPortPairings([...portPairings, newLane]);
  };

  return (
    <SettingsPageLayout 
      title="Optimization" 
      subtitle="Optimization policy used for suggested routing and mode decisions."
    >
      <VStack $gap={14}>
        {/* Optimization Section */}
        <Card>
          <CardHeader>
            <CardTitle>Optimization</CardTitle>
          </CardHeader>
          <CardBody>
            <SectionDescription>
              Set maximum wait times at origin to prevent cargo from sitting too long before departure.
            </SectionDescription>
          </CardBody>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Optimization recommendations</FieldLabel>
                <FieldHint>
                  When enabled, this will generate consolidation recommendations and overrule your Buyer Consolidation(BC) approval settings.
                </FieldHint>
              </div>
              <FieldControl>
                <Toggle 
                  checked={optimizationRecommendations} 
                  onChange={setOptimizationRecommendations} 
                  aria-label="Optimization recommendations" 
                />
              </FieldControl>
            </FieldRow>
            {optimizationRecommendations && (
              <>
                <Divider />
                <ApprovalMethodSection>
                  <FieldLabel style={{ marginBottom: 12 }}>Approval method</FieldLabel>
                  <RadioGroup>
                    <RadioLabel $checked={approvalMethod === 'manual'}>
                      <RadioInput
                        type="radio"
                        name="approvalMethod"
                        value="manual"
                        checked={approvalMethod === 'manual'}
                        onChange={(e) => setApprovalMethod(e.target.value as 'manual' | 'automated')}
                      />
                      <RadioContent>
                        <RadioTitle>Manual approval</RadioTitle>
                        <RadioDescription>
                          All recommendations require manual approval via your Task List prior to modifying any shipments.
                        </RadioDescription>
                      </RadioContent>
                    </RadioLabel>
                    <RadioLabel $checked={approvalMethod === 'automated'}>
                      <RadioInput
                        type="radio"
                        name="approvalMethod"
                        value="automated"
                        checked={approvalMethod === 'automated'}
                        onChange={(e) => setApprovalMethod(e.target.value as 'manual' | 'automated')}
                      />
                      <RadioContent>
                        <RadioTitle>Automated approval</RadioTitle>
                        <RadioDescription>
                          Flexport optimizes and automatically ships all consolidation load plans based on your configurations. All shipments that do not meet the utilization thresholds within the shipping window tolerances will require manual approval.
                        </RadioDescription>
                      </RadioContent>
                    </RadioLabel>
                  </RadioGroup>
                </ApprovalMethodSection>
              </>
            )}
          </CardBody>
        </Card>

        {/* Approval Thresholds Section */}
        <Card>
          <CardHeader>
            <CardTitle>Approval Thresholds</CardTitle>
          </CardHeader>
          <CardBody>
            <SectionDescription>
              Set maximum wait times at origin to prevent cargo from sitting too long before departure.
            </SectionDescription>
          </CardBody>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Minimum container utilization before approval</FieldLabel>
                <FieldHint>
                  Set the minimum container capacity required for automatic approval. Shipments under this utilization threshold will require manual review
                </FieldHint>
              </div>
              <FieldControl>
                <InputWrapper>
                  <InputWithSuffix
                    type="text"
                    value={minimumContainerUtilization}
                    onChange={(e) => setMinimumContainerUtilization(e.target.value)}
                    placeholder="Placeholder"
                    $suffix="%"
                    aria-label="Minimum container utilization"
                  />
                  <InputSuffix>%</InputSuffix>
                </InputWrapper>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Maximum dwell time before approval</FieldLabel>
                <FieldHint>
                  Specify the maximum days cargo can wait at origin for automatic approval. Shipments exceeding this dwell time will require manual review.
                </FieldHint>
              </div>
              <FieldControl>
                <InputWrapper>
                  <InputWithSuffix
                    type="text"
                    value={maximumDwellTime}
                    onChange={(e) => setMaximumDwellTime(e.target.value)}
                    placeholder="Placeholder"
                    $suffix="days"
                    aria-label="Maximum dwell time"
                  />
                  <InputSuffix>days</InputSuffix>
                </InputWrapper>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        {/* Supported Lanes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Supported Lanes</CardTitle>
          </CardHeader>
          <CardBody>
            <SectionDescription>
              Set maximum wait times at origin to prevent cargo from sitting too long before departure.
            </SectionDescription>
          </CardBody>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Port Pairings</FieldLabel>
                <FieldHint>
                  Only shipments moving along these allowed pairs will be eligible for optimization.
                </FieldHint>
              </div>
              <FieldControl>
                <Button $variant="primary" onClick={handleAddLane}>
                  Add lane
                </Button>
              </FieldControl>
            </FieldRow>
            {portPairings.length > 0 && (
              <>
                <Divider />
                {portPairings.map((lane) => (
                  <div key={lane.id} style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {lane.origin || 'Origin'} → {lane.destination || 'Destination'}
                    </div>
                  </div>
                ))}
              </>
            )}
          </CardBody>
        </Card>

        {/* Container Groups Section */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <CardTitle>Container Groups</CardTitle>
              <Button $variant="primary" onClick={handleAddGroup}>
                Add group
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <SectionTitle>Group Settings</SectionTitle>
            <SectionDescription>
              Configure physical capacity limits and equipment types to ensure automated load plans remain within the practical volume and weight constraints of your chosen lanes.
            </SectionDescription>
          </CardBody>
          <CardBody style={{ padding: 0 }}>
            {containerGroups.map((group) => (
              <ContainerGroupCard key={group.id}>
                <ContainerGroupHeader>
                  <ContainerGroupTitle>{group.name}</ContainerGroupTitle>
                  <ContainerGroupActions>
                    <Button $variant="ghost" onClick={() => {}}>
                      Edit
                    </Button>
                    <IconButton onClick={() => handleDeleteGroup(group.id)} aria-label={`Delete ${group.name}`}>
                      ×
                    </IconButton>
                  </ContainerGroupActions>
                </ContainerGroupHeader>
                <div style={{ overflowX: 'auto' }}>
                  <Table>
                    <thead>
                      <tr>
                        <Th style={{ width: '120px' }}>Container Type</Th>
                        <Th>Target utilization</Th>
                        <Th>Loading factor</Th>
                        <Th>Weight limitation</Th>
                        <Th>Max No. Pallets</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.containerTypes.map((container, idx) => (
                        <tr key={idx}>
                          <Td>{container.type}</Td>
                          <Td>{container.targetUtilization}</Td>
                          <Td>{container.loadingFactor}</Td>
                          <Td>{container.weightLimitation}</Td>
                          <Td>{container.maxPallets}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                {group.supportingLanes.length > 0 && (
                  <SupportingLanesSection onClick={() => toggleGroupExpansion(group.id)}>
                    <SupportingLanesTitle>
                      Supporting Lanes ({group.supportingLanes.length})
                    </SupportingLanesTitle>
                    {expandedGroups.has(group.id) && (
                      <SupportingLanesList>
                        {group.supportingLanes.map((lane, idx) => (
                          <LaneItem key={idx}>
                            {lane.origin} → {lane.destination}
                          </LaneItem>
                        ))}
                      </SupportingLanesList>
                    )}
                  </SupportingLanesSection>
                )}
              </ContainerGroupCard>
            ))}
          </CardBody>
        </Card>

        {/* Delivery Constraints Section */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Constraints</CardTitle>
          </CardHeader>
          <CardBody>
            <SectionDescription>
              Define the boundaries for timing, delays, and deadlines.
            </SectionDescription>
            <SectionDescription style={{ marginTop: 8 }}>
              Set maximum wait times at origin to prevent cargo from sitting too long before departure.
            </SectionDescription>
          </CardBody>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Target arrival date</FieldLabel>
                <FieldHint>
                  Specify whether Flexport must respect your required arrival dates to ensure that optimization opportunities do not cause shipments to deliver past their deadlines.
                </FieldHint>
              </div>
              <FieldControl>
                <Toggle 
                  checked={targetArrivalDate} 
                  onChange={setTargetArrivalDate} 
                  aria-label="Target arrival date" 
                />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Late arrival penalty per day</FieldLabel>
                <FieldHint>
                  Set the daily cost for late arrivals to let the algorithm weigh potential penalties against consolidation savings.
                </FieldHint>
              </div>
              <FieldControl>
                <InputWrapper>
                  <InputWithSuffix
                    type="text"
                    value={lateArrivalPenalty}
                    onChange={(e) => setLateArrivalPenalty(e.target.value)}
                    placeholder="Placeholder"
                    $suffix="days"
                    aria-label="Late arrival penalty per day"
                  />
                  <InputSuffix>days</InputSuffix>
                </InputWrapper>
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Drayage days from Port to Destination</FieldLabel>
                <FieldHint>
                  Specify the number of days required for inland transport from the arrival port to the final destination to ensure the algorithm accurately calculates the total transit time.
                </FieldHint>
              </div>
              <FieldControl>
                <InputWrapper>
                  <InputWithSuffix
                    type="text"
                    value={drayageDays}
                    onChange={(e) => setDrayageDays(e.target.value)}
                    placeholder="Placeholder"
                    $suffix="days"
                    aria-label="Drayage days from Port to Destination"
                  />
                  <InputSuffix>days</InputSuffix>
                </InputWrapper>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}
