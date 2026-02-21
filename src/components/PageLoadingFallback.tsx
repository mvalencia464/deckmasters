import React from 'react';

const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-stone-900">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
      <p className="text-stone-400 text-lg">Loading...</p>
    </div>
  </div>
);

export default PageLoadingFallback;

