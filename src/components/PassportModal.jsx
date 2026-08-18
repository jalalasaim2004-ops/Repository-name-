import React, { useState } from 'react';
import { X, Save, FileText, User, Globe, Briefcase, Building } from 'lucide-react';

export default function PassportModal({ isOpen, onClose, onSave, passport, agencies, suppliers, services }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState(passport || {
    passportNumber: '',
    fullName: '',
    nationality: 'السعودية',
    residencyNumber: '',
    agency: agencies[0]?.name || '',
    supplier: suppliers[0]?.name || '',
    visaType: services[0]?.name || 'تأشيرة زيارة عمل',
    status: 'بالمكتب',
    receiveDate: new Date().toISOString().slice(0, 10),
    deliveryDate: '',
    amountPaid: 630,
    amountRemaining: 0,
    totalCost: 630,
    currency: 'SAR',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    const selectedService = services.find(s => s.name === e.target.value);
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        visaType: selectedService.name,
        totalCost: selectedService.salePrice,
        amountPaid: selectedService.salePrice,
        amountRemaining: 0
      }));
    } else {
      setFormData(prev => ({ ...prev, visaType: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.passportNumber || !formData.fullName) {
      alert('يرجى ملء رقم الجواز واسم المسافر بشكل صحيح');
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
            <FileText style={{ color: 'var(--primary-light)' }} />
            <h3 style={{ fontSize: '1.2rem' }}>{passport ? 'تعديل بيانات الجواز' : 'تسجيل جواز سفر جديد'}</h3>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="input-group">
                <label className="input-label">رقم الجواز *</label>
                <input
                  type="text"
                  name="passportNumber"
                  className="form-control"
                  placeholder="مثال: A16196549"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">اسم المسافر الكامل *</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="الاسم ثلاثي أو رباعي"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">الجنسية</label>
                <input
                  type="text"
                  name="nationality"
                  className="form-control"
                  placeholder="مثال: السعودية / اليمن / مصر"
                  value={formData.nationality}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">رقم الإقامة (إن وجد)</label>
                <input
                  type="text"
                  name="residencyNumber"
                  className="form-control"
                  placeholder="مثال: 2410982341"
                  value={formData.residencyNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">الوكالة / المكتب الطالب</label>
                <select name="agency" className="form-control" value={formData.agency} onChange={handleChange}>
                  {agencies.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">المورد / المعقب الفني</label>
                <select name="supplier" className="form-control" value={formData.supplier} onChange={handleChange}>
                  {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">نوع الخدمة / التأشيرة</label>
                <select name="visaType" className="form-control" value={formData.visaType} onChange={handleServiceChange}>
                  {services.map(srv => <option key={srv.id} value={srv.name}>{srv.name} ({srv.salePrice} SAR)</option>)}
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">حالة الجواز بالمكتب</label>
                <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
                  <option value="بالمكتب">بالمكتب (جاهز للعمل / قيد الإجراء)</option>
                  <option value="مع العميل">مع العميل (مؤقتاً)</option>
                  <option value="معلقة">معلقة (بانتظار مستندات/مبالغ)</option>
                  <option value="تم التسليم">تم التسليم (نهائي)</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">الإجمالي (SAR)</label>
                <input
                  type="number"
                  name="totalCost"
                  className="form-control"
                  value={formData.totalCost}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">المبلغ المدفوع (SAR)</label>
                <input
                  type="number"
                  name="amountPaid"
                  className="form-control"
                  value={formData.amountPaid}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">ملاحظات وتعليمات هامة</label>
              <textarea
                name="notes"
                className="form-control"
                rows="2"
                placeholder="أي ملاحظات تخص الربط الطبي، التبصيم، أو الفحص..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>إلغاء</button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>حفظ البيانات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
