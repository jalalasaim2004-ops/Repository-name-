import React from 'react';
import { BarChart3, Printer, Download, FileText, CheckCircle, Clock } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function ReportsPage({ passports, agencies, suppliers, bonds }) {
  const handleExportFullReport = () => {
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Passports
    const passportsSheet = XLSX.utils.json_to_sheet(passports.map(p => ({
      "رقم الجواز": p.passportNumber,
      "الاسم": p.fullName,
      "الجنسية": p.nationality,
      "الوكالة": p.agency,
      "المورد": p.supplier,
      "التأشيرة": p.visaType,
      "الحالة": p.status,
      "المدفوع": p.amountPaid,
      "المتبقي": p.amountRemaining
    })));
    XLSX.utils.book_append_sheet(workbook, passportsSheet, "تقرير الجوازات");

    // Sheet 2: Agencies
    const agenciesSheet = XLSX.utils.json_to_sheet(agencies.map(a => ({
      "كود الوكالة": a.code,
      "الاسم": a.name,
      "إجمالي الجوازات": a.totalPassports,
      "المستحقات": a.totalDebit,
      "المدفوعات": a.totalCredit,
      "الرصيد": a.balance
    })));
    XLSX.utils.book_append_sheet(workbook, agenciesSheet, "تقرير الوكالات");

    XLSX.writeFile(workbook, `تقرير_النظام_الشامل_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-wrapper">
      {/* Title & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">
            <BarChart3 style={{ color: 'var(--primary-light)' }} />
            <span>التقارير الشاملة وإحصائيات العمل</span>
          </h1>
          <p className="page-subtitle">تقارير حركية تفصيلية جاهزة للطباعة والتصدير لكل أقسام النظام</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={handleExportFullReport}>
            <Download size={16} style={{ color: 'var(--success)' }} />
            <span>تصدير التقرير الشامل Excel</span>
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={16} />
            <span>طباعة التقرير الشامل</span>
          </button>
        </div>
      </div>

      {/* Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '12px', color: 'var(--primary-light)' }}>تقرير حالات الجوازات</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>جوازات بالمكتب:</span>
              <strong style={{ color: '#fbbf24' }}>{passports.filter(p => p.status === 'بالمكتب').length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>جوازات مع العملاء:</span>
              <strong>{passports.filter(p => p.status === 'مع العميل').length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>جوازات معلقة:</span>
              <strong style={{ color: '#f87171' }}>{passports.filter(p => p.status === 'معلقة').length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>تم التسليم نهائياً:</span>
              <strong style={{ color: '#34d399' }}>{passports.filter(p => p.status === 'تم التسليم').length}</strong>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '12px', color: 'var(--accent-gold)' }}>التقرير المالي العام</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>إجمالي المبالغ المدفوعة:</span>
              <strong style={{ color: '#34d399' }}>{passports.reduce((sum, p) => sum + p.amountPaid, 0).toLocaleString()} SAR</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>المبالغ المتبقية للتحصيل:</span>
              <strong style={{ color: '#f87171' }}>{passports.reduce((sum, p) => sum + p.amountRemaining, 0).toLocaleString()} SAR</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>عدد سندات القبض:</span>
              <strong>{bonds.filter(b => b.type === 'سند قبض').length} سند</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>عدد سندات الصرف:</span>
              <strong>{bonds.filter(b => b.type === 'سند صرف').length} سند</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
