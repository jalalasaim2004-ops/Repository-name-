// Initial Realistic Mock Data for Travel & Passport ERP

export const initialPassports = [
  {
    id: 1,
    passportNumber: "A16196549",
    fullName: "محمد أحمد علي الزهراني",
    nationality: "السعودية",
    residencyNumber: "2410982341",
    agency: "مكتب السعادة للخدمات",
    supplier: "المكتب الفني الدولي",
    visaType: "تأشيرة زيارة عمل",
    status: "بالمكتب", // بالمكتب, مع العميل, تم التسليم, معلقة
    receiveDate: "2026-07-20",
    deliveryDate: "2026-08-15",
    amountPaid: 630,
    amountRemaining: 0,
    totalCost: 630,
    currency: "SAR",
    notes: "تم تجهيز الفحص الطبي والتبصيم"
  },
  {
    id: 2,
    passportNumber: "B16367831",
    fullName: "عبد الله عمر الشمري",
    nationality: "اليمن",
    residencyNumber: "2398102934",
    agency: "وكالة الفجر للسفريات",
    supplier: "مؤسسة النجم للتعقيب",
    visaType: "إقامة عمل جديدة",
    status: "بالمكتب",
    receiveDate: "2026-07-24",
    deliveryDate: "2026-08-18",
    amountPaid: 700,
    amountRemaining: 0,
    totalCost: 700,
    currency: "SAR",
    notes: "في انتظار خطاط السفارة"
  },
  {
    id: 3,
    passportNumber: "C12072349",
    fullName: "خالد بن فهد العتيبي",
    nationality: "السعودية",
    residencyNumber: "1098273412",
    agency: "مكتب الأفق العالمي",
    supplier: "المكتب الفني الدولي",
    visaType: "تفويض قيادة / زيارة عائلية",
    status: "مع العميل",
    receiveDate: "2026-07-28",
    deliveryDate: "2026-08-10",
    amountPaid: 400,
    amountRemaining: 220,
    totalCost: 620,
    currency: "SAR",
    notes: "تم تسليم الجواز مؤقتاً للتجديد"
  },
  {
    id: 4,
    passportNumber: "D16230326",
    fullName: "سعيد عبد الرحمن الغامدي",
    nationality: "السودان",
    residencyNumber: "2498109283",
    agency: "وكالة الفجر للسفريات",
    supplier: "مؤسسة النجم للتعقيب",
    visaType: "تأشيرة زيارة شخصية",
    status: "تم التسليم",
    receiveDate: "2026-07-15",
    deliveryDate: "2026-08-01",
    amountPaid: 620,
    amountRemaining: 0,
    totalCost: 620,
    currency: "SAR",
    notes: "تم التسليم للعميل مع سند الاستلام"
  },
  {
    id: 5,
    passportNumber: "E11274758",
    fullName: "طارق زياد القحطاني",
    nationality: "مصر",
    residencyNumber: "2341908234",
    agency: "مكتب السعادة للخدمات",
    supplier: "المكتب الفني الدولي",
    visaType: "تمديد إقامة / خروج وعودة",
    status: "معلقة",
    receiveDate: "2026-08-02",
    deliveryDate: "2026-08-20",
    amountPaid: 300,
    amountRemaining: 320,
    totalCost: 620,
    currency: "SAR",
    notes: "بانتظار السداد المالي المتبقي"
  },
  {
    id: 6,
    passportNumber: "F14981819",
    fullName: "ياسر إبراهيم الدوسري",
    nationality: "السعودية",
    residencyNumber: "1029384756",
    agency: "مكتب النخبة للسفريات",
    supplier: "مؤسسة الأفق المعتمدة",
    visaType: "تأشيرة عمل سائق خاص",
    status: "بالمكتب",
    receiveDate: "2026-08-05",
    deliveryDate: "2026-08-22",
    amountPaid: 900,
    amountRemaining: 0,
    totalCost: 900,
    currency: "SAR",
    notes: "مكتمل الجاهزية للتسليم"
  },
  {
    id: 7,
    passportNumber: "G16349789",
    fullName: "إسلام محمود البقلي",
    nationality: "مصر",
    residencyNumber: "2501928374",
    agency: "مكتب الأفق العالمي",
    supplier: "المكتب الفني الدولي",
    visaType: "تأشيرة زيارة عائلية",
    status: "بالمكتب",
    receiveDate: "2026-08-06",
    deliveryDate: "2026-08-25",
    amountPaid: 630,
    amountRemaining: 0,
    totalCost: 630,
    currency: "SAR",
    notes: "مستندات الرسوم مكتملة"
  }
];

export const initialAgencies = [
  {
    id: 1,
    name: "مكتب السعادة للخدمات",
    code: "AG-101",
    contactPerson: "المهندس عادل العلي",
    phone: "0501234567",
    city: "الرياض",
    totalPassports: 18,
    totalDebit: 42800,
    totalCredit: 32730,
    balance: 10070,
    currency: "SAR"
  },
  {
    id: 2,
    name: "وكالة الفجر للسفريات",
    code: "AG-102",
    contactPerson: "الأستاذ خالد السعدون",
    phone: "0559876543",
    city: "جدة",
    totalPassports: 24,
    totalDebit: 72690,
    totalCredit: 24090,
    balance: 48600,
    currency: "SAR"
  },
  {
    id: 3,
    name: "مكتب الأفق العالمي",
    code: "AG-103",
    contactPerson: "السيد بدر المطيري",
    phone: "0561122334",
    city: "الدمام",
    totalPassports: 12,
    totalDebit: 43640,
    totalCredit: 43640,
    balance: 0,
    currency: "SAR"
  },
  {
    id: 4,
    name: "مكتب النخبة للسفريات",
    code: "AG-104",
    contactPerson: "الأستاذ سلطان العتيبي",
    phone: "0544433221",
    city: "الخبر",
    totalPassports: 30,
    totalDebit: 123250,
    totalCredit: 46290,
    balance: 76960,
    currency: "SAR"
  }
];

