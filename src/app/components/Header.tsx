'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="bg-red-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <h1 className="text-2xl font-bold tracking-tight text-center w-full">AlertTech</h1>
        </div>
      </div>
    </header>
  );
}
