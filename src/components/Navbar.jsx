import React from 'react';
import { Search, Bell, Printer, Download, UserCheck, Calendar } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function Navbar({ searchTerm, setSearchTerm, passports }) {
  const todayDate = new Date().toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleExportExcel = () => {
    const exportData = passports.map(p => ({
      "رقم الجواز": p.passportNumber,
      "اسم المسافر": p.fullName,
      "الجنسية": p.nationality,
      "رقم الإقامة": p.residencyNumber || '-',
      "الوكالة": p.agency,
      "المورد": p.supplier,
      "نوع التأشيرة": p.visaType,
      "الحالة": p.status,
      "تاريخ الاستلام": p.receiveDate,
      "المبلغ المدفوع": p.amountPaid,
      "المبلغ المتبقي": p.amountRemaining,
      "الإجمالي (SAR)": p.totalCost,
      "ملاحظات": p.notes
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "الجوازات");
    XLSX.writeFile(workbook, `كشف_الجوازات_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="glass-panel no-print" style={{ margin: '16px 16px 0 16px', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
      {/* Search Input */}
      <div style={{ position: 'relative', flex: 1, maxWidth: '420px' }}>
        <Search size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          className="form-control"
          placeholder="بحث سريع برقم الجواز، اسم المسافر، الوكالة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', paddingRight: '40px' }}
        />
      </div>

      {/* Action Controls & Date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <Calendar size={15} style={{ color: 'var(--primary-light)' }} />
          <span>{todayDate}</span>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={handleExportExcel} title="تصدير كشف الجوازات إلى ملف Excel">
          <Download size={16} style={{ color: 'var(--success)' }} />
          <span>تصدير Excel</span>
        </button>

        <button className="btn btn-secondary btn-sm" onClick={handlePrint} title="طباعة الصفحة الحالية">
          <Printer size={16} />
          <span>طباعة</span>
        </button>

        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
            <Bell size={18} />
          </div>
          <span style={{ position: 'absolute', top: '-4px', left: '-4px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-gold)' }}></span>
        </div>

        {/* User Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingRight: '12px', borderRight: '1px solid var(--border-color)' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
            <UserCheck size={20} />
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>مدير النظام</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>صلاحية كاملة</span>
          </div>
        </div>
      </div>
    </header>
  );
}
