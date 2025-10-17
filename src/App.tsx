import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">نظام إدارة وسائل التواصل الاجتماعي</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">مرحباً بك في نظام إدارة وسائل التواصل الاجتماعي</h2>
          <p className="text-gray-600 mb-4">
            هذا النظام مصمم لمساعدتك في إدارة حملات التسويق على منصات التواصل الاجتماعي بسهولة وفعالية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-700 mb-2">إدارة الحملات</h3>
              <p className="text-sm text-gray-600">إنشاء وإدارة حملات التسويق بسهولة</p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-700 mb-2">تحليل الأداء</h3>
              <p className="text-sm text-gray-600">متابعة أداء حملاتك وتحليل النتائج</p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-700 mb-2">جدولة المنشورات</h3>
              <p className="text-sm text-gray-600">جدولة منشوراتك للنشر في الوقت المناسب</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
