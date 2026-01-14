import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { translations, languageNames, type Language, type Translations } from './translations';
import { getConversationScript, type ConversationStep } from './ConversationScript';

interface Message {
  id: string;
  type: 'agent' | 'user' | 'system';
  content: string;
  timestamp?: string;
  inputType?: 'text' | 'select' | 'confirm' | 'system';
  options?: string[];
  preFilled?: string;
}

const PhoneMockup = styled.div`
  width: 375px;
  height: 812px;
  background: #000;
  border-radius: 40px;
  padding: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  margin: 20px auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 25px;
    background: #000;
    border-radius: 0 0 20px 20px;
    z-index: 10;
  }
`;

const Screen = styled.div`
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StatusBar = styled.div`
  height: 44px;
  background: #1a1a1a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const WeChatHeader = styled.div`
  height: 64px;
  background: #2c2c2c;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 500;
  position: relative;
  
  &::after {
    content: 'Flexport';
    position: absolute;
    left: 20px;
    font-size: 16px;
    color: #ffffff;
  }
`;

const LanguageDropdown = styled.select`
  position: absolute;
  right: 20px;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
  
  option {
    background: #2c2c2c;
    color: #ffffff;
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MessageWrapper = styled.div<{ type: 'agent' | 'user' | 'system' }>`
  display: flex;
  ${props => props.type === 'user' && 'justify-content: flex-end;'}
`;

const MessageBubble = styled.div<{ type: 'agent' | 'user' | 'system' }>`
  max-width: 75%;
  padding: 10px 14px;
  border-radius: ${props => 
    props.type === 'agent' ? '0 8px 8px 8px' : 
    props.type === 'user' ? '8px 0 8px 8px' : '8px'};
  background: ${props => 
    props.type === 'agent' ? '#2c2c2c' : 
    props.type === 'user' ? '#95ec69' : '#2c2c2c'};
  color: ${props => 
    props.type === 'agent' ? '#ffffff' : 
    props.type === 'user' ? '#000000' : '#ffffff'};
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  position: relative;
  
  ${props => props.type === 'agent' && `
    &::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 0;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid #2c2c2c;
    }
  `}
  
  ${props => props.type === 'user' && `
    &::after {
      content: '';
      position: absolute;
      right: -8px;
      top: 0;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid #95ec69;
    }
  `}
`;

const InputArea = styled.div`
  padding: 12px 16px;
  background: #1a1a1a;
  border-top: 1px solid #2c2c2c;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #2c2c2c;
  border-radius: 6px;
  font-size: 16px;
  background: #2c2c2c;
  color: #ffffff;
  
  &::placeholder {
    color: #888888;
  }
  
  &:focus {
    outline: none;
    border-color: #07c160;
    background: #333333;
  }
`;

const SendButton = styled.button`
  padding: 8px 20px;
  background: #07c160;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #06ad56;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    color: #ffffff;
  }
`;

const OptionButton = styled.button`
  padding: 10px 16px;
  background: #2c2c2c;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  font-size: 15px;
  margin: 4px 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  color: #ffffff;
  
  &:hover {
    background: #3a3a3a;
    border-color: #07c160;
  }
`;

const PreFilledText = styled.div`
  background: #2c2c2c;
  padding: 8px 12px;
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
  margin: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PreFilledValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PreFilledButtons = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  background: #07c160;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #06ad56;
  }
`;

const EditButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  background: transparent;
  color: #07c160;
  border: 1px solid #07c160;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: rgba(7, 193, 96, 0.1);
  }
`;

const ProgressIndicator = styled.div`
  text-align: center;
  color: #888888;
  font-size: 12px;
  margin-bottom: 8px;
`;

const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 40px;
  background: #1a1a1a;
  color: #ffffff;
`;

const FlexportLogo = styled.div`
  width: 80px;
  height: 80px;
  background: #07c160;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 30px;
`;

const WelcomeTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
`;

const WelcomeSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.5;
`;

