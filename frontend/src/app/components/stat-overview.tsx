import { Users } from 'lucide-react';

export default function StatOverview({totalUser}: { totalUser: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="rounded-xl border-1 p-4 shadow-sm bg-white">
        <div className="flex justify-between items-start text-sm text-gray-500">
          <span>Total Customers</span>
          <Users className="w-5 h-5" />
        </div>
        <div className="mt-2 text-2xl font-bold text-gray-900">{totalUser}</div>
      </div>
    </div>
  );
}
