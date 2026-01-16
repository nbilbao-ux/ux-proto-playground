import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Divider, FieldControl, FieldHint, FieldLabel, FieldRow, Modal } from '@/ui/primitives';

const FieldTitle = styled.div`
  font-size: 13px;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 8px;
`;

const FieldStatus = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.60);
`;

interface SettingsFieldButtonProps {
  title: string;
  status?: string;
  hint?: string;
  buttonLabel: React.ReactNode;
  buttonVariant?: 'primary' | 'ghost' | 'danger';
  modalTitle: string;
  modalContent: React.ReactNode | ((onClose: () => void) => React.ReactNode);
  modalFooter?: React.ReactNode | ((onClose: () => void) => React.ReactNode);
  onButtonClick?: () => void;
  showDivider?: boolean;
}

export function SettingsFieldButton({
  title,
  status,
  hint,
  buttonLabel,
  buttonVariant = 'ghost',
  modalTitle,
  modalContent,
  modalFooter,
  onButtonClick,
  showDivider = true,
}: SettingsFieldButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <FieldRow>
        <div>
          <FieldTitle>{title}</FieldTitle>
          {status && <FieldStatus>{status}</FieldStatus>}
          {hint && <FieldHint>{hint}</FieldHint>}
        </div>
        <FieldControl>
          <Button 
            $variant={buttonVariant} 
            onClick={handleButtonClick}
            style={React.isValidElement(buttonLabel) 
              ? { display: 'flex', alignItems: 'center', gap: '8px' } 
              : undefined}
          >
            {buttonLabel}
          </Button>
        </FieldControl>
      </FieldRow>
      {showDivider && <Divider />}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={modalTitle}
        footer={typeof modalFooter === 'function' ? modalFooter(handleClose) : modalFooter}
      >
        {typeof modalContent === 'function' ? modalContent(handleClose) : modalContent}
      </Modal>
    </>
  );
}