export const initialSuppliers = [
  {
    id: 1,
    name: "المكتب الفني الدولي",
    code: "SUP-01",
    contactPerson: "المعقب أحمد حسان",
    phone: "0533322110",
    serviceCategory: "تأشيرات وإقامات",
    totalPassportsProcessed: 45,
    balanceDue: 15100,
    currency: "SAR"
  },
  {
    id: 2,
    name: "مؤسسة النجم للتعقيب",
    code: "SUP-02",
    contactPerson: "أبو فهد القحطاني",
    phone: "0509988776",
    serviceCategory: "تفويض وسفارات",
    totalPassportsProcessed: 32,
    balanceDue: 8820,
    currency: "SAR"
  },
  {
    id: 3,
    name: "مؤسسة الأفق المعتمدة",
    code: "SUP-03",
    contactPerson: "الأستاذ هشام النجار",
    phone: "0567788990",
    serviceCategory: "زيارات وعمرة",
    totalPassportsProcessed: 20,
    balanceDue: 2520,
    currency: "SAR"
  }
];

export const initialServices = [
  {
    id: 1,
    code: "SRV-01",
    name: "تأشيرة زيارة عمل",
    category: "تأشيرات",
    costPrice: 400,
    salePrice: 630,
    profit: 230,
    currency: "SAR",
    processingDays: 3,
    description: "رسوم معالجة التأشيرة والربط بالسفارة"
  },
  {
    id: 2,
    code: "SRV-02",
    name: "إقامة عمل جديدة",
    category: "إقامات",
    costPrice: 400,
    salePrice: 700,
    profit: 300,
    currency: "SAR",
    processingDays: 5,
    description: "إصدار وتوثيق الإقامة الطبية والسفارة"
  },
  {
    id: 3,
    code: "SRV-03",
    name: "تأشيرة زيارة عائلية",
    category: "تأشيرات",
    costPrice: 400,
    salePrice: 620,
    profit: 220,
    currency: "SAR",
    processingDays: 2,
    description: "رسوم التقديم والتصديق"
  },
  {
    id: 4,
    code: "SRV-04",
    name: "تأشيرة عمل سائق خاص",
    category: "تأشيرات",
    costPrice: 600,
    salePrice: 900,
    profit: 300,
    currency: "SAR",
    processingDays: 4,
    description: "تفويض وتصديق مهني"
  },
  {
    id: 5,
    code: "SRV-05",
    name: "تمديد إقامة / خروج وعودة",
    category: "إقامات",
    costPrice: 250,
    salePrice: 400,
    profit: 150,
    currency: "SAR",
    processingDays: 1,
    description: "تجديد وتمديد خروج وعودة"
  }
];

export const initialBonds = [
  {
    id: 1,
    bondNumber: "BOND-2026-001",
    type: "سند قبض", // سند قبض, سند صرف
    partyName: "مكتب السعادة للخدمات",
    amount: 19750,
    currency: "SAR",
    account: "مصرف الراجحي - الحساب الرئيسي",
    date: "2026-08-09",
    statement: "دفعة حساب مقابل تسليم 30 جواز سفر زيارة عمل",
    createdBy: "المدير العام"
  },
  {
    id: 2,
    bondNumber: "BOND-2026-002",
    type: "سند صرف",
    partyName: "المكتب الفني الدولي",
    amount: 8000,
    currency: "SAR",
    account: "البنك الأهلي السعودي",
    date: "2026-08-08",
    statement: "سداد مستحقات معاملات سفارة وتصديقات مهنية",
    createdBy: "المحاسب"
  },
  {
    id: 3,
    bondNumber: "BOND-2026-003",
    type: "سند قبض",
    partyName: "وكالة الفجر للسفريات",
    amount: 12500,
    currency: "SAR",
    account: "خزينة المكتب النقدي",
    date: "2026-08-07",
    statement: "سداد نقدي عن دفعة جوازات رقم 402",
    createdBy: "المحاسب"
  }
];

export const initialExpenses = [
  {
    id: 1,
    category: "رسوم حظر وتصديق",
    amount: 1250,
    currency: "SAR",
    date: "2026-08-05",
    description: "رسوم معاملات مستعجلة من المكتب الفني"
  },
  {
    id: 2,
    category: "إيجار المكتب والخدمات",
    amount: 5000,
    currency: "SAR",
    date: "2026-08-01",
    description: "إيجار الشهري للمقر الرئيسي"
  },
  {
    id: 3,
    category: "مصاريف شحن وبريد سريع",
    amount: 630,
    currency: "SAR",
    date: "2026-08-09",
    description: "إرسال دفعات جوازات لجدة والدمام"
  }
];
