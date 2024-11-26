import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Invoice } from '../types';

Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf' },
    {
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf',
      fontWeight: 'bold'
    }
  ]
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  // src: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTm5IVce_fuJGl18QRY.woff2'
});

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 10,
    fontFamily: 'Oswald',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  businessInfo: {
    fontSize: 14,
    lineHeight: 1.6,
  },
  businessName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a237e',
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
    color: '#1a237e',
  },
  invoiceInfo: {
    fontSize: 14,
    textAlign: 'right',
    lineHeight: 1.6,
  },
  billTo: {
    marginBottom: 18,
  },
  billToTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a237e',
  },
  clientInfo: {
    fontSize: 14,
    lineHeight: 1.6,
  },
  table: {
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#1a237e',
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableRowText: {
    fontSize: 14,
    lineHeight: 1.6,
  },
  description: {
    flex: 4,
    whiteSpace: 'pre',
  },
  quantity: {
    flex: 1,
    textAlign: 'right',
  },
  price: {
    flex: 1.5,
    textAlign: 'right',
  },
  amount: {
    flex: 1.5,
    textAlign: 'right',
  },
  summarySection: {
    marginTop: 24,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#1a237e',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#f5f5f5',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 18,
    color: '#1a237e',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  notes: {
    marginTop: 36,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a237e',
  },
  notesText: {
    fontSize: 14,
    lineHeight: 1.6,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 12,
    color: '#757575',
  },
});

interface Props {
  invoice: Invoice;
}

export default function InvoicePDF({ invoice }: Props) {
  const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const hours = invoice.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.businessName}>{invoice.business.name}</Text>
            <View style={styles.businessInfo}>
              <Text>{invoice.business.address}</Text>
              <Text>{invoice.business.email}</Text>
              <Text>{invoice.business.phone}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <View style={styles.invoiceInfo}>
              <Text>Invoice #: {invoice.invoiceNumber}</Text>
              <Text>Date: {invoice.date}</Text>
              <Text>Due Date: {invoice.dueDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.billTo}>
          <Text style={styles.billToTitle}>Bill To:</Text>
          <View style={styles.clientInfo}>
            <Text>{invoice.client.name}</Text>
            <Text>{invoice.client.address}</Text>
            <Text>{invoice.client.email}</Text>
            <Text>{invoice.client.phone}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.description]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.quantity]}>Hours</Text>
            <Text style={[styles.tableHeaderText, styles.price]}>Rate</Text>
            <Text style={[styles.tableHeaderText, styles.amount]}>Amount</Text>
          </View>

          {invoice.items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.tableRowText, styles.description]}>{item.description}</Text>
              <Text style={[styles.tableRowText, styles.quantity]}>{item.quantity}</Text>
              <Text style={[styles.tableRowText, styles.price]}>${item.price.toFixed(2)}</Text>
              <Text style={[styles.tableRowText, styles.amount]}>${(item.quantity * item.price).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.summarySection}>
          <View style={styles.total}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>({hours}hrs) ${total.toFixed(2)}</Text>
          </View>
        </View>

        {invoice.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesTitle}>Payment Info:</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you!
          </Text>
        </View>
      </Page>
    </Document>
  );
}
