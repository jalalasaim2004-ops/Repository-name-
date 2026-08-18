import React, { useState } from 'react';
import { Briefcase, Plus, Search, Tag, DollarSign, Clock } from 'lucide-react';

export default function ServicesPage({ services, onOpenNewService }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' ? true : s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-wrapper">
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">
            <Briefcase style={{ color: 'var(--primary-light)' }} />
            <span>دليل الخدمات والتأشيرات والتسعير</span>
          </h1>
          <p className="page-subtitle">إدارة قائمة التأشيرات والخدمات المتاحة وتكاليف الموردين وهامش الأرباح (SAR)</p>
        </div>
        <button className="btn btn-primary" onClick={onOpenNewService}>
          <Plus size={18} />
          <span>إضافة خدمة جديدة</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, maxWidth: '400px' }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="بحث باسم الخدمة أو الكود..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredServices.map(srv => (
          <div key={srv.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span className="badge badge-info">{srv.code}</span>
                <span className="badge badge-primary">{srv.category}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{srv.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{srv.description}</p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>التكلفة: {srv.costPrice} SAR</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-light)' }}>
                  {srv.salePrice} <span style={{ fontSize: '0.8rem' }}>SAR</span>
                </div>
              </div>

              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  <span>{srv.processingDays} أيام إنجاز</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--success)' }}>
                  ربح: +{srv.profit || (srv.salePrice - srv.costPrice)} SAR
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
