import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Truck, 
  Briefcase, 
  Users, 
  CreditCard, 
  BarChart3, 
  ShieldCheck,
  Building2,
  FolderOpen
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, counts }) {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم الرئيسية', icon: LayoutDashboard },
    { id: 'passports', label: 'إدارة الجوازات والإقامات', icon: FileText, badge: counts.passports, badgeColor: 'badge-primary' },
    { id: 'delivery', label: 'تسليم الجوازات والدفعات', icon: Truck, badge: counts.pendingDelivery, badgeColor: 'badge-warning' },
    { id: 'services', label: 'دليل الخدمات والتأشيرات', icon: Briefcase },
    { id: 'agencies', label: 'الوكلاء والموردين', icon: Users },
    { id: 'finance', label: 'المالية والسندات والحسابات', icon: CreditCard },
    { id: 'reports', label: 'التقارير الشاملة والطباعة', icon: BarChart3 },
  ];

  return (
    <aside className="sidebar glass-panel no-print" style={{ width: '280px', margin: '16px 0 16px 16px', display: 'flex', flexDirection: 'column' }}>
      {/* Brand Header */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '12px',
          background: 'var(--primary-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(13, 148, 136, 0.4)'
        }}>
          <ShieldCheck size={26} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>نظام السريع ERP</h2>
          <span style={{ fontSize: '0.78rem', color: 'var(--primary-light)', fontWeight: 600 }}>إدارة الجوازات والتأشيرات</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'rgba(13, 148, 136, 0.18)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                border: isActive ? '1px solid rgba(13, 148, 136, 0.4)' : '1px solid transparent',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                fontWeight: isActive ? '700' : '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'right'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={20} style={{ color: isActive ? 'var(--primary-light)' : 'inherit' }} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`badge ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Footer info */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Building2 size={14} />
          <span>فرع المركز الرئيسي - الرياض</span>
        </div>
        <div style={{ color: 'var(--success)', fontWeight: 600 }}>● النظام متصل وحالة البيانات ممتازة</div>
      </div>
    </aside>
  );
}
