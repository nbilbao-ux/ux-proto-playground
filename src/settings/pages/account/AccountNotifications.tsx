import React, { useState } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
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
  Select,
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

const NotificationHeader = styled.div`
  padding: 12px 16px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
  cursor: pointer;
`;

export function AccountNotifications() {
  // Freight section state
  const [freightShipmentScope, setFreightShipmentScope] = useState<'all' | 'none' | 'specific'>('all');
  const [quotesBookingsInApp, setQuotesBookingsInApp] = useState(true);
  const [quotesBookingsEmail, setQuotesBookingsEmail] = useState(true);
  const [requotesInApp, setRequotesInApp] = useState(true);
  const [requotesEmail, setRequotesEmail] = useState(true);
  const [bookingReviewInApp, setBookingReviewInApp] = useState(false);
  const [bookingReviewEmail, setBookingReviewEmail] = useState(true);
  const [exceptionsMessagesInApp, setExceptionsMessagesInApp] = useState(true);
  const [exceptionsMessagesEmail, setExceptionsMessagesEmail] = useState(true);
  const [directMentionsRepliesInApp, setDirectMentionsRepliesInApp] = useState(true);
  const [directMentionsRepliesEmail, setDirectMentionsRepliesEmail] = useState(true);
  const [exportDocumentsInApp, setExportDocumentsInApp] = useState(true);
  const [exportDocumentsEmail, setExportDocumentsEmail] = useState(true);
  const [shipmentDocumentRemindersInApp, setShipmentDocumentRemindersInApp] = useState(true);
  const [shipmentDocumentRemindersEmail, setShipmentDocumentRemindersEmail] = useState(true);
  const [demurrageDetentionInApp, setDemurrageDetentionInApp] = useState(true);
  const [demurrageDetentionEmail, setDemurrageDetentionEmail] = useState(true);
  const [deliveryDateScheduledInApp, setDeliveryDateScheduledInApp] = useState(true);
  const [deliveryDateScheduledEmail, setDeliveryDateScheduledEmail] = useState(true);
  const [pickupDateScheduledInApp, setPickupDateScheduledInApp] = useState(true);
  const [pickupDateScheduledEmail, setPickupDateScheduledEmail] = useState(true);
  const [tasksInApp, setTasksInApp] = useState(true);
  const [tasksEmail, setTasksEmail] = useState(true);
  const [scheduleChangesInApp, setScheduleChangesInApp] = useState(true);
  const [scheduleChangesEmail, setScheduleChangesEmail] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [deliveryOrderEmails, setDeliveryOrderEmails] = useState(true);

  // Order Management section state
  const [orderManagementGeneralEventsInApp, setOrderManagementGeneralEventsInApp] = useState(true);
  const [orderManagementGeneralEventsEmail, setOrderManagementGeneralEventsEmail] = useState(true);
  const [bookingFlaggedApprovalInApp, setBookingFlaggedApprovalInApp] = useState(true);
  const [bookingFlaggedApprovalEmail, setBookingFlaggedApprovalEmail] = useState(true);
  const [bookingFlaggedViolationsInApp, setBookingFlaggedViolationsInApp] = useState(true);
  const [bookingFlaggedViolationsEmail, setBookingFlaggedViolationsEmail] = useState(true);
  const [bookingApprovedShipperInApp, setBookingApprovedShipperInApp] = useState(true);
  const [bookingApprovedShipperEmail, setBookingApprovedShipperEmail] = useState(true);
  const [bookingRejectedShipperInApp, setBookingRejectedShipperInApp] = useState(true);
  const [bookingRejectedShipperEmail, setBookingRejectedShipperEmail] = useState(true);
  const [bookingApprovedConsigneeInApp, setBookingApprovedConsigneeInApp] = useState(true);
  const [bookingApprovedConsigneeEmail, setBookingApprovedConsigneeEmail] = useState(true);
  const [bookingRejectedConsigneeInApp, setBookingRejectedConsigneeInApp] = useState(true);
  const [bookingRejectedConsigneeEmail, setBookingRejectedConsigneeEmail] = useState(true);
  const [orderMessagesScope, setOrderMessagesScope] = useState<'all' | 'mentions'>('all');
  const [orderMessagesInApp, setOrderMessagesInApp] = useState(true);
  const [orderMessagesEmail, setOrderMessagesEmail] = useState(true);
  const [receivePOUpdateEmails, setReceivePOUpdateEmails] = useState(true);
  const [receivePOSummaryEmails, setReceivePOSummaryEmails] = useState(true);
  const [poSummaryFrequency, setPOSummaryFrequency] = useState<'daily' | 'weekly'>('daily');
  const [unbookedOrdersReportInApp, setUnbookedOrdersReportInApp] = useState(true);
  const [unbookedOrdersReportFrequency, setUnbookedOrdersReportFrequency] = useState<'daily' | 'weekly'>('daily');
  const [unbookedOrdersReportEmail, setUnbookedOrdersReportEmail] = useState(true);
  const [unbookedOrdersReportEmailFrequency, setUnbookedOrdersReportEmailFrequency] = useState<'daily' | 'weekly'>('daily');

  // Invoicing and Billing section state
  const [invoicesCreditMemosInApp, setInvoicesCreditMemosInApp] = useState(true);
  const [invoicesCreditMemosEmail, setInvoicesCreditMemosEmail] = useState(true);
  const [statementOfAccountInApp, setStatementOfAccountInApp] = useState(true);
  const [statementOfAccountEmail, setStatementOfAccountEmail] = useState(true);
  const [invoiceEntitySelection, setInvoiceEntitySelection] = useState<string[]>([]);

  // Turn off all notifications
  const [turnOffAllNotifications, setTurnOffAllNotifications] = useState(false);

  return (
    <SettingsPageLayout title="Notifications" subtitle="Choose what updates you receive and how frequently.">
      <VStack $gap={14}>
        {/* Freight Section */}
        <Card>
          <CardHeader>
            <CardTitle>Freight</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <div style={{ padding: '12px 16px' }}>
              <FieldHint style={{ marginBottom: 16 }}>
                In addition to those that you initiate, you'll only receive notifications for the quotes, bookings, and
                shipments that you specify here.
              </FieldHint>
              <div>
                <FieldLabel style={{ marginBottom: 12 }}>Which quotes, bookings and shipments do you want to be notified about?</FieldLabel>
                <RadioGroup>
                  <RadioLabel $checked={freightShipmentScope === 'all'}>
                    <RadioInput
                      type="radio"
                      name="freightShipmentScope"
                      value="all"
                      checked={freightShipmentScope === 'all'}
                      onChange={(e) => setFreightShipmentScope(e.target.value as 'all' | 'none' | 'specific')}
                    />
                    All shipments within my organization
                  </RadioLabel>
                  <RadioLabel $checked={freightShipmentScope === 'none'}>
                    <RadioInput
                      type="radio"
                      name="freightShipmentScope"
                      value="none"
                      checked={freightShipmentScope === 'none'}
                      onChange={(e) => setFreightShipmentScope(e.target.value as 'all' | 'none' | 'specific')}
                    />
                    None within my organization
                  </RadioLabel>
                  <RadioLabel $checked={freightShipmentScope === 'specific'}>
                    <RadioInput
                      type="radio"
                      name="freightShipmentScope"
                      value="specific"
                      checked={freightShipmentScope === 'specific'}
                      onChange={(e) => setFreightShipmentScope(e.target.value as 'all' | 'none' | 'specific')}
                    />
                    Only specific shipments within my organization
                  </RadioLabel>
                </RadioGroup>
              </div>
            </div>
            <Divider />

            {/* Weekly Digest */}
            <FieldRow>
              <div>
                <FieldLabel>Weekly Digest</FieldLabel>
                <FieldHint>Receive a weekly summary via email of your active shipments.</FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={weeklyDigest} onChange={setWeeklyDigest} aria-label="Weekly Digest" />
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Delivery order emails */}
            <FieldRow>
              <div>
                <FieldLabel>Delivery order emails</FieldLabel>
                <FieldHint>Receive delivery order and delivery notice emails.</FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={deliveryOrderEmails} onChange={setDeliveryOrderEmails} aria-label="Delivery order emails" />
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Daily Digest */}
            <FieldRow>
              <div>
                <FieldLabel>Daily Digest</FieldLabel>
                <FieldHint>
                  Receive a daily summary via email of any updates that have occurred on your shipments in the past 24
                  hours.
                </FieldHint>
              </div>
              <FieldControl>
                <Toggle checked={dailyDigest} onChange={setDailyDigest} aria-label="Daily Digest" />
              </FieldControl>
            </FieldRow>
            <Divider />
            <NotificationHeader>
              <FieldLabel style={{ marginBottom: 8 }}>
                What kinds of events would you like to be notified about?
              </FieldLabel>
              <FieldHint style={{ marginBottom: 0 }}>
                Receive notifications for shipment events, tasks, and exceptions.
              </FieldHint>
            </NotificationHeader>

              {/* Quotes and Bookings */}
              <FieldRow>
                <div>
                  <FieldLabel>Quotes and Bookings</FieldLabel>
                  <FieldHint>Notifications related to all booking and quoting activity</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={quotesBookingsInApp}
                        onChange={setQuotesBookingsInApp}
                        aria-label="Quotes and Bookings In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={quotesBookingsEmail}
                        onChange={setQuotesBookingsEmail}
                        aria-label="Quotes and Bookings Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Requotes */}
              <FieldRow>
                <div>
                  <FieldLabel>Requotes</FieldLabel>
                  <FieldHint>Receive a notification for price changes and rate expirations</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox checked={requotesInApp} onChange={setRequotesInApp} aria-label="Requotes In App" />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox checked={requotesEmail} onChange={setRequotesEmail} aria-label="Requotes Email" />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Booking review */}
              <FieldRow>
                <div>
                  <FieldLabel>Booking review</FieldLabel>
                  <FieldHint>Email notifications for when bookings are amended or completed</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingReviewInApp}
                        onChange={setBookingReviewInApp}
                        aria-label="Booking review In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingReviewEmail}
                        onChange={setBookingReviewEmail}
                        aria-label="Booking review Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Exceptions and Messages */}
              <FieldRow>
                <div>
                  <FieldLabel>Exceptions and Messages</FieldLabel>
                  <FieldHint>Get notified when an exception occurs or a message is posted</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={exceptionsMessagesInApp}
                        onChange={setExceptionsMessagesInApp}
                        aria-label="Exceptions and Messages In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={exceptionsMessagesEmail}
                        onChange={setExceptionsMessagesEmail}
                        aria-label="Exceptions and Messages Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Direct Mentions and Replies */}
              <FieldRow>
                <div>
                  <FieldLabel>Direct Mentions and Replies</FieldLabel>
                  <FieldHint>Get notified when you are tagged or when someone responds to your message</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={directMentionsRepliesInApp}
                        onChange={setDirectMentionsRepliesInApp}
                        aria-label="Direct Mentions and Replies In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={directMentionsRepliesEmail}
                        onChange={setDirectMentionsRepliesEmail}
                        aria-label="Direct Mentions and Replies Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Export documents submission */}
              <FieldRow>
                <div>
                  <FieldLabel>Export documents submission</FieldLabel>
                  <FieldHint>Receive a notification when documents have been digitized</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={exportDocumentsInApp}
                        onChange={setExportDocumentsInApp}
                        aria-label="Export documents submission In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={exportDocumentsEmail}
                        onChange={setExportDocumentsEmail}
                        aria-label="Export documents submission Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Shipment document reminders & updates */}
              <FieldRow>
                <div>
                  <FieldLabel>Shipment document reminders & updates</FieldLabel>
                  <FieldHint>Receive notifications when a document is required, or has been updated</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={shipmentDocumentRemindersInApp}
                        onChange={setShipmentDocumentRemindersInApp}
                        aria-label="Shipment document reminders In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={shipmentDocumentRemindersEmail}
                        onChange={setShipmentDocumentRemindersEmail}
                        aria-label="Shipment document reminders Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Demurrage and Detention */}
              <FieldRow>
                <div>
                  <FieldLabel>Demurrage and Detention</FieldLabel>
                  <FieldHint>Last free day expired, last free day within 2 days</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={demurrageDetentionInApp}
                        onChange={setDemurrageDetentionInApp}
                        aria-label="Demurrage and Detention In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={demurrageDetentionEmail}
                        onChange={setDemurrageDetentionEmail}
                        aria-label="Demurrage and Detention Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Delivery Date Scheduled */}
              <FieldRow>
                <div>
                  <FieldLabel>Delivery Date Scheduled</FieldLabel>
                  <FieldHint>Receive a notification when a delivery date is scheduled or updated</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={deliveryDateScheduledInApp}
                        onChange={setDeliveryDateScheduledInApp}
                        aria-label="Delivery Date Scheduled In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={deliveryDateScheduledEmail}
                        onChange={setDeliveryDateScheduledEmail}
                        aria-label="Delivery Date Scheduled Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Pickup Date Scheduled */}
              <FieldRow>
                <div>
                  <FieldLabel>Pickup Date Scheduled</FieldLabel>
                  <FieldHint>Receive a notification when a pickup date is scheduled or updated</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={pickupDateScheduledInApp}
                        onChange={setPickupDateScheduledInApp}
                        aria-label="Pickup Date Scheduled In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={pickupDateScheduledEmail}
                        onChange={setPickupDateScheduledEmail}
                        aria-label="Pickup Date Scheduled Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Tasks */}
              <FieldRow>
                <div>
                  <FieldLabel>Tasks</FieldLabel>
                  <FieldHint>Receive a notification when a task needs action</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox checked={tasksInApp} onChange={setTasksInApp} aria-label="Tasks In App" />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox checked={tasksEmail} onChange={setTasksEmail} aria-label="Tasks Email" />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Schedule changes */}
              <FieldRow>
                <div>
                  <FieldLabel>Schedule changes</FieldLabel>
                  <FieldHint>Get notified about delays and early arrivals</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={scheduleChangesInApp}
                        onChange={setScheduleChangesInApp}
                        aria-label="Schedule changes In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={scheduleChangesEmail}
                        onChange={setScheduleChangesEmail}
                        aria-label="Schedule changes Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
            <Divider />
          </CardBody>
        </Card>

        {/* Order Management Section */}
        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <NotificationHeader>
              <FieldLabel style={{ marginBottom: 8 }}>
                What kinds of events would you like to be notified about?
              </FieldLabel>
              <FieldHint style={{ marginBottom: 0 }}>
                Receive notifications for order management events and exceptions.
              </FieldHint>
            </NotificationHeader>

              {/* General Events */}
              <FieldRow>
                <div>
                  <FieldLabel>General Events</FieldLabel>
                  <FieldHint>Receive notifications for general order management events and exceptions.</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={orderManagementGeneralEventsInApp}
                        onChange={setOrderManagementGeneralEventsInApp}
                        aria-label="General Events In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={orderManagementGeneralEventsEmail}
                        onChange={setOrderManagementGeneralEventsEmail}
                        aria-label="General Events Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Booking has been flagged for approval */}
              <FieldRow>
                <div>
                  <FieldLabel>Booking has been flagged for approval</FieldLabel>
                  <FieldHint>Receive a notification when there are bookings that need to be approved</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingFlaggedApprovalInApp}
                        onChange={setBookingFlaggedApprovalInApp}
                        aria-label="Booking flagged for approval In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingFlaggedApprovalEmail}
                        onChange={setBookingFlaggedApprovalEmail}
                        aria-label="Booking flagged for approval Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Booking has been flagged with violations */}
              <FieldRow>
                <div>
                  <FieldLabel>Booking has been flagged with violations</FieldLabel>
                  <FieldHint>Receive a notification when there are bookings with violations</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingFlaggedViolationsInApp}
                        onChange={setBookingFlaggedViolationsInApp}
                        aria-label="Booking flagged with violations In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingFlaggedViolationsEmail}
                        onChange={setBookingFlaggedViolationsEmail}
                        aria-label="Booking flagged with violations Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Booking has been approved (shipper) */}
              <FieldRow>
                <div>
                  <FieldLabel>Booking has been approved (shipper)</FieldLabel>
                  <FieldHint>As the shipper, receive a notification when my booking has been approved</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingApprovedShipperInApp}
                        onChange={setBookingApprovedShipperInApp}
                        aria-label="Booking approved shipper In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingApprovedShipperEmail}
                        onChange={setBookingApprovedShipperEmail}
                        aria-label="Booking approved shipper Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Booking has been rejected (shipper) */}
              <FieldRow>
                <div>
                  <FieldLabel>Booking has been rejected (shipper)</FieldLabel>
                  <FieldHint>As the shipper, receive a notification when my booking has been rejected</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingRejectedShipperInApp}
                        onChange={setBookingRejectedShipperInApp}
                        aria-label="Booking rejected shipper In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingRejectedShipperEmail}
                        onChange={setBookingRejectedShipperEmail}
                        aria-label="Booking rejected shipper Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Booking has been approved (consignee) */}
              <FieldRow>
                <div>
                  <FieldLabel>Booking has been approved (consignee)</FieldLabel>
                  <FieldHint>As the consignee, receive a notification when my booking has been approved</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingApprovedConsigneeInApp}
                        onChange={setBookingApprovedConsigneeInApp}
                        aria-label="Booking approved consignee In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingApprovedConsigneeEmail}
                        onChange={setBookingApprovedConsigneeEmail}
                        aria-label="Booking approved consignee Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Booking has been rejected (consignee) */}
              <FieldRow>
                <div>
                  <FieldLabel>Booking has been rejected (consignee)</FieldLabel>
                  <FieldHint>As the consignee, receive a notification when my booking has been rejected</FieldHint>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingRejectedConsigneeInApp}
                        onChange={setBookingRejectedConsigneeInApp}
                        aria-label="Booking rejected consignee In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={bookingRejectedConsigneeEmail}
                        onChange={setBookingRejectedConsigneeEmail}
                        aria-label="Booking rejected consignee Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>

            <Divider />

            {/* Messages */}
            <div style={{ padding: '12px 16px' }}>
              <FieldLabel style={{ marginBottom: 8 }}>Messages</FieldLabel>
              <FieldHint style={{ marginBottom: 16 }}>Receive notifications for messages about purchase orders</FieldHint>
              <RadioGroup>
                <RadioLabel $checked={orderMessagesScope === 'all'}>
                  <RadioInput
                    type="radio"
                    name="orderMessagesScope"
                    value="all"
                    checked={orderMessagesScope === 'all'}
                    onChange={(e) => setOrderMessagesScope(e.target.value as 'all' | 'mentions')}
                  />
                  All messages
                </RadioLabel>
                <RadioLabel $checked={orderMessagesScope === 'mentions'}>
                  <RadioInput
                    type="radio"
                    name="orderMessagesScope"
                    value="mentions"
                    checked={orderMessagesScope === 'mentions'}
                    onChange={(e) => setOrderMessagesScope(e.target.value as 'all' | 'mentions')}
                  />
                  Only direct mentions and replies
                </RadioLabel>
              </RadioGroup>
            </div>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Messages</FieldLabel>
              </div>
              <FieldControl>
                <CheckboxGroup>
                  <CheckboxLabel>
                    <Checkbox
                      checked={orderMessagesInApp}
                      onChange={setOrderMessagesInApp}
                      aria-label="Order Messages In App"
                    />
                    In App
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <Checkbox
                      checked={orderMessagesEmail}
                      onChange={setOrderMessagesEmail}
                      aria-label="Order Messages Email"
                    />
                    Email
                  </CheckboxLabel>
                </CheckboxGroup>
              </FieldControl>
            </FieldRow>
            <Divider />

            {/* Order Acknowledgement and Collaboration */}
            <div style={{ padding: '12px 16px' }}>
              <SectionTitle>Order Acknowledgement and Collaboration</SectionTitle>
              <FieldHint style={{ marginBottom: 16 }}>
                Receive emails about any updates to orders (within 24 hours of the latest update) as well as summarized
                reports of any updates related to orders, every day at 4:00 AM PST or weekly every Monday at 4:00 AM
                PST.
              </FieldHint>
            </div>
            <FieldRow>
              <div>
                <FieldLabel>Receive purchase order update emails</FieldLabel>
              </div>
              <FieldControl>
                <Toggle
                  checked={receivePOUpdateEmails}
                  onChange={setReceivePOUpdateEmails}
                  aria-label="Receive purchase order update emails"
                />
              </FieldControl>
            </FieldRow>
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Receive purchase order summary report emails</FieldLabel>
              </div>
              <FieldControl>
                <Toggle
                  checked={receivePOSummaryEmails}
                  onChange={setReceivePOSummaryEmails}
                  aria-label="Receive purchase order summary report emails"
                />
              </FieldControl>
            </FieldRow>
            {receivePOSummaryEmails && (
              <>
                <Divider />
                <FieldRow>
                  <div>
                    <FieldLabel style={{ marginLeft: 20 }}>Frequency</FieldLabel>
                  </div>
                  <FieldControl>
                    <Select
                      value={poSummaryFrequency}
                      onChange={(e) => setPOSummaryFrequency(e.target.value as 'daily' | 'weekly')}
                      aria-label="PO Summary Frequency"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </Select>
                  </FieldControl>
                </FieldRow>
              </>
            )}
            <Divider />

            {/* Unbooked Orders Report */}
            <div style={{ padding: '12px 16px' }}>
              <SectionTitle>Unbooked Orders Report</SectionTitle>
              <FieldHint style={{ marginBottom: 16 }}>
                Receive a report that includes all unbooked orders that missed CRDs, missed must book by dates, and are
                upcoming.
              </FieldHint>
            </div>
            <FieldRow>
              <div>
                <FieldLabel>Receive report in-app</FieldLabel>
              </div>
              <FieldControl>
                <Toggle
                  checked={unbookedOrdersReportInApp}
                  onChange={setUnbookedOrdersReportInApp}
                  aria-label="Receive report in-app"
                />
              </FieldControl>
            </FieldRow>
            {unbookedOrdersReportInApp && (
              <>
                <Divider />
                <FieldRow>
                  <div>
                    <FieldLabel style={{ marginLeft: 20 }}>Frequency</FieldLabel>
                  </div>
                  <FieldControl>
                    <Select
                      value={unbookedOrdersReportFrequency}
                      onChange={(e) => setUnbookedOrdersReportFrequency(e.target.value as 'daily' | 'weekly')}
                      aria-label="Unbooked Orders Report Frequency"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </Select>
                  </FieldControl>
                </FieldRow>
              </>
            )}
            <Divider />
            <FieldRow>
              <div>
                <FieldLabel>Receive purchase order summary report emails</FieldLabel>
              </div>
              <FieldControl>
                <Toggle
                  checked={unbookedOrdersReportEmail}
                  onChange={setUnbookedOrdersReportEmail}
                  aria-label="Receive purchase order summary report emails"
                />
              </FieldControl>
            </FieldRow>
            {unbookedOrdersReportEmail && (
              <>
                <Divider />
                <FieldRow>
                  <div>
                    <FieldLabel style={{ marginLeft: 20 }}>Frequency</FieldLabel>
                  </div>
                  <FieldControl>
                    <Select
                      value={unbookedOrdersReportEmailFrequency}
                      onChange={(e) => setUnbookedOrdersReportEmailFrequency(e.target.value as 'daily' | 'weekly')}
                      aria-label="Unbooked Orders Report Email Frequency"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </Select>
                  </FieldControl>
                </FieldRow>
              </>
            )}
          </CardBody>
        </Card>

        {/* Invoicing and Billing Section */}
        <Card>
          <CardHeader>
            <CardTitle>Invoicing and Billing</CardTitle>
          </CardHeader>
          <CardBody style={{ padding: 0 }}>
            <NotificationHeader>
              <FieldLabel style={{ marginBottom: 8 }}>Invoicing and Billing Events</FieldLabel>
              <FieldHint style={{ marginBottom: 0 }}>
                Receive notfications for specific invoicing and billing events.
              </FieldHint>
            </NotificationHeader>

              {/* Invoices and Credit Memos */}
              <FieldRow>
                <div>
                  <FieldLabel>Invoices and Credit Memos</FieldLabel>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={invoicesCreditMemosInApp}
                        onChange={setInvoicesCreditMemosInApp}
                        aria-label="Invoices and Credit Memos In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={invoicesCreditMemosEmail}
                        onChange={setInvoicesCreditMemosEmail}
                        aria-label="Invoices and Credit Memos Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

              {/* Statement of Account */}
              <FieldRow>
                <div>
                  <FieldLabel>Statement of Account</FieldLabel>
                </div>
                <FieldControl>
                  <CheckboxGroup>
                    <CheckboxLabel>
                      <Checkbox
                        checked={statementOfAccountInApp}
                        onChange={setStatementOfAccountInApp}
                        aria-label="Statement of Account In App"
                      />
                      In App
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <Checkbox
                        checked={statementOfAccountEmail}
                        onChange={setStatementOfAccountEmail}
                        aria-label="Statement of Account Email"
                      />
                      Email
                    </CheckboxLabel>
                  </CheckboxGroup>
                </FieldControl>
              </FieldRow>
              <Divider />

            {/* Which entities */}
            <div style={{ padding: '12px 16px' }}>
              <FieldLabel style={{ marginBottom: 8 }}>
                Which entities would you like to receive invoice emails for?
              </FieldLabel>
              <FieldHint style={{ marginBottom: 16 }}>
                Receive emails only when when invoices are issued to specific entities within your company.
              </FieldHint>
              <div style={{ marginTop: 12 }}>
                <FieldLabel style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.76)' }}>Select entities...</FieldLabel>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Turn off all notifications */}
        <Card>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Turn off all notifications</FieldLabel>
                <FieldHint>
                  When notifications are turned off, you will not receive any in-app or email communications that are
                  selected on this page. You may still receive role-based notifications.
                </FieldHint>
              </div>
              <FieldControl>
                <Toggle
                  checked={turnOffAllNotifications}
                  onChange={setTurnOffAllNotifications}
                  aria-label="Turn off all notifications"
                />
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>
      </VStack>
    </SettingsPageLayout>
  );
}
