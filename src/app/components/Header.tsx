'use client'; // caso esteja usando Next.js com app router

import React from 'react';

export default function Header() {
  return (
    <header className="bg-green-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-center">
            <h1 className="text-2xl font-bold tracking-tight">AlertTech</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
