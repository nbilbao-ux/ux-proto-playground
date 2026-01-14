import { Translations } from './translations';

export interface ConversationStep {
  agent: string;
  type: 'text' | 'select' | 'confirm' | 'system' | 'error';
  field?: string;
  preFilledField?: string;
  options?: string[];
  isPassword?: boolean;
  errorType?: 'missingField' | 'invalidFormat' | 'duplicateCompany' | 'serverTimeout';
  errorFieldName?: string;
  errorCompanyName?: string;
}

/**
 * Conversation Script for Flexport Supplier Onboarding
 * 
 * This script defines the step-by-step conversational flow between the AI agent
 * and the supplier during the onboarding process. The conversation is designed
 * to feel natural and guide suppliers through registration without feeling like
 * they're filling out a complex form.
 * 
 * Flow Overview:
 * 1. Welcome & Start Confirmation
 * 2. Stage 1: Company Information Collection (Page 1)
 * 3. Stage 2: Primary Contact Information Collection (Page 2)
 * 4. Validation & Completion
 */
export const getConversationScript = (t: Translations): ConversationStep[] => [
  // Step 1: Welcome Message
  // AI Agent introduces itself and asks if supplier wants to start registration
  {
    agent: t.conversation.welcome,
    type: 'confirm',
    options: t.conversation.startOptions
  },
  
  // Stage 1: Company Information Collection (Page 1)
  // Step 2: Country/Region
  {
    agent: t.conversation.country,
    field: 'country',
    type: 'text'
  },
  
  // Step 3: Company Name (Local Language)
  // Note: Backend validation should check for duplicate entities here
  {
    agent: t.conversation.companyName,
    field: 'companyName',
    type: 'text'
  },
  
  // Step 4: Company Name (English) - Pre-filled from invitation metadata
  // Agent explains this is auto-generated from invitation data and is editable
  {
    agent: t.conversation.companyNameEn,
    preFilledField: 'companyNameEn',
    field: 'companyNameEn',
    type: 'text'
  },
  
  // Step 5: Business Registration Number
  {
    agent: t.conversation.registrationNumber,
    field: 'registrationNumber',
    type: 'text'
  },
  
  // Step 6: Registered Address (Local Language)
  {
    agent: t.conversation.addressLocal,
    field: 'addressLocal',
    type: 'text'
  },
  
  // Step 7: Registered Address (English)
  {
    agent: t.conversation.addressEn,
    field: 'addressEn',
    type: 'text'
  },
  
  // Step 8: Entity Role Selection
  // Supplier selects their role (Consignee/Shipper) which appears on HBL/Billing
  {
    agent: t.conversation.entityRole,
    field: 'entityRole',
    type: 'select',
    options: t.conversation.entityRoleOptions
  },
  
  // Step 9: Company Information Confirmation
  // Agent confirms receipt of company info and asks to proceed to contact details
  {
    agent: t.conversation.companyInfoReceived,
    type: 'confirm',
    options: [t.conversation.continue]
  },
  
  // Stage 2: Primary Contact Information Collection (Page 2)
  // Step 10: First Name - Pre-filled from invitation metadata
  {
    agent: t.conversation.firstName,
    preFilledField: 'firstName',
    field: 'firstName',
    type: 'text'
  },
  
  // Step 11: Last Name - Pre-filled from invitation metadata
  {
    agent: t.conversation.lastName,
    preFilledField: 'lastName',
    field: 'lastName',
    type: 'text'
  },
  
  // Step 12: Email - Pre-filled from invitation metadata
  // Agent confirms this will be used for Flexport system notifications
  {
    agent: t.conversation.email,
    preFilledField: 'email',
    field: 'email',
    type: 'text'
  },
  
  // Step 13: Phone Number
  // Used for order and operations notifications, validated regionally
  {
    agent: t.conversation.phone,
    field: 'phone',
    type: 'text'
  },
  
  // Step 14: Preferred Language
  // Default pre-selected based on invitation metadata, supplier can change
  {
    agent: t.conversation.language,
    field: 'language',
    type: 'select',
    options: t.conversation.languageOptions
  },
  
  // Step 15: Password Setup
  // Password must meet complexity requirements (min 8 chars, letters + numbers)
  {
    agent: t.conversation.password,
    field: 'password',
    type: 'text',
    isPassword: true
  },
  
  // Step 16: Password Confirmation
  // Ensures password consistency
  {
    agent: t.conversation.confirmPassword,
    field: 'confirmPassword',
    type: 'text',
    isPassword: true
  },
  
  // Step 17: Validation
  // System validates all information, checks for duplicates, confirms data validity
  {
    agent: `${t.conversation.validating}\n${t.conversation.validationComplete}`,
    type: 'system'
  },
  
  // Step 18: Onboarding Completion
  // Agent congratulates supplier and offers to continue using the assistant
  {
    agent: t.conversation.completionMessage,
    type: 'confirm',
    options: t.conversation.completionOptions
  }
];

/**
 * Error Handling Scripts
 * These are dynamically generated based on validation errors
 */
export const getErrorStep = (
  t: Translations,
  errorType: 'missingField' | 'invalidFormat' | 'duplicateCompany' | 'serverTimeout',
  fieldName?: string,
  companyName?: string
): ConversationStep => {
  switch (errorType) {
    case 'missingField':
      return {
        agent: t.conversation.errorMissingField.replace('{Field Name}', fieldName || 'field'),
        type: 'error',
        errorType: 'missingField',
        errorFieldName: fieldName
      };
    case 'invalidFormat':
      return {
        agent: t.conversation.errorInvalidFormat,
        type: 'error',
        errorType: 'invalidFormat',
        errorFieldName: fieldName
      };
    case 'duplicateCompany':
      return {
        agent: t.conversation.errorDuplicateCompany.replace('{Existing Company Name}', companyName || 'Unknown Company'),
        type: 'error',
        errorType: 'duplicateCompany',
        options: t.conversation.errorDuplicateOptions,
        errorCompanyName: companyName
      };
    case 'serverTimeout':
      return {
        agent: t.conversation.errorServerTimeout,
        type: 'error',
        errorType: 'serverTimeout'
      };
    default:
      return {
        agent: t.conversation.errorServerTimeout,
        type: 'error',
        errorType: 'serverTimeout'
      };
  }
};

