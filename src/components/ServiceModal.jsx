import React, { useState } from 'react';
import { X, Save, Briefcase } from 'lucide-react';

export default function ServiceModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    code: `SRV-0${Math.floor(6 + Math.random() * 90)}`,
    name: '',
    category: 'تأشيرات',
    costPrice: 400,
    salePrice: 650,
    currency: 'SAR',
    processingDays: 3,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('يرجى كتابة اسم الخدمة');
      return;
    }
    const cost = parseFloat(formData.costPrice) || 0;
    const sale = parseFloat(formData.salePrice) || 0;
    onSave({
      ...formData,
      profit: sale - cost
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Briefcase style={{ color: 'var(--primary-light)' }} />
            <h3 style={{ fontSize: '1.2rem' }}>إضافة خدمة / تأشيرة جديدة</h3>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="input-group">
                <label className="input-label">كود الخدمة</label>
                <input type="text" className="form-control" value={formData.code} readOnly />
              </div>

              <div className="input-group">
                <label className="input-label">اسم الخدمة / التأشيرة *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="مثال: تأشيرة تزيارة شخصية"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">التصنيف الرئيسي</label>
                <select name="category" className="form-control" value={formData.category} onChange={handleChange}>
                  <option value="تأشيرات">تأشيرات</option>
                  <option value="إقامات">إقامات</option>
                  <option value="تفويض وتصديق">تفويض وتصديق</option>
                  <option value="عمرة وسياحة">عمرة وسياحة</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">أيام الإنجاز المتوقعة</label>
                <input
                  type="number"
                  name="processingDays"
                  className="form-control"
                  value={formData.processingDays}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">سعر التكلفة (SAR)</label>
                <input
                  type="number"
                  name="costPrice"
                  className="form-control"
                  value={formData.costPrice}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">سعر البيع للعميل (SAR)</label>
                <input
                  type="number"
                  name="salePrice"
                  className="form-control"
                  value={formData.salePrice}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">وصف ومتطلبات الخدمة</label>
              <textarea
                name="description"
                className="form-control"
                rows="2"
                placeholder="تفاصيل التقديم، الأوراق المطلوبة، الربط الطبي..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>إلغاء</button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>إضافة الخدمة</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
