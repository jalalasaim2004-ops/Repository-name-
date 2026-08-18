import React, { useState } from 'react';
import { X, Printer, CheckCircle, Truck, Building } from 'lucide-react';

export default function BatchDeliveryModal({ isOpen, onClose, passports, agencies, onConfirmDelivery }) {
  if (!isOpen) return null;

  const [selectedAgency, setSelectedAgency] = useState(agencies[0]?.name || '');
  const [selectedPassports, setSelectedPassports] = useState([]);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('تم تسليم الدفعة بحالة جيدة واكتمال المعاملات');

  // Filter passports that are at office and belong to selected agency
  const eligiblePassports = passports.filter(p => p.status === 'بالمكتب' && (selectedAgency ? p.agency === selectedAgency : true));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPassports(eligiblePassports.map(p => p.id));
    } else {
      setSelectedPassports([]);
    }
  };

  const handleTogglePassport = (id) => {
    setSelectedPassports(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDeliver = () => {
    if (selectedPassports.length === 0) {
      alert('يرجى اختيار جواز سفر واحد على الأقل للتسليم');
      return;
    }
    onConfirmDelivery(selectedPassports, recipientName, deliveryNotes);
    alert(`تم تسليم دفعة تحتوي على ${selectedPassports.length} جواز سفر بنجاح!`);
    onClose();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '850px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Truck style={{ color: 'var(--primary-light)' }} />
            <h3 style={{ fontSize: '1.2rem' }}>تسليم دفعات الجوازات للعملاء والوكالات</h3>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Controls Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', background: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div className="input-group">
              <label className="input-label">تصفية حسب الوكالة</label>
              <select className="form-control" value={selectedAgency} onChange={(e) => setSelectedAgency(e.target.value)}>
                <option value="">جميع الوكالات</option>
                {agencies.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">اسم المستلم الرسمي</label>
              <input
                type="text"
                className="form-control"
                placeholder="اسم مندوب الوكالة أو العميل"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">رقم جوال المستلم</label>
              <input
                type="text"
                className="form-control"
                placeholder="05xxxxxxx"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Passports Selection Table */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              الجوازات الجاهزة للتسليم بالمكتب ({eligiblePassports.length})
            </h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--primary-light)', fontWeight: 600 }}>
              المحدد حالياً: {selectedPassports.length} جواز
            </div>
          </div>

          <div className="table-responsive" style={{ maxHeight: '260px' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedPassports.length > 0 && selectedPassports.length === eligiblePassports.length}
                    />
                  </th>
                  <th>رقم الجواز</th>
                  <th>اسم المسافر</th>
                  <th>الوكالة</th>
                  <th>نوع التأشيرة</th>
                  <th>تاريخ الاستلام</th>
                </tr>
              </thead>
              <tbody>
                {eligiblePassports.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                      لا توجد جوازات جاهزة للتسليم حالياً لهذه الوكالة بالمكتب
                    </td>
                  </tr>
                ) : (
                  eligiblePassports.map(p => (
                    <tr key={p.id} onClick={() => handleTogglePassport(p.id)} style={{ cursor: 'pointer' }}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedPassports.includes(p.id)}
                          onChange={() => {}}
                        />
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--primary-light)' }}>{p.passportNumber}</td>
                      <td>{p.fullName}</td>
                      <td>{p.agency}</td>
                      <td><span className="badge badge-info">{p.visaType}</span></td>
                      <td>{p.receiveDate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="input-group">
            <label className="input-label">بيان وملاحظات سند التسليم</label>
            <input
              type="text"
              className="form-control"
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handlePrintReceipt}>
            <Printer size={16} />
            <span>طباعة سند التسليم</span>
          </button>
          <button className="btn btn-success" onClick={handleDeliver}>
            <CheckCircle size={16} />
            <span>تأكيد تسليم الدفعة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
