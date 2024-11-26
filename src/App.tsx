import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Invoice } from './types';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import InvoicePDF from './components/InvoicePDF';
import { FileText, Plus, FileDown, Edit } from 'lucide-react';

export default function App() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isCreating, setIsCreating] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    }
  }, []);

  const saveInvoice = (invoice: Invoice) => {
    let updatedInvoices;
    if (isEditing) {
      updatedInvoices = invoices.map(inv => 
        inv.id === invoice.id ? invoice : inv
      );
    } else {
      updatedInvoices = [...invoices, invoice];
    }
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    setSelectedInvoice(invoice);
    setIsCreating(false);
    setIsEditing(false);
  };

  const handlePDFDownload = async () => {
    if (selectedInvoice) {
      const blob = await pdf(<InvoicePDF invoice={selectedInvoice} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${selectedInvoice.invoiceNumber}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Invoice Generator</span>
            </div>
            <button
              onClick={() => {
                setIsCreating(true);
                setIsEditing(false);
                setSelectedInvoice(null);
              }}
              className="btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Invoice
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Saved Invoices</h2>
              {invoices.length === 0 ? (
                <p className="text-gray-500 text-sm">No invoices yet</p>
              ) : (
                <ul className="space-y-2">
                  {invoices.map((invoice) => (
                    <li key={invoice.id}>
                      <button
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setIsCreating(false);
                          setIsEditing(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          selectedInvoice?.id === invoice.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">{invoice.client.name}</div>
                        <div className="text-xs text-gray-500">
                          {invoice.invoiceNumber}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex-1">
            {isCreating || isEditing ? (
              <InvoiceForm
                initialData={isEditing ? selectedInvoice : undefined}
                onSave={saveInvoice}
                onGeneratePdf={handlePDFDownload}
              />
            ) : selectedInvoice ? (
              <div>
                <div className="flex justify-end space-x-4 mb-4">
                  <button
                    onClick={handlePDFDownload}
                    className="btn-secondary"
                  >
                    <FileDown className="w-5 h-5 mr-2" /> Download PDF
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setIsCreating(false);
                    }}
                    className="btn-primary"
                  >
                    <Edit className="w-5 h-5 mr-2" /> Edit Invoice
                  </button>
                </div>
                <InvoicePreview invoice={selectedInvoice} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Select an invoice to view or create a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}