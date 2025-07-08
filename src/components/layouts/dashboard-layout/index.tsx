import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
            🧑‍💼 User Management
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Manage your users with full CRUD operations and smooth experience.
          </p>
        </header>

        {/* Content Card */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all">
          {children}
        </section>

        {/* Optional Footer */}
        <footer className="mt-10 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
