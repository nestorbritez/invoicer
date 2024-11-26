import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, FileDown, Save } from 'lucide-react';
import { Invoice, LineItem, BusinessDetails, ClientInfo } from '../types';

interface Props {
  initialData?: Invoice;
  onSave: (invoice: Invoice) => void;
  onGeneratePdf: () => void;
}

export default function InvoiceForm({ initialData, onSave, onGeneratePdf }: Props) {
  const [business, setBusiness] = useState<BusinessDetails>({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const [client, setClient] = useState<ClientInfo>({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const [items, setItems] = useState<LineItem[]>([
    { id: uuidv4(), description: '', quantity: 1, price: 0 },
  ]);

  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  useEffect(() => {
    if (initialData) {
      setBusiness(initialData.business);
      setClient(initialData.client);
      setItems(initialData.items);
      setNotes(initialData.notes);
      setDate(initialData.date);
      setDueDate(initialData.dueDate);
    }
  }, [initialData]);

  const addItem = () => {
    setItems([...items, { id: uuidv4(), description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invoice: Invoice = {
      id: initialData?.id || uuidv4(),
      date,
      dueDate,
      invoiceNumber: initialData?.invoiceNumber || `INV-${Date.now().toString().slice(-6)}`,
      business,
      client,
      items,
      taxRate: 0,
      notes,
    };
    onSave(invoice);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="input-field"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Business Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Business Name"
            value={business.name}
            onChange={e => setBusiness({ ...business, name: e.target.value })}
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Business Email"
            value={business.email}
            onChange={e => setBusiness({ ...business, email: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Business Address"
            value={business.address}
            onChange={e => setBusiness({ ...business, address: e.target.value })}
            className="input-field"
          />
          <input
            type="tel"
            placeholder="Business Phone"
            value={business.phone}
            onChange={e => setBusiness({ ...business, phone: e.target.value })}
            className="input-field"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Client Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Client Name"
            value={client.name}
            onChange={e => setClient({ ...client, name: e.target.value })}
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Client Email"
            value={client.email}
            onChange={e => setClient({ ...client, email: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Client Address"
            value={client.address}
            onChange={e => setClient({ ...client, address: e.target.value })}
            className="input-field"
          />
          <input
            type="tel"
            placeholder="Client Phone"
            value={client.phone}
            onChange={e => setClient({ ...client, phone: e.target.value })}
            className="input-field"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Line Items</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-6">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={e => updateItem(item.id, 'description', e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="Hours"
                  value={item.quantity}
                  min="1"
                  onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                  className="input-field"
                  step="0.01"
                  required
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  min="0"
                  step="0.01"
                  onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value))}
                  className="input-field"
                  required
                />
              </div>
              <div className="col-span-1 flex justify-end">
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-5 h-5 mr-1" /> Add Item
          </button>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center mt-2 text-lg font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="input-field h-24"
            placeholder="Additional notes..."
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onGeneratePdf}
          className="btn-secondary"
        >
          <FileDown className="w-5 h-5 mr-2" /> Download PDF
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          <Save className="w-5 h-5 mr-2" /> {initialData ? 'Update' : 'Save'} Invoice
        </button>
      </div>
    </form>
  );
}