const StartButton = styled.button`
  padding: 14px 40px;
  background: #07c160;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    background: #06ad56;
  }
`;

const SuccessScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 40px;
  background: #1a1a1a;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #07c160;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #fff;
  margin-bottom: 24px;
`;

const SuccessTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #ffffff;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #07c160;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin: 8px 0;
  
  &:hover {
    background: #06ad56;
  }
  
  &:nth-child(odd) {
    background: #07c160;
    color: #ffffff;
    border: 1px solid #07c160;
    
    &:hover {
      background: #06ad56;
    }
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  background: #2c2c2c;
  color: #ffffff;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #3a3a3a;
    border-color: #07c160;
  }
  
  &:disabled {
    background: #1a1a1a;
    border-color: #2c2c2c;
    cursor: not-allowed;
    opacity: 0.5;
    color: #666666;
  }
  
  &:nth-child(2) {
    background: #07c160;
    border-color: #07c160;
    
    &:hover:not(:disabled) {
      background: #06ad56;
      border-color: #06ad56;
    }
  }
  
  &:nth-child(3) {
    background: #2c2c2c;
    border-color: #ff6b6b;
    color: #ff6b6b;
    
    &:hover:not(:disabled) {
      background: rgba(255, 107, 107, 0.1);
    }
  }
`;

