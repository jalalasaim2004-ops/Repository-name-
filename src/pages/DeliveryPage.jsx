import React, { useState } from 'react';
import { Truck, CheckCircle, Printer, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';

export default function DeliveryPage({ passports, agencies, onOpenBatchModal }) {
  const inOfficePassports = passports.filter(p => p.status === 'بالمكتب');
  const deliveredPassports = passports.filter(p => p.status === 'تم التسليم');

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">
            <Truck style={{ color: 'var(--primary-light)' }} />
            <span>تسليم الجوازات وتسليم الدفعات الجماعية</span>
          </h1>
          <p className="page-subtitle">متابعة الجوازات المتبقية بالمكتب وتوليد كشوفات تسليم الدفعات للعملاء والوكلاء</p>
        </div>
        <button className="btn btn-primary" onClick={onOpenBatchModal}>
          <CheckCircle size={18} />
          <span>تسليم دفعة جديدة للعميل / الوكيل</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="stats-grid">
        <div className="glass-panel stat-card" style={{ '--stat-color': 'var(--warning)' }}>
          <div className="stat-icon"><AlertCircle /></div>
          <div className="stat-info">
            <div className="stat-value">{inOfficePassports.length}</div>
            <div className="stat-label">جوازات متبقية بالمكتب جاهزة للتسليم</div>
          </div>
        </div>

        <div className="glass-panel stat-card" style={{ '--stat-color': 'var(--success)' }}>
          <div className="stat-icon"><CheckCircle /></div>
          <div className="stat-info">
            <div className="stat-value">{deliveredPassports.length}</div>
            <div className="stat-label">إجمالي الجوازات المسلمة نهائياً</div>
          </div>
        </div>
      </div>

      {/* Main Table: In Office Passports */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={18} style={{ color: 'var(--primary-light)' }} />
          <span>قائمة الجوازات المتبقية في المكتب (غير الموزعة)</span>
        </h3>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>رقم الجواز</th>
                <th>اسم المسافر</th>
                <th>الوكالة الطالبة</th>
                <th>نوع التأشيرة</th>
                <th>تاريخ الاستلام</th>
                <th>مستحقات مالية</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {inOfficePassports.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    ممتاز! لا توجد أي جوازات متبقية في المكتب غير مسلمة.
                  </td>
                </tr>
              ) : (
                inOfficePassports.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 800, color: 'var(--primary-light)' }}>{p.passportNumber}</td>
                    <td style={{ fontWeight: 700 }}>{p.fullName}</td>
                    <td>{p.agency}</td>
                    <td><span className="badge badge-info">{p.visaType}</span></td>
                    <td>{p.receiveDate}</td>
                    <td>
                      {p.amountRemaining > 0 ? (
                        <span className="badge badge-danger">متبقي {p.amountRemaining} SAR</span>
                      ) : (
                        <span className="badge badge-success">مسدد بالكامل</span>
                      )}
                    </td>
                    <td><span className="badge badge-warning">جاهز بالمكتب</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Delivery Receipt Template (hidden on screen, visible during window.print()) */}
      <div className="printable-receipt" style={{ display: 'none' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '12px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>مكتب السريع لخدمات السفر والجوازات والتأشيرات</h2>
          <p style={{ fontSize: '0.9rem' }}>سند تسليم دفعة جوازات سفر رسمية</p>
          <div style={{ fontSize: '0.85rem', marginTop: '6px' }}>التاريخ: {new Date().toLocaleDateString('ar-SA')}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '0.95rem' }}>
          <div><strong>الجهة المستلمة:</strong> ........................................</div>
          <div><strong>اسم المندوب:</strong> ........................................</div>
          <div><strong>رقم التواصل:</strong> ........................................</div>
        </div>

        <table className="printable-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th style={{ padding: '8px', textAlign: 'right' }}>#</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>رقم الجواز</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>اسم المسافر</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>نوع التأشيرة</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>ملاحظات التسليم</th>
            </tr>
          </thead>
          <tbody>
            {inOfficePassports.slice(0, 8).map((p, idx) => (
              <tr key={p.id}>
                <td style={{ padding: '8px' }}>{idx + 1}</td>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>{p.passportNumber}</td>
                <td style={{ padding: '8px' }}>{p.fullName}</td>
                <td style={{ padding: '8px' }}>{p.visaType}</td>
                <td style={{ padding: '8px' }}>مكتمل التوثيق</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div><strong>توقيع المستلم:</strong></div>
            <div style={{ marginTop: '40px' }}>..........................................</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div><strong>ختم وتوقيع المكتب:</strong></div>
            <div style={{ marginTop: '40px' }}>..........................................</div>
          </div>
        </div>
      </div>
    </div>
  );
}
