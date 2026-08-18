import React from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp,
  PlusCircle,
  Truck,
  Building
} from 'lucide-react';

export default function DashboardPage({ passports, agencies, bonds, setActiveTab, onOpenNewPassport }) {
  const totalPassports = passports.length;
  const inOfficeCount = passports.filter(p => p.status === 'بالمكتب').length;
  const pendingCount = passports.filter(p => p.status === 'معلقة').length;
  const deliveredCount = passports.filter(p => p.status === 'تم التسليم').length;

  const totalRevenue = passports.reduce((sum, p) => sum + (p.amountPaid || 0), 0);
  const totalRemaining = passports.reduce((sum, p) => sum + (p.amountRemaining || 0), 0);

  const recentPassports = passports.slice(0, 5);

  return (
    <div className="page-wrapper">
      {/* Title & Quick Add */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">
            <span style={{ color: 'var(--primary-light)' }}>مرحباً بك!</span> لوحة المعاينة والمؤشرات
          </h1>
          <p className="page-subtitle">ملخص حركة الجوازات والتأشيرات والإقامات والتحصيلات المالية اليومية</p>
        </div>
        <button className="btn btn-primary" onClick={onOpenNewPassport}>
          <PlusCircle size={18} />
          <span>تسجيل جواز سفر جديد</span>
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="stats-grid">
        <div className="glass-panel stat-card" style={{ '--stat-color': 'var(--primary)' }}>
          <div className="stat-icon"><FileText /></div>
          <div className="stat-info">
            <div className="stat-value">{totalPassports}</div>
            <div className="stat-label">إجمالي الجوازات بالنظام</div>
          </div>
        </div>

        <div className="glass-panel stat-card" style={{ '--stat-color': 'var(--warning)' }}>
          <div className="stat-icon"><Clock /></div>
          <div className="stat-info">
            <div className="stat-value">{inOfficeCount}</div>
            <div className="stat-label">جوازات متبقية بالمكتب</div>
          </div>
        </div>

        <div className="glass-panel stat-card" style={{ '--stat-color': 'var(--danger)' }}>
          <div className="stat-icon"><AlertTriangle /></div>
          <div className="stat-info">
            <div className="stat-value">{pendingCount}</div>
            <div className="stat-label">جوازات معلقة (مستحقات)</div>
          </div>
        </div>

        <div className="glass-panel stat-card" style={{ '--stat-color': 'var(--success)' }}>
          <div className="stat-icon"><CheckCircle2 /></div>
          <div className="stat-info">
            <div className="stat-value">{deliveredCount}</div>
            <div className="stat-label">جوازات تم تسليمها</div>
          </div>
        </div>

        <div className="glass-panel stat-card" style={{ '--stat-color': 'var(--info)' }}>
          <div className="stat-icon"><TrendingUp /></div>
          <div className="stat-info">
            <div className="stat-value">{totalRevenue.toLocaleString()} <span style={{ fontSize: '0.9rem' }}>SAR</span></div>
            <div className="stat-label">إجمالي المقبوضات المباشرة</div>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column: Recent Passports */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} style={{ color: 'var(--primary-light)' }} />
              <span>آخر الجوازات المعالجة حديثاً</span>
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('passports')}>
              عرض الكل ({totalPassports})
            </button>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>رقم الجواز</th>
                  <th>اسم المسافر</th>
                  <th>الوكالة</th>
                  <th>نوع التأشيرة</th>
                  <th>الحالة</th>
                  <th>المبلغ</th>
                </tr>
              </thead>
              <tbody>
                {recentPassports.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 700, color: 'var(--primary-light)' }}>{p.passportNumber}</td>
                    <td style={{ fontWeight: 600 }}>{p.fullName}</td>
                    <td>{p.agency}</td>
                    <td><span className="badge badge-info">{p.visaType}</span></td>
                    <td>
                      <span className={`badge ${
                        p.status === 'بالمكتب' ? 'badge-warning' :
                        p.status === 'تم التسليم' ? 'badge-success' :
                        p.status === 'معلقة' ? 'badge-danger' : 'badge-primary'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{p.amountPaid} SAR</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Agencies Balance Overview & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={18} style={{ color: 'var(--accent-gold)' }} />
              <span>أعلى المديونيات والوكالات</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {agencies.map(ag => (
                <div key={ag.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(15,23,42,0.6)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ag.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ag.totalPassports} جواز مسجل</div>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800, color: ag.balance > 0 ? '#f87171' : '#34d399' }}>
                      {ag.balance.toLocaleString()} SAR
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {ag.balance > 0 ? 'مستحق للمكتب' : 'متوازن'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>إجراءات سريعة</h4>
            <button className="btn btn-secondary" onClick={() => setActiveTab('delivery')} style={{ justifyContent: 'flex-start' }}>
              <Truck size={18} style={{ color: 'var(--warning)' }} />
              <span>تسليم دفعة جوازات لعميل</span>
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('finance')} style={{ justifyContent: 'flex-start' }}>
              <DollarSign size={18} style={{ color: 'var(--success)' }} />
              <span>إصدار سند قبض / صرف مالي</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
