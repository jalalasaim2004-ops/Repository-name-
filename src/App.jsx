import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import DashboardPage from './pages/DashboardPage';
import PassportsPage from './pages/PassportsPage';
import DeliveryPage from './pages/DeliveryPage';
import ServicesPage from './pages/ServicesPage';
import AgenciesPage from './pages/AgenciesPage';
import FinancePage from './pages/FinancePage';
import ReportsPage from './pages/ReportsPage';

import PassportModal from './components/PassportModal';
import BatchDeliveryModal from './components/BatchDeliveryModal';
import BondModal from './components/BondModal';
import ServiceModal from './components/ServiceModal';

import { 
  initialPassports, 
  initialAgencies, 
  initialSuppliers, 
  initialServices, 
  initialBonds, 
  initialExpenses 
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Main State
  const [passports, setPassports] = useState(initialPassports);
  const [agencies, setAgencies] = useState(initialAgencies);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [services, setServices] = useState(initialServices);
  const [bonds, setBonds] = useState(initialBonds);
  const [expenses, setExpenses] = useState(initialExpenses);

  // Modals state
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const [editingPassport, setEditingPassport] = useState(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isBondModalOpen, setIsBondModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Counts for sidebar badges
  const counts = {
    passports: passports.length,
    pendingDelivery: passports.filter(p => p.status === 'بالمكتب').length
  };

  // Handlers for Passport
  const handleOpenNewPassport = () => {
    setEditingPassport(null);
    setIsPassportModalOpen(true);
  };

  const handleEditPassport = (passport) => {
    setEditingPassport(passport);
    setIsPassportModalOpen(true);
  };

  const handleSavePassport = (data) => {
    if (editingPassport) {
      setPassports(prev => prev.map(p => p.id === editingPassport.id ? { ...data, id: editingPassport.id } : p));
    } else {
      const newPassport = { ...data, id: Date.now() };
      setPassports(prev => [newPassport, ...prev]);
    }
  };

  const handleDeletePassport = (id) => {
    if (window.confirm('هل أنت تأكد من رغبتك في حذف هذا الجواز من النظام؟')) {
      setPassports(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    setPassports(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  // Handler for Batch Delivery
  const handleConfirmBatchDelivery = (passportIds, recipientName, notes) => {
    setPassports(prev => prev.map(p => passportIds.includes(p.id) ? { ...p, status: 'تم التسليم' } : p));
  };

  // Handler for Bond
  const handleSaveBond = (bondData) => {
    const newBond = { ...bondData, id: Date.now() };
    setBonds(prev => [newBond, ...prev]);
  };

  // Handler for Service
  const handleSaveService = (serviceData) => {
    const newService = { ...serviceData, id: Date.now() };
    setServices(prev => [newService, ...prev]);
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />

      <main className="main-content">
        <Navbar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          passports={passports} 
        />

        {activeTab === 'dashboard' && (
          <DashboardPage
            passports={passports}
            agencies={agencies}
            bonds={bonds}
            setActiveTab={setActiveTab}
            onOpenNewPassport={handleOpenNewPassport}
          />
        )}

        {activeTab === 'passports' && (
          <PassportsPage
            passports={passports}
            searchTerm={searchTerm}
            onOpenNewPassport={handleOpenNewPassport}
            onEditPassport={handleEditPassport}
            onDeletePassport={handleDeletePassport}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {activeTab === 'delivery' && (
          <DeliveryPage
            passports={passports}
            agencies={agencies}
            onOpenBatchModal={() => setIsBatchModalOpen(true)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            services={services}
            onOpenNewService={() => setIsServiceModalOpen(true)}
          />
        )}

        {activeTab === 'agencies' && (
          <AgenciesPage
            agencies={agencies}
            suppliers={suppliers}
          />
        )}

        {activeTab === 'finance' && (
          <FinancePage
            bonds={bonds}
            expenses={expenses}
            onOpenNewBond={() => setIsBondModalOpen(true)}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsPage
            passports={passports}
            agencies={agencies}
            suppliers={suppliers}
            bonds={bonds}
          />
        )}
      </main>

      {/* Modals */}
      <PassportModal
        isOpen={isPassportModalOpen}
        onClose={() => setIsPassportModalOpen(false)}
        onSave={handleSavePassport}
        passport={editingPassport}
        agencies={agencies}
        suppliers={suppliers}
        services={services}
      />

      <BatchDeliveryModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        passports={passports}
        agencies={agencies}
        onConfirmDelivery={handleConfirmBatchDelivery}
      />

      <BondModal
        isOpen={isBondModalOpen}
        onClose={() => setIsBondModalOpen(false)}
        onSave={handleSaveBond}
        agencies={agencies}
        suppliers={suppliers}
      />

      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSave={handleSaveService}
      />
    </div>
  );
}
