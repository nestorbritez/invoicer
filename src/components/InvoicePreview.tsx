import React from 'react';
import { Invoice } from '../types';
import {PDFViewer} from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF.tsx";

interface Props {
  invoice: Invoice;
}

export default function InvoicePreview({ invoice }: Props) {
  // const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <PDFViewer width={1280} height={2048}>
      <InvoicePDF invoice={invoice} />
    </PDFViewer>
  )

    /*(
    <div className="bg-white p-4 rounded-lg shadow-lg" id="invoice-preview">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 whitespace-pre">{invoice.business.name}</h1>
          <div className="text-gray-600 text-lg">
            <p>{invoice.business.address}</p>
            <p>{invoice.business.email}</p>
            <p>{invoice.business.phone}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">INVOICE</h2>
          <p className="text-gray-600 text-lg">Invoice #: {invoice.invoiceNumber}</p>
          <p className="text-gray-600 text-lg">Date: {invoice.date}</p>
          <p className="text-gray-600 text-lg">Due Date: {invoice.dueDate}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Bill To:</h3>
        <div className="text-gray-600 text-lg">
          <p className="font-medium">{invoice.client.name}</p>
          <p>{invoice.client.address}</p>
          <p>{invoice.client.email}</p>
          <p>{invoice.client.phone}</p>
        </div>
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="text-left py-3 text-xl">Description</th>
            <th className="text-right py-3 text-xl">Quantity</th>
            <th className="text-right py-3 text-xl">Price</th>
            <th className="text-right py-3 text-xl">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="py-3 text-lg">{item.description}</td>
              <td className="text-right py-3 text-lg">{item.quantity}</td>
              <td className="text-right py-3 text-lg">${item.price.toFixed(2)}</td>
              <td className="text-right py-3 text-lg">${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-64">
          <div className="flex justify-between border-t border-gray-300 pt-2 text-2xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="mt-6 pt-4 border-t border-gray-300">
          <h4 className="text-xl font-semibold mb-2">Notes:</h4>
          <p className="text-gray-600 text-lg whitespace-pre">{invoice.notes}</p>
        </div>
      )}
    </div>
  )*/
}
