import React from "react";

export default function Loading() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="grid grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="col-span-1 h-32 bg-gray-300 rounded"></div>
          ))}
      </div>
      <div className="grid grid-cols-1 gap-4 mt-6">
        <div className="h-12 bg-gray-300 rounded"></div>
        <div className="h-64 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
