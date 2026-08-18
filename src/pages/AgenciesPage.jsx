import React, { useState } from 'react';
import { Users, Building2, UserCheck, DollarSign, Phone, MapPin } from 'lucide-react';

export default function AgenciesPage({ agencies, suppliers }) {
  const [activeSubTab, setActiveSubTab] = useState('agencies'); // 'agencies' or 'suppliers'

  return (
    <div className="page-wrapper">
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">
            <Users style={{ color: 'var(--primary-light)' }} />
            <span>إدارة الوكلاء والموردين وكشوفات الحسابات</span>
          </h1>
          <p className="page-subtitle">تتبع مديونيات الشركات المتعاقدة، وكالات السفر والمكاتب الفنية والمعقبين</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: 'rgba(15,23,42,0.8)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <button
            className={`btn btn-sm ${activeSubTab === 'agencies' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveSubTab('agencies')}
          >
            وكالات السفر والعملاء ({agencies.length})
          </button>
          <button
            className={`btn btn-sm ${activeSubTab === 'suppliers' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveSubTab('suppliers')}
          >
            الموردين والمعقبين ({suppliers.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'agencies' ? (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '18px' }}>حسابات وتفاصيل وكالات السفر</h3>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>كود الوكالة</th>
                  <th>اسم الوكالة / الشركة</th>
                  <th>المسؤول المباشر</th>
                  <th>رقم التواصل</th>
                  <th>المدينة</th>
                  <th>الجوازات المسجلة</th>
                  <th>إجمالي المستحقات</th>
                  <th>المدفوعات</th>
                  <th>الرصيد المتبقي (SAR)</th>
                </tr>
              </thead>
              <tbody>
                {agencies.map(ag => (
                  <tr key={ag.id}>
                    <td style={{ fontWeight: 700, color: 'var(--primary-light)' }}>{ag.code}</td>
                    <td style={{ fontWeight: 700 }}>{ag.name}</td>
                    <td>{ag.contactPerson}</td>
                    <td>{ag.phone}</td>
                    <td>{ag.city}</td>
                    <td><span className="badge badge-info">{ag.totalPassports} جواز</span></td>
                    <td>{ag.totalDebit.toLocaleString()} SAR</td>
                    <td>{ag.totalCredit.toLocaleString()} SAR</td>
                    <td style={{ fontWeight: 800, color: ag.balance > 0 ? '#f87171' : '#34d399', fontSize: '1rem' }}>
                      {ag.balance.toLocaleString()} SAR
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '18px' }}>حسابات وتفاصيل الموردين والمعقبين الفنيين</h3>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>كود المورد</th>
                  <th>اسم المورد / المكتب الفني</th>
                  <th>المعقب المسؤول</th>
                  <th>رقم التواصل</th>
                  <th>تخصص المعاملات</th>
                  <th>جوازات تمت معالجتها</th>
                  <th>المستحقات الحالية (SAR)</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(sup => (
                  <tr key={sup.id}>
                    <td style={{ fontWeight: 700, color: 'var(--primary-light)' }}>{sup.code}</td>
                    <td style={{ fontWeight: 700 }}>{sup.name}</td>
                    <td>{sup.contactPerson}</td>
                    <td>{sup.phone}</td>
                    <td><span className="badge badge-primary">{sup.serviceCategory}</span></td>
                    <td><span className="badge badge-info">{sup.totalPassportsProcessed} جواز</span></td>
                    <td style={{ fontWeight: 800, color: '#f59e0b', fontSize: '1rem' }}>
                      {sup.balanceDue.toLocaleString()} SAR
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
