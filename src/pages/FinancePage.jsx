import React, { useState } from 'react';
import { CreditCard, Plus, DollarSign, ArrowUpRight, ArrowDownLeft, Building, Wallet } from 'lucide-react';

export default function FinancePage({ bonds, expenses, onOpenNewBond }) {
  const [activeFinanceTab, setActiveFinanceTab] = useState('bonds');

  const totalReceipts = bonds.filter(b => b.type === 'سند قبض').reduce((sum, b) => sum + b.amount, 0);
  const totalPayments = bonds.filter(b => b.type === 'سند صرف').reduce((sum, b) => sum + b.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="page-wrapper">
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">
            <CreditCard style={{ color: 'var(--primary-light)' }} />
            <span>المالية والسندات وتقارير الحسابات البنكية</span>
          </h1>
          <p className="page-subtitle">سندات القبض والصرف الفورية، كشوفات الخزينة، والمصروفات التشغيلية للمكتب</p>
        </div>

        <button className="btn btn-primary" onClick={onOpenNewBond}>
          <Plus size={18} />
          <span>إصدار سند مالي جديد</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="glass-panel stat-card" style={{ '--stat-color': 'var(--success)' }}>
          <div className="stat-icon"><ArrowDownLeft /></div>
          <div className="stat-info">
            <div className="stat-value">{totalReceipts.toLocaleString()} <span style={{ fontSize: '0.85rem' }}>SAR</span></div>
            <div className="stat-label">إجمالي المقبوضات (سندات قبض)</div>
          </div>
        </div>

        <div className="glass-panel stat-card" style={{ '--stat-color': 'var(--warning)' }}>
          <div className="stat-icon"><ArrowUpRight /></div>
          <div className="stat-info">
            <div className="stat-value">{totalPayments.toLocaleString()} <span style={{ fontSize: '0.85rem' }}>SAR</span></div>
            <div className="stat-label">إجمالي المدفوعات للموردين</div>
          </div>
        </div>

        <div className="glass-panel stat-card" style={{ '--stat-color': 'var(--danger)' }}>
          <div className="stat-icon"><Wallet /></div>
          <div className="stat-info">
            <div className="stat-value">{totalExpenses.toLocaleString()} <span style={{ fontSize: '0.85rem' }}>SAR</span></div>
            <div className="stat-label">المصروفات التشغيلية والعمومية</div>
          </div>
        </div>
      </div>

      {/* Finance Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          className={`btn ${activeFinanceTab === 'bonds' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveFinanceTab('bonds')}
        >
          سندات القبض والصرف ({bonds.length})
        </button>
        <button
          className={`btn ${activeFinanceTab === 'expenses' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveFinanceTab('expenses')}
        >
          مصروفات المكتب ({expenses.length})
        </button>
      </div>

      {activeFinanceTab === 'bonds' ? (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '18px' }}>سندات الحركات المالية المسجلة</h3>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>رقم السند</th>
                  <th>نوع السند</th>
                  <th>اسم الجهة / العميل</th>
                  <th>المبلغ بالريال</th>
                  <th>الحساب / الخزينة</th>
                  <th>تاريخ السند</th>
                  <th>بيان وملاحظات السند</th>
                  <th>صادر بواسطة</th>
                </tr>
              </thead>
              <tbody>
                {bonds.map(b => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 800, color: 'var(--primary-light)', fontFamily: 'monospace' }}>{b.bondNumber}</td>
                    <td>
                      <span className={`badge ${b.type === 'سند قبض' ? 'badge-success' : 'badge-warning'}`}>
                        {b.type}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{b.partyName}</td>
                    <td style={{ fontWeight: 800, fontSize: '1rem', color: b.type === 'سند قبض' ? '#34d399' : '#fbbf24' }}>
                      {b.amount.toLocaleString()} SAR
                    </td>
                    <td>{b.account}</td>
                    <td>{b.date}</td>
                    <td>{b.statement}</td>
                    <td><span className="badge badge-info">{b.createdBy}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '18px' }}>المصروفات التشغيلية والعمومية للمكتب</h3>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>بند المصروف</th>
                  <th>التاريخ</th>
                  <th>المبلغ (SAR)</th>
                  <th>تفاصيل المصروف</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e, idx) => (
                  <tr key={e.id}>
                    <td>{idx + 1}</td>
                    <td style={{ fontWeight: 700 }}>{e.category}</td>
                    <td>{e.date}</td>
                    <td style={{ fontWeight: 800, color: '#f87171' }}>{e.amount.toLocaleString()} SAR</td>
                    <td>{e.description}</td>
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
