import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes App',
  description: 'Manage your notes with ease',
};
export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center justify-center px-4 py-10">
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2">📝 Notes Application</h1>
          <p className="text-gray-600 text-sm">Create, read, update, and delete notes with ease.</p>
        </header>

        {/* Navigation */}
        <nav className="mb-6">
          <ul className="flex justify-center gap-6 text-sm font-medium">
            <li>
              <a href="/create" className="text-blue-600 hover:text-blue-800 transition duration-200">
                ✍️ Create Note
              </a>
            </li>
            <li>
              <a href="/read" className="text-blue-600 hover:text-blue-800 transition duration-200">
                📜 Read Notes
              </a>
            </li>
          </ul>
        </nav>

        {/* Content Card */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Welcome to Notes App</h2>
          <p className="text-gray-700 leading-relaxed">
            This application allows you to manage your notes efficiently. You can:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-3 space-y-1">
            <li>Create new notes</li>
            <li>Update existing notes</li>
            <li>Delete notes you no longer need</li>
            <li>Read all your notes in one place</li>
          </ul>
          <p className="text-gray-700 mt-4">Use the navigation links above to get started.</p>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-400 text-xs">
          &copy; 2025 Notes Application. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
