import  { Activity, AlertTriangle, Wifi } from 'lucide-react';
import { SensorData } from '../types';

interface SensorCardProps {
  sensor: SensorData;
}

export default function SensorCard({ sensor }: SensorCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{sensor.location}</h3>
        <div className="flex items-center space-x-2">
          {sensor.status === 'online' ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm ${sensor.status === 'online' ? 'text-green-600' : 'text-red-600'}`}>
            {sensor.status}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Soil Moisture</span>
          <span className="text-lg font-semibold text-blue-600">{sensor.soilMoisture}%</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Temperature</span>
          <span className="text-lg font-semibold text-orange-600">{sensor.temperature}°C</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Water Level</span>
          <span className="text-lg font-semibold text-green-600">{sensor.waterLevel}%</span>
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Last update</span>
            <span className="text-xs text-gray-600">{sensor.lastUpdate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 