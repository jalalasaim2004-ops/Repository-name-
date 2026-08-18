import React, { useState } from 'react';
import { FileText, Plus, Filter, Edit, Trash2, CheckCircle2, Download, Search } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function PassportsPage({ passports, searchTerm, onOpenNewPassport, onEditPassport, onDeletePassport, onUpdateStatus }) {
  const [filterStatus, setFilterStatus] = useState('الكل');
  const [filterAgency, setFilterAgency] = useState('الكل');

  // Filter passports
  const filteredPassports = passports.filter(p => {
    const matchesSearch = 
      p.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.residencyNumber && p.residencyNumber.includes(searchTerm));

    const matchesStatus = filterStatus === 'الكل' ? true : p.status === filterStatus;
    const matchesAgency = filterAgency === 'الكل' ? true : p.agency === filterAgency;

    return matchesSearch && matchesStatus && matchesAgency;
  });

  const agenciesList = Array.from(new Set(passports.map(p => p.agency)));

  const handleExportFilteredExcel = () => {
    const exportData = filteredPassports.map(p => ({
      "رقم الجواز": p.passportNumber,
      "اسم المسافر": p.fullName,
      "الجنسية": p.nationality,
      "رقم الإقامة": p.residencyNumber || '-',
      "الوكالة": p.agency,
      "المورد": p.supplier,
      "نوع التأشيرة": p.visaType,
      "الحالة": p.status,
      "تاريخ الاستلام": p.receiveDate,
      "المبلغ المدفوع (SAR)": p.amountPaid,
      "المتبقي (SAR)": p.amountRemaining,
      "الإجمالي (SAR)": p.totalCost,
      "ملاحظات": p.notes
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "الجوازات_المفلترة");
    XLSX.writeFile(workbook, `قائمة_الجوازات_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div className="page-wrapper">
      {/* Title & Top Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">
            <FileText style={{ color: 'var(--primary-light)' }} />
            <span>إدارة الجوازات والإقامات والتأشيرات</span>
          </h1>
          <p className="page-subtitle">استعراض وتصفية وتحديث جميع الجوازات والمعاملات بالمكتب</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={handleExportFilteredExcel}>
            <Download size={16} style={{ color: 'var(--success)' }} />
            <span>تصدير القائمة لـ Excel</span>
          </button>
          <button className="btn btn-primary" onClick={onOpenNewPassport}>
            <Plus size={18} />
            <span>تسجيل جواز سفر جديد</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
            <Filter size={16} />
            <span>تصفية النتائج:</span>
          </div>

          <select className="form-control" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: '180px' }}>
            <option value="الكل">جميع الحالات</option>
            <option value="بالمكتب">بالمكتب</option>
            <option value="مع العميل">مع العميل</option>
            <option value="معلقة">معلقة</option>
            <option value="تم التسليم">تم التسليم</option>
          </select>

          <select className="form-control" value={filterAgency} onChange={(e) => setFilterAgency(e.target.value)} style={{ width: '200px' }}>
            <option value="الكل">جميع الوكالات</option>
            {agenciesList.map((ag, i) => <option key={i} value={ag}>{ag}</option>)}
          </select>
        </div>

        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          عرض <strong style={{ color: 'var(--primary-light)' }}>{filteredPassports.length}</strong> من أصل {passports.length} جواز
        </div>
      </div>

      {/* Passports Main Table */}
      <div className="glass-panel">
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>رقم الجواز</th>
                <th>اسم المسافر الكامل</th>
                <th>الجنسية / الإقامة</th>
                <th>الوكالة</th>
                <th>المورد / المعقب</th>
                <th>نوع التأشيرة / الخدمة</th>
                <th>الحالة</th>
                <th>المدفوع / الإجمالي</th>
                <th>تاريخ الاستلام</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredPassports.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    لا توجد جوازات مطابقة لمعايير البحث الحالية
                  </td>
                </tr>
              ) : (
                filteredPassports.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 800, color: 'var(--primary-light)', fontFamily: 'monospace', fontSize: '1rem' }}>
                      {p.passportNumber}
                    </td>
                    <td style={{ fontWeight: 700 }}>{p.fullName}</td>
                    <td>
                      <div>{p.nationality}</div>
                      {p.residencyNumber && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>رقم: {p.residencyNumber}</div>}
                    </td>
                    <td>{p.agency}</td>
                    <td>{p.supplier}</td>
                    <td><span className="badge badge-info">{p.visaType}</span></td>
                    <td>
                      <select
                        className="form-control"
                        value={p.status}
                        onChange={(e) => onUpdateStatus(p.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          fontSize: '0.8rem',
                          height: 'auto',
                          background: 'rgba(15,23,42,0.9)',
                          color: p.status === 'تم التسليم' ? '#34d399' : p.status === 'معلقة' ? '#f87171' : '#fbbf24'
                        }}
                      >
                        <option value="بالمكتب">بالمكتب</option>
                        <option value="مع العميل">مع العميل</option>
                        <option value="معلقة">معلقة</option>
                        <option value="تم التسليم">تم التسليم</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{p.amountPaid} / {p.totalCost} SAR</div>
                      {p.amountRemaining > 0 && <div style={{ fontSize: '0.75rem', color: '#f87171' }}>متبقي: {p.amountRemaining} SAR</div>}
                    </td>
                    <td>{p.receiveDate}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => onEditPassport(p)} title="تعديل">
                          <Edit size={14} />
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => onDeletePassport(p.id)} title="حذف">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
