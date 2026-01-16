import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DrillDownView } from '@/settings/components/DrillDownView';
import { Input, Select, FieldRow, FieldLabel, FieldHint, FieldControl, Divider, Toggle } from '@/ui/primitives';

export type ConsolidationRule = { 
  id: string; 
  name: string; 
  match: string;
  behavior: string;
  enabled: boolean;
};

export interface ConsolidationRuleFormProps {
  rule?: ConsolidationRule;
  onSubmit: (ruleData: Omit<ConsolidationRule, 'id'>) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

const behaviorOptions = [
  'Consolidate within 3 days',
  'Consolidate within 5 days',
  'Consolidate within 7 days',
  'Consolidate within 14 days',
  'Never consolidate',
];

export function ConsolidationRuleForm({ 
  rule, 
  onSubmit, 
  onCancel, 
  onDelete,
  isLoading = false 
}: ConsolidationRuleFormProps) {
  const [name, setName] = useState('');
  const [match, setMatch] = useState('');
  const [behavior, setBehavior] = useState('Consolidate within 7 days');
  const [enabled, setEnabled] = useState(true);

  const isEdit = !!rule;

  useEffect(() => {
    if (rule) {
      setName(rule.name);
      setMatch(rule.match);
      setBehavior(rule.behavior);
      setEnabled(rule.enabled);
    }
  }, [rule]);

  const handleSubmit = () => {
    onSubmit({
      name: name.trim(),
      match: match.trim(),
      behavior: behavior.trim(),
      enabled,
    });
  };

  const handleDelete = () => {
    if (rule && onDelete) {
      onDelete(rule.id);
    }
  };

  const canSubmit = name.trim().length > 0 && match.trim().length > 0;

  return (
    <DrillDownView
      backLinkText="< Buyer's Consolidation"
      backPath="/settings/shipments/buyers-consolidation"
      title={isEdit ? rule.name : 'New consolidation rule'}
      submitLabel={isEdit ? 'Update' : 'Create'}
      isLoading={isLoading}
      isSubmitDisabled={!canSubmit}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      onDelete={isEdit ? handleDelete : undefined}
    >
      <FieldRow>
        <div>
          <FieldLabel>Name</FieldLabel>
        </div>
        <FieldControl>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter rule name"
            autoFocus
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Match condition</FieldLabel>
          <FieldHint>Define when this rule applies (e.g., supplierId + shipTo, category=apparel, value {'>'} $250k)</FieldHint>
        </div>
        <FieldControl>
          <Input
            type="text"
            value={match}
            onChange={(e) => setMatch(e.target.value)}
            placeholder="e.g., supplierId + shipTo"
          />
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Behavior</FieldLabel>
        </div>
        <FieldControl>
          <Select value={behavior} onChange={(e) => setBehavior(e.target.value)}>
            {behaviorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FieldControl>
      </FieldRow>

      <Divider />

      <FieldRow>
        <div>
          <FieldLabel>Enabled</FieldLabel>
          <FieldHint>Toggle to enable or disable this rule</FieldHint>
        </div>
        <FieldControl>
          <Toggle
            checked={enabled}
            onChange={setEnabled}
            aria-label="Rule enabled"
          />
        </FieldControl>
      </FieldRow>
    </DrillDownView>
  );
}