const WeChatOnboarding: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentStage, setCurrentStage] = useState<'welcome' | 'conversation' | 'success'>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [userDeclined, setUserDeclined] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{step: number, messages: Message[], userDeclined: boolean}>>([]);
  const [formData, setFormData] = useState<any>({
    companyName: '',
    companyNameEn: 'Flexport Supplier Co., Ltd.',
    registrationNumber: '',
    addressLocal: '',
    addressEn: '',
    entityRole: '',
    firstName: 'John',
    lastName: 'Doe',
    email: 'supplier@example.com',
    phone: '',
    language: 'English',
    password: '',
    confirmPassword: '',
  });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isProcessingForwardRef = useRef<boolean>(false);
  
  const t: Translations = translations[language];

  const getConversationFlow = (): ConversationStep[] => {
    return getConversationScript(t);
  };

  const prevLanguageRef = useRef<Language>(language);
  const initializedRef = useRef<boolean>(false);
  const prevStageRef = useRef<'welcome' | 'conversation' | 'success'>(currentStage);
  
  useEffect(() => {
    // Only initialize when transitioning TO conversation stage FROM a different stage
    const isTransitioningToConversation = currentStage === 'conversation' && prevStageRef.current !== 'conversation';
    
    if (isTransitioningToConversation && !initializedRef.current) {
      initializedRef.current = true;
      setUserDeclined(false);
      // Use setTimeout to ensure messages state has been reset
      setTimeout(() => {
        const flow = getConversationFlow();
        const preFilled = flow[0].preFilledField ? formData[flow[0].preFilledField] : undefined;
        addAgentMessage(flow[0].agent, flow[0].type, flow[0].options, preFilled);
      }, 50);
    } else if (currentStage !== 'conversation') {
      // Reset initialization flag when leaving conversation stage
      initializedRef.current = false;
    }
    
    prevStageRef.current = currentStage;
  }, [currentStage]);
  
  useEffect(() => {
    // Reset conversation when language changes during conversation
    if (currentStage === 'conversation' && prevLanguageRef.current !== language && messages.length > 0) {
      setMessages([]);
      setCurrentStep(0);
      setUserDeclined(false);
      setTimeout(() => {
        const flow = getConversationFlow();
        const preFilled = flow[0].preFilledField ? formData[flow[0].preFilledField] : undefined;
        addAgentMessage(flow[0].agent, flow[0].type, flow[0].options, preFilled);
      }, 100);
    }
    prevLanguageRef.current = language;
  }, [language, currentStage]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addAgentMessage = (content: string, inputType?: 'text' | 'select' | 'confirm' | 'system', options?: string[], preFilled?: string) => {
    setMessages(prev => {
      // Check if the last message is already the same agent message to prevent duplicates
      const lastMessage = prev[prev.length - 1];
      if (lastMessage && 
          lastMessage.type === 'agent' && 
          lastMessage.content === content &&
          lastMessage.inputType === inputType &&
          JSON.stringify(lastMessage.options) === JSON.stringify(options) &&
          lastMessage.preFilled === preFilled) {
        // Message already exists, don't add duplicate
        return prev;
      }
      
      const message: Message = {
        id: Date.now().toString(),
        type: 'agent',
        content,
        inputType,
        options,
        preFilled
      };
      const newMessages = [...prev, message];
      
      // Save to history after state update
      setTimeout(() => {
        setConversationHistory(prevHistory => {
          const lastEntry = prevHistory[prevHistory.length - 1];
          if (lastEntry && 
              lastEntry.step === currentStep && 
              lastEntry.messages.length === newMessages.length &&
              lastEntry.userDeclined === userDeclined) {
            return prevHistory;
          }
          return [...prevHistory, { step: currentStep, messages: [...newMessages], userDeclined }];
        });
      }, 0);
      return newMessages;
    });
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => {
      const newMessages = [...prev, message];
      // Save to history after user message
      setTimeout(() => {
        setConversationHistory(prevHistory => {
          const lastEntry = prevHistory[prevHistory.length - 1];
          if (lastEntry && 
              lastEntry.step === currentStep && 
              lastEntry.messages.length === newMessages.length &&
              lastEntry.userDeclined === userDeclined) {
            return prevHistory;
          }
          return [...prevHistory, { step: currentStep, messages: [...newMessages], userDeclined }];
        });
      }, 0);
      return newMessages;
    });
  };

  const handleStart = () => {
    setCurrentStage('conversation');
    setUserDeclined(false);
    setCurrentStep(0);
    setMessages([]);
    setConversationHistory([]);
    initializedRef.current = false; // Reset initialization flag
    // The useEffect will handle adding the initial welcome message
  };

  const handleSend = () => {
    if (!currentInput.trim()) return;

    const flow = getConversationFlow();
    const step = flow[currentStep];
    if (!step) return;

    addUserMessage(currentInput);
    const nextStepIndex = currentStep + 1;

    // Handle different input types
    if (step.type === 'confirm') {
      setTimeout(() => {
        if (nextStepIndex < flow.length) {
          setCurrentStep(nextStepIndex);
          const nextStep = flow[nextStepIndex];
          if (nextStep) {
            const preFilled = nextStep.preFilledField ? formData[nextStep.preFilledField] : undefined;
            setTimeout(() => {
              addAgentMessage(
                nextStep.agent,
                nextStep.type,
                nextStep.options,
                preFilled
              );
            }, 800);
          }
        }
      }, 500);
    } else if (step.field) {
      setFormData((prev: any) => ({ ...prev, [step.field!]: currentInput }));
      setTimeout(() => {
        if (nextStepIndex < flow.length) {
          setCurrentStep(nextStepIndex);
          const nextStep = flow[nextStepIndex];
          if (nextStep) {
            const preFilled = nextStep.preFilledField ? formData[nextStep.preFilledField] : undefined;
            setTimeout(() => {
              addAgentMessage(
                nextStep.agent,
                nextStep.type,
                nextStep.options,
                preFilled
              );
            }, 800);
          } else {
            // Last step - show success
            setTimeout(() => {
              setCurrentStage('success');
            }, 1500);
          }
        } else {
          setTimeout(() => {
            setCurrentStage('success');
          }, 1500);
        }
      }, 500);
    }

    setCurrentInput('');
    inputRef.current?.focus();
  };

  const handleOptionSelect = (option: string) => {
    addUserMessage(option);
    const flow = getConversationFlow();
    const step = flow[currentStep];
    const nextStepIndex = currentStep + 1;
    
    // Handle the initial welcome question
    if (currentStep === 0 && !userDeclined) {
      const startOptions = t.conversation.startOptions;
      const isYes = option === startOptions[0]; // First option is "Yes"
      const isNo = option === startOptions[1]; // Second option is "No"
      
      if (isNo) {
        setUserDeclined(true);
        setTimeout(() => {
          addAgentMessage(
            t.conversation.reminderPrompt,
            'confirm',
            t.conversation.reminderOptions
          );
        }, 800);
        return;
      } else if (isYes) {
        setUserDeclined(false);
        // Proceed with normal flow
        setTimeout(() => {
          if (nextStepIndex < flow.length) {
            setCurrentStep(nextStepIndex);
            const nextStep = flow[nextStepIndex];
            if (nextStep) {
              const preFilled = nextStep.preFilledField ? formData[nextStep.preFilledField] : undefined;
              setTimeout(() => {
                addAgentMessage(
                  nextStep.agent,
                  nextStep.type,
                  nextStep.options,
                  preFilled
                );
              }, 800);
            }
          }
        }, 500);
        return;
      }
    }
    
    // Handle reminder options (when userDeclined is true and we're still at step 0)
    if (userDeclined && currentStep === 0) {
      const reminderOptions = t.conversation.reminderOptions;
      if (option === reminderOptions[0]) {
        // User wants reminder - show confirmation message
        setTimeout(() => {
          addAgentMessage(
            'Thank you! I will send you a reminder shortly.',
            'system'
          );
        }, 500);
      } else {
        // User doesn't want reminder
        setTimeout(() => {
          addAgentMessage(
            'No problem! Feel free to come back anytime when you\'re ready to complete your registration.',
            'system'
          );
        }, 500);
      }
      return;
    }
    
    if (step.field) {
      setFormData((prev: any) => ({ ...prev, [step.field!]: option }));
    }
    
    // Handle completion step (last step in flow)
    if (nextStepIndex >= flow.length) {
      // Show success screen after a brief delay
      setTimeout(() => {
        setCurrentStage('success');
      }, 500);
      return;
    }
    
    setTimeout(() => {
      if (nextStepIndex < flow.length) {
        setCurrentStep(nextStepIndex);
        const nextStep = flow[nextStepIndex];
        if (nextStep) {
          const preFilled = nextStep.preFilledField ? formData[nextStep.preFilledField] : undefined;
          setTimeout(() => {
            addAgentMessage(
              nextStep.agent,
              nextStep.type,
              nextStep.options,
              preFilled
            );
          }, 800);
        } else {
          setTimeout(() => {
            setCurrentStage('success');
          }, 1500);
        }
      } else {
        setTimeout(() => {
          setCurrentStage('success');
        }, 1500);
      }
    }, 500);
  };

  const handlePreFilledConfirm = () => {
    const flow = getConversationFlow();
    const step = flow[currentStep];
    const nextStepIndex = currentStep + 1;
    
    if (step.preFilledField && step.field) {
      // Use the pre-filled value as the user's confirmation
      const confirmedValue = formData[step.preFilledField] || formData[step.field];
      addUserMessage(confirmedValue || t.ui.confirm);
      
      // Ensure formData is set with the pre-filled value
      setFormData((prev: any) => ({ ...prev, [step.field!]: confirmedValue }));
      
      setTimeout(() => {
        if (nextStepIndex < flow.length) {
          setCurrentStep(nextStepIndex);
          const nextStep = flow[nextStepIndex];
          if (nextStep) {
            const preFilled = nextStep.preFilledField ? formData[nextStep.preFilledField] : undefined;
            setTimeout(() => {
              addAgentMessage(
                nextStep.agent,
                nextStep.type,
                nextStep.options,
                preFilled
              );
            }, 800);
          } else {
            // Last step - show success
            setTimeout(() => {
              setCurrentStage('success');
            }, 1500);
          }
        } else {
          setTimeout(() => {
            setCurrentStage('success');
          }, 1500);
        }
      }, 500);
    }
  };

  const handlePreFilledEdit = () => {
    // When editing, show the text input field
    // The existing text input handling will take care of the rest
    const flow = getConversationFlow();
    const step = flow[currentStep];
    if (step && step.type === 'text' && step.preFilledField) {
      // Pre-populate the input with the current value
      setCurrentInput(formData[step.preFilledField] || '');
      inputRef.current?.focus();
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const renderContent = () => {
    if (currentStage === 'welcome') {
      return (
        <>
          <WeChatHeader>
            <LanguageDropdown value={language} onChange={handleLanguageChange}>
              {(Object.keys(languageNames) as Language[]).map((lang) => (
                <option key={lang} value={lang}>
                  {languageNames[lang]}
                </option>
              ))}
            </LanguageDropdown>
          </WeChatHeader>
          <WelcomeScreen>
            <FlexportLogo>F</FlexportLogo>
            <WelcomeTitle>{t.welcome.title}</WelcomeTitle>
            <WelcomeSubtitle>
              {t.welcome.subtitle.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < t.welcome.subtitle.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </WelcomeSubtitle>
            <StartButton onClick={handleStart}>{t.welcome.startButton}</StartButton>
          </WelcomeScreen>
        </>
      );
    }

    if (currentStage === 'success') {
      return (
        <>
          <WeChatHeader>
            <LanguageDropdown value={language} onChange={handleLanguageChange}>
              {(Object.keys(languageNames) as Language[]).map((lang) => (
                <option key={lang} value={lang}>
                  {languageNames[lang]}
                </option>
              ))}
            </LanguageDropdown>
          </WeChatHeader>
          <SuccessScreen>
            <SuccessIcon>✓</SuccessIcon>
            <SuccessTitle>{t.ui.successTitle}</SuccessTitle>
            <SuccessTitle style={{ fontSize: '16px', fontWeight: 'normal', marginBottom: '32px' }}>
              {t.ui.successMessage}
            </SuccessTitle>
            <div style={{ width: '100%', padding: '0 20px' }}>
              <ActionButton>{t.ui.desktopLogin}</ActionButton>
              <ActionButton>{t.ui.continueWeChat}</ActionButton>
            </div>
          </SuccessScreen>
        </>
      );
    }

    const flow = getConversationFlow();
    const currentStepData = flow[currentStep];
    const progress = Math.min(((currentStep + 1) / flow.length) * 100, 100);
    const pageNumber = currentStep < 8 ? 1 : 2;

    return (
      <>
        <WeChatHeader>
          <LanguageDropdown value={language} onChange={handleLanguageChange}>
            {(Object.keys(languageNames) as Language[]).map((lang) => (
              <option key={lang} value={lang}>
                {languageNames[lang]}
              </option>
            ))}
          </LanguageDropdown>
        </WeChatHeader>
        <ChatContainer>
          {currentStep > 0 && (
            <ProgressIndicator>
              {t.ui.step} {pageNumber}/2 · {Math.round(progress)}%
            </ProgressIndicator>
          )}
          {messages.map((msg) => (
            <MessageWrapper key={msg.id} type={msg.type}>
              <MessageBubble type={msg.type}>
                {msg.content.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
                {msg.preFilled && (
                  <PreFilledText>
                    <PreFilledValue>
                      <span>{msg.preFilled}</span>
                    </PreFilledValue>
                    <PreFilledButtons>
                      <ConfirmButton onClick={handlePreFilledConfirm}>
                        {t.ui.confirm}
                      </ConfirmButton>
                      <EditButton onClick={handlePreFilledEdit}>
                        {t.ui.edit}
                      </EditButton>
                    </PreFilledButtons>
                  </PreFilledText>
                )}
                {msg.options && msg.inputType === 'select' && (
                  <div style={{ marginTop: '8px' }}>
                    {msg.options.map((opt, idx) => (
                      <OptionButton key={idx} onClick={() => handleOptionSelect(opt)}>
                        {opt}
                      </OptionButton>
                    ))}
                  </div>
                )}
                {msg.options && (msg.inputType === 'confirm' || msg.inputType === 'error') && (
                  <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexDirection: 'column' }}>
                    {msg.options.map((opt, idx) => (
                      <OptionButton key={idx} onClick={() => handleOptionSelect(opt)}>
                        {opt}
                      </OptionButton>
                    ))}
                  </div>
                )}
              </MessageBubble>
            </MessageWrapper>
          ))}
          <div ref={chatEndRef} />
        </ChatContainer>
        {currentStepData && currentStepData.type === 'text' && (
          <InputArea>
            <TextInput
              ref={inputRef}
              type={currentStepData.isPassword ? 'password' : 'text'}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.ui.placeholder}
              autoFocus
            />
            <SendButton onClick={handleSend} disabled={!currentInput.trim()}>
              {t.ui.send}
            </SendButton>
          </InputArea>
        )}
        {currentStepData && currentStepData.type === 'confirm' && !messages[messages.length - 1]?.options && (
          <InputArea>
            <TextInput
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.ui.placeholder}
              autoFocus
            />
            <SendButton onClick={handleSend} disabled={!currentInput.trim()}>
              {t.ui.send}
            </SendButton>
          </InputArea>
        )}
      </>
    );
  };

  const handleForward = () => {
    if (currentStage !== 'conversation') return;
    
    // Prevent multiple simultaneous forward clicks
    if (isProcessingForwardRef.current) return;
    isProcessingForwardRef.current = true;
    
    const flow = getConversationFlow();
    const currentStepData = flow[currentStep];
    
    // Check if the last message is an agent message without a user response
    const lastMessage = messages[messages.length - 1];
    const needsUserResponse = lastMessage && lastMessage.type === 'agent' && currentStepData && currentStepData.type !== 'system';
    
    if (needsUserResponse) {
      // Simulate user response based on step type
      let simulatedUserResponse = '';
      
      if (currentStepData.type === 'select' && currentStepData.options && currentStepData.options.length > 0) {
        // For select, use the first option
        simulatedUserResponse = currentStepData.options[0];
      } else if (currentStepData.type === 'confirm' && currentStepData.options && currentStepData.options.length > 0) {
        // For confirm, use the first option (usually "Yes" or "Continue")
        simulatedUserResponse = currentStepData.options[0];
      } else if (currentStepData.type === 'text') {
        // For text input, use formData if available, otherwise use a placeholder
        if (currentStepData.field && formData[currentStepData.field]) {
          simulatedUserResponse = formData[currentStepData.field];
        } else if (currentStepData.preFilledField && formData[currentStepData.preFilledField]) {
          simulatedUserResponse = formData[currentStepData.preFilledField];
        } else {
          // Generate a placeholder based on field name
          simulatedUserResponse = currentStepData.field === 'password' || currentStepData.field === 'confirmPassword' 
            ? '••••••••' 
            : `Sample ${currentStepData.field || 'input'}`;
        }
      }
      
      if (simulatedUserResponse) {
        // Update formData if this step has a field
        if (currentStepData.field) {
          setFormData((prev: any) => ({ ...prev, [currentStepData.field!]: simulatedUserResponse }));
        }
        
        // Handle special cases (like welcome step)
        if (currentStep === 0) {
          if (simulatedUserResponse === t.conversation.startOptions[0]) {
            setUserDeclined(false);
          } else if (simulatedUserResponse === t.conversation.startOptions[1]) {
            setUserDeclined(true);
          }
        }
        
        // Add user message and then proceed to next step
        setMessages(prev => {
          const userMsg: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: simulatedUserResponse,
            timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
          };
          const newMessages = [...prev, userMsg];
          
          // Save to history
          setTimeout(() => {
            setConversationHistory(prevHistory => {
              const lastEntry = prevHistory[prevHistory.length - 1];
              if (lastEntry && 
                  lastEntry.step === currentStep && 
                  lastEntry.messages.length === newMessages.length) {
                return prevHistory;
              }
              return [...prevHistory, { step: currentStep, messages: newMessages, userDeclined }];
            });
            
            // Move to next step after user message is added
            if (currentStep < flow.length - 1) {
              const nextStep = currentStep + 1;
              setCurrentStep(nextStep);
              const nextStepData = flow[nextStep];
              const preFilled = nextStepData.preFilledField ? formData[nextStepData.preFilledField] : undefined;
              setTimeout(() => {
                addAgentMessage(nextStepData.agent, nextStepData.type, nextStepData.options, preFilled);
                isProcessingForwardRef.current = false; // Reset flag after agent message is added
              }, 300);
            } else {
              // Last step - show success
              setTimeout(() => {
                setCurrentStage('success');
                isProcessingForwardRef.current = false; // Reset flag
              }, 500);
            }
          }, 100);
          
          return newMessages;
        });
      } else {
        // No simulated response generated, reset flag
        isProcessingForwardRef.current = false;
      }
    } else if (currentStep < flow.length - 1) {
      // Already has user response, just move to next step
      setConversationHistory(prev => {
        const lastEntry = prev[prev.length - 1];
        if (lastEntry && lastEntry.step === currentStep) {
          return prev;
        }
        return [...prev, { step: currentStep, messages: [...messages], userDeclined }];
      });
      
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      const stepData = flow[nextStep];
      const preFilled = stepData.preFilledField ? formData[stepData.preFilledField] : undefined;
      setTimeout(() => {
        addAgentMessage(stepData.agent, stepData.type, stepData.options, preFilled);
        isProcessingForwardRef.current = false; // Reset flag after agent message is added
      }, 100);
    } else if (currentStep === flow.length - 1) {
      // Last step - show success
      setCurrentStage('success');
      isProcessingForwardRef.current = false; // Reset flag
    } else {
      // Fallback: reset flag if no action taken
      isProcessingForwardRef.current = false;
    }
  };

  const handleBackward = () => {
    if (currentStage !== 'conversation' || conversationHistory.length === 0) return;
    
    // Remove current state from history
    const newHistory = [...conversationHistory];
    newHistory.pop();
    
    if (newHistory.length > 0) {
      const previousState = newHistory[newHistory.length - 1];
      setCurrentStep(previousState.step);
      setMessages(previousState.messages);
      setUserDeclined(previousState.userDeclined);
      setConversationHistory(newHistory);
    } else {
      // Go back to the first step (welcome message only)
      setCurrentStep(0);
      const flow = getConversationFlow();
      const firstStep = flow[0];
      const preFilled = firstStep.preFilledField ? formData[firstStep.preFilledField] : undefined;
      setMessages([{
        id: Date.now().toString(),
        type: 'agent',
        content: firstStep.agent,
        inputType: firstStep.type,
        options: firstStep.options,
        preFilled
      }]);
      setUserDeclined(false);
      setConversationHistory([]);
    }
  };

  const handleReset = () => {
    // Reset to the very beginning - welcome screen
    setCurrentStage('welcome');
    setMessages([]);
    setCurrentStep(0);
    setUserDeclined(false);
    setConversationHistory([]);
    setCurrentInput('');
    isProcessingForwardRef.current = false;
    initializedRef.current = false;
  };

  const flow = getConversationFlow();
  const canGoForward = currentStage === 'conversation' && currentStep < flow.length - 1;
  const canGoBackward = currentStage === 'conversation' && (conversationHistory.length > 0 || currentStep > 0);

  return (
    <NavigationContainer>
      <PhoneMockup>
        <Screen>
          <StatusBar>
            <span>9:41</span>
            <span>📶 📶 🔋</span>
          </StatusBar>
          {renderContent()}
        </Screen>
      </PhoneMockup>
      <NavigationButtons>
        <NavButton onClick={handleBackward} disabled={!canGoBackward}>
          ← Backward
        </NavButton>
        <NavButton onClick={handleForward} disabled={!canGoForward}>
          Forward →
        </NavButton>
        <NavButton onClick={handleReset}>
          Reset
        </NavButton>
      </NavigationButtons>
    </NavigationContainer>
  );
};

export default WeChatOnboarding;

