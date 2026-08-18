import React, { useState } from 'react';
import { X, Save, CreditCard, DollarSign } from 'lucide-react';

export default function BondModal({ isOpen, onClose, onSave, agencies, suppliers }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    bondNumber: `BOND-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    type: 'سند قبض',
    partyName: agencies[0]?.name || '',
    amount: 1000,
    currency: 'SAR',
    account: 'مصرف الراجحي - الحساب الرئيسي',
    date: new Date().toISOString().slice(0, 10),
    statement: 'سداد دفعة حساب مقابل خدمات وجوازات سفر',
    createdBy: 'مدير النظام'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.partyName || !formData.amount) {
      alert('يرجى اختيار الجهة وتحديد المبلغ');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CreditCard style={{ color: 'var(--primary-light)' }} />
            <h3 style={{ fontSize: '1.2rem' }}>إصدار سند مالي جديد (قبض / صرف)</h3>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="input-group">
                <label className="input-label">رقم السند</label>
                <input type="text" className="form-control" value={formData.bondNumber} readOnly />
              </div>

              <div className="input-group">
                <label className="input-label">نوع السند</label>
                <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
                  <option value="سند قبض">سند قبض (استلام أموال من وكيل/عميل)</option>
                  <option value="سند صرف">سند صرف (دفع أموال لمورد/معقب)</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">الجهة / اسم العميل أو الوكيل</label>
                <input
                  type="text"
                  name="partyName"
                  className="form-control"
                  placeholder="اسم الوكالة أو المورد"
                  value={formData.partyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">المبلغ بالريال (SAR)</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">الحساب البنكي / الخزينة</label>
                <select name="account" className="form-control" value={formData.account} onChange={handleChange}>
                  <option value="مصرف الراجحي - الحساب الرئيسي">مصرف الراجحي - الحساب الرئيسي</option>
                  <option value="البنك الأهلي السعودي">البنك الأهلي السعودي</option>
                  <option value="خزينة المكتب النقدي">خزينة المكتب النقدي</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">تاريخ السند</label>
                <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">بيان السند (سبب القبض / الصرف)</label>
              <textarea
                name="statement"
                className="form-control"
                rows="2"
                value={formData.statement}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>إلغاء</button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>إصدار وحفظ السند</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
