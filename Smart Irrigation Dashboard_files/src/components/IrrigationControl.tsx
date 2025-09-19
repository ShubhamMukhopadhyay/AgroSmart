import  { Play, Square } from 'lucide-react';
import { IrrigationSystem } from '../types';

interface IrrigationControlProps {
  systems: IrrigationSystem[];
}

export default function IrrigationControl({ systems }: IrrigationControlProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Irrigation Control</h3>
      
      <div className="space-y-4">
        {systems.map((system) => (
          <div key={system.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{system.name}</h4>
              <p className="text-sm text-gray-500">Last activated: {system.lastActivated}</p>
            </div>
            
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${
                system.status === 'active'
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {system.status === 'active' ? (
                <>
                  <Square className="w-4 h-4" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
 