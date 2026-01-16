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

const NotificationTable = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 0;
  width: 100%;
`;

const NotificationTableHeader = styled.div`
  display: contents;
`;

const NotificationTableHeaderCell = styled.div`
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
  text-align: center;
  border-bottom: 1px solid var(--border);
  
  &:first-child {
    text-align: left;
  }
  
  &:not(:first-child) {
    min-width: 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
`;

const NotificationTableRow = styled.div`
  display: contents;
`;

const NotificationTableCell = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--border);
  
  &:first-child {
    justify-content: flex-start;
  }
  
  &:not(:first-child) {
    min-width: 80px;
  }
`;

const NotificationTableLabel = styled.div`
  flex: 1;
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
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
              <FieldLabel style={{ marginBottom: 8 }}>
                Which quotes, bookings and shipments do you want to be notified about?
              </FieldLabel>
              <FieldHint style={{ marginBottom: 16 }}>
                In addition to those that you initiate, you'll only receive notifications for the quotes, bookings, and
                shipments that you specify here.
              </FieldHint>
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
            <NotificationTable>
              <NotificationTableHeader>
                <NotificationTableHeaderCell>
                  <FieldLabel style={{ marginBottom: 8 }}>
                    What kinds of events would you like to be notified about?
                  </FieldLabel>
                  <FieldHint style={{ marginBottom: 0 }}>
                    Receive notifications for shipment events, tasks, and exceptions.
                  </FieldHint>
                </NotificationTableHeaderCell>
                <NotificationTableHeaderCell>In App</NotificationTableHeaderCell>
                <NotificationTableHeaderCell>Email</NotificationTableHeaderCell>
              </NotificationTableHeader>

              {/* Quotes and Bookings */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Quotes and Bookings</FieldLabel>
                    <FieldHint>Notifications related to all booking and quoting activity</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={quotesBookingsInApp}
                    onChange={setQuotesBookingsInApp}
                    aria-label="Quotes and Bookings In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={quotesBookingsEmail}
                    onChange={setQuotesBookingsEmail}
                    aria-label="Quotes and Bookings Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Requotes */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Requotes</FieldLabel>
                    <FieldHint>Receive a notification for price changes and rate expirations</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox checked={requotesInApp} onChange={setRequotesInApp} aria-label="Requotes In App" />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox checked={requotesEmail} onChange={setRequotesEmail} aria-label="Requotes Email" />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Booking review */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Booking review</FieldLabel>
                    <FieldHint>Email notifications for when bookings are amended or completed</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingReviewInApp}
                    onChange={setBookingReviewInApp}
                    aria-label="Booking review In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingReviewEmail}
                    onChange={setBookingReviewEmail}
                    aria-label="Booking review Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Exceptions and Messages */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Exceptions and Messages</FieldLabel>
                    <FieldHint>Get notified when an exception occurs or a message is posted</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={exceptionsMessagesInApp}
                    onChange={setExceptionsMessagesInApp}
                    aria-label="Exceptions and Messages In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={exceptionsMessagesEmail}
                    onChange={setExceptionsMessagesEmail}
                    aria-label="Exceptions and Messages Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Direct Mentions and Replies */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Direct Mentions and Replies</FieldLabel>
                    <FieldHint>Get notified when you are tagged or when someone responds to your message</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={directMentionsRepliesInApp}
                    onChange={setDirectMentionsRepliesInApp}
                    aria-label="Direct Mentions and Replies In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={directMentionsRepliesEmail}
                    onChange={setDirectMentionsRepliesEmail}
                    aria-label="Direct Mentions and Replies Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Export documents submission */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Export documents submission</FieldLabel>
                    <FieldHint>Receive a notification when documents have been digitized</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={exportDocumentsInApp}
                    onChange={setExportDocumentsInApp}
                    aria-label="Export documents submission In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={exportDocumentsEmail}
                    onChange={setExportDocumentsEmail}
                    aria-label="Export documents submission Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Shipment document reminders & updates */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Shipment document reminders & updates</FieldLabel>
                    <FieldHint>Receive notifications when a document is required, or has been updated</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={shipmentDocumentRemindersInApp}
                    onChange={setShipmentDocumentRemindersInApp}
                    aria-label="Shipment document reminders In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={shipmentDocumentRemindersEmail}
                    onChange={setShipmentDocumentRemindersEmail}
                    aria-label="Shipment document reminders Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Demurrage and Detention */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Demurrage and Detention</FieldLabel>
                    <FieldHint>Last free day expired, last free day within 2 days</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={demurrageDetentionInApp}
                    onChange={setDemurrageDetentionInApp}
                    aria-label="Demurrage and Detention In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={demurrageDetentionEmail}
                    onChange={setDemurrageDetentionEmail}
                    aria-label="Demurrage and Detention Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Delivery Date Scheduled */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Delivery Date Scheduled</FieldLabel>
                    <FieldHint>Receive a notification when a delivery date is scheduled or updated</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={deliveryDateScheduledInApp}
                    onChange={setDeliveryDateScheduledInApp}
                    aria-label="Delivery Date Scheduled In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={deliveryDateScheduledEmail}
                    onChange={setDeliveryDateScheduledEmail}
                    aria-label="Delivery Date Scheduled Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Pickup Date Scheduled */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Pickup Date Scheduled</FieldLabel>
                    <FieldHint>Receive a notification when a pickup date is scheduled or updated</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={pickupDateScheduledInApp}
                    onChange={setPickupDateScheduledInApp}
                    aria-label="Pickup Date Scheduled In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={pickupDateScheduledEmail}
                    onChange={setPickupDateScheduledEmail}
                    aria-label="Pickup Date Scheduled Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Tasks */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Tasks</FieldLabel>
                    <FieldHint>Receive a notification when a task needs action</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox checked={tasksInApp} onChange={setTasksInApp} aria-label="Tasks In App" />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox checked={tasksEmail} onChange={setTasksEmail} aria-label="Tasks Email" />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Schedule changes */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Schedule changes</FieldLabel>
                    <FieldHint>Get notified about delays and early arrivals</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={scheduleChangesInApp}
                    onChange={setScheduleChangesInApp}
                    aria-label="Schedule changes In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={scheduleChangesEmail}
                    onChange={setScheduleChangesEmail}
                    aria-label="Schedule changes Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>
            </NotificationTable>
            <Divider />
          </CardBody>
        </Card>

        {/* Order Management Section */}
        <Card>
          <CardBody style={{ padding: 0 }}>
            <NotificationTable>
              <NotificationTableHeader>
                <NotificationTableHeaderCell>
                  <FieldLabel style={{ marginBottom: 0 }}>Order Management</FieldLabel>
                </NotificationTableHeaderCell>
                <NotificationTableHeaderCell>In App</NotificationTableHeaderCell>
                <NotificationTableHeaderCell>Email</NotificationTableHeaderCell>
              </NotificationTableHeader>

              {/* General Events */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>General Events</FieldLabel>
                    <FieldHint>Receive notifications for general order management events and exceptions.</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={orderManagementGeneralEventsInApp}
                    onChange={setOrderManagementGeneralEventsInApp}
                    aria-label="General Events In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={orderManagementGeneralEventsEmail}
                    onChange={setOrderManagementGeneralEventsEmail}
                    aria-label="General Events Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Booking has been flagged for approval */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Booking has been flagged for approval</FieldLabel>
                    <FieldHint>Receive a notification when there are bookings that need to be approved</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingFlaggedApprovalInApp}
                    onChange={setBookingFlaggedApprovalInApp}
                    aria-label="Booking flagged for approval In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingFlaggedApprovalEmail}
                    onChange={setBookingFlaggedApprovalEmail}
                    aria-label="Booking flagged for approval Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Booking has been flagged with violations */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Booking has been flagged with violations</FieldLabel>
                    <FieldHint>Receive a notification when there are bookings with violations</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingFlaggedViolationsInApp}
                    onChange={setBookingFlaggedViolationsInApp}
                    aria-label="Booking flagged with violations In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingFlaggedViolationsEmail}
                    onChange={setBookingFlaggedViolationsEmail}
                    aria-label="Booking flagged with violations Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Booking has been approved (shipper) */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Booking has been approved (shipper)</FieldLabel>
                    <FieldHint>As the shipper, receive a notification when my booking has been approved</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingApprovedShipperInApp}
                    onChange={setBookingApprovedShipperInApp}
                    aria-label="Booking approved shipper In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingApprovedShipperEmail}
                    onChange={setBookingApprovedShipperEmail}
                    aria-label="Booking approved shipper Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Booking has been rejected (shipper) */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Booking has been rejected (shipper)</FieldLabel>
                    <FieldHint>As the shipper, receive a notification when my booking has been rejected</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingRejectedShipperInApp}
                    onChange={setBookingRejectedShipperInApp}
                    aria-label="Booking rejected shipper In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingRejectedShipperEmail}
                    onChange={setBookingRejectedShipperEmail}
                    aria-label="Booking rejected shipper Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Booking has been approved (consignee) */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Booking has been approved (consignee)</FieldLabel>
                    <FieldHint>As the consignee, receive a notification when my booking has been approved</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingApprovedConsigneeInApp}
                    onChange={setBookingApprovedConsigneeInApp}
                    aria-label="Booking approved consignee In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingApprovedConsigneeEmail}
                    onChange={setBookingApprovedConsigneeEmail}
                    aria-label="Booking approved consignee Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Booking has been rejected (consignee) */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Booking has been rejected (consignee)</FieldLabel>
                    <FieldHint>As the consignee, receive a notification when my booking has been rejected</FieldHint>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingRejectedConsigneeInApp}
                    onChange={setBookingRejectedConsigneeInApp}
                    aria-label="Booking rejected consignee In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={bookingRejectedConsigneeEmail}
                    onChange={setBookingRejectedConsigneeEmail}
                    aria-label="Booking rejected consignee Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>
            </NotificationTable>

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
            <NotificationTable>
              <NotificationTableHeader>
                <NotificationTableHeaderCell></NotificationTableHeaderCell>
                <NotificationTableHeaderCell>In App</NotificationTableHeaderCell>
                <NotificationTableHeaderCell>Email</NotificationTableHeaderCell>
              </NotificationTableHeader>
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel style={{ marginLeft: 20 }}>Messages</FieldLabel>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={orderMessagesInApp}
                    onChange={setOrderMessagesInApp}
                    aria-label="Order Messages In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={orderMessagesEmail}
                    onChange={setOrderMessagesEmail}
                    aria-label="Order Messages Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>
            </NotificationTable>
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
          <CardBody style={{ padding: 0 }}>
            <NotificationTable>
              <NotificationTableHeader>
                <NotificationTableHeaderCell>
                  <FieldLabel style={{ marginBottom: 8 }}>Invoicing and Billing Events</FieldLabel>
                  <FieldHint style={{ marginBottom: 0 }}>
                    Receive notfications for specific invoicing and billing events.
                  </FieldHint>
                </NotificationTableHeaderCell>
                <NotificationTableHeaderCell>In App</NotificationTableHeaderCell>
                <NotificationTableHeaderCell>Email</NotificationTableHeaderCell>
              </NotificationTableHeader>

              {/* Invoices and Credit Memos */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Invoices and Credit Memos</FieldLabel>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={invoicesCreditMemosInApp}
                    onChange={setInvoicesCreditMemosInApp}
                    aria-label="Invoices and Credit Memos In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={invoicesCreditMemosEmail}
                    onChange={setInvoicesCreditMemosEmail}
                    aria-label="Invoices and Credit Memos Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>

              {/* Statement of Account */}
              <NotificationTableRow>
                <NotificationTableCell>
                  <NotificationTableLabel>
                    <FieldLabel>Statement of Account</FieldLabel>
                  </NotificationTableLabel>
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={statementOfAccountInApp}
                    onChange={setStatementOfAccountInApp}
                    aria-label="Statement of Account In App"
                  />
                </NotificationTableCell>
                <NotificationTableCell>
                  <Checkbox
                    checked={statementOfAccountEmail}
                    onChange={setStatementOfAccountEmail}
                    aria-label="Statement of Account Email"
                  />
                </NotificationTableCell>
              </NotificationTableRow>
            </NotificationTable>
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
