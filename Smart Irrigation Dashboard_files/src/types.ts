export  interface SensorData {
  id: string;
  location: string;
  soilMoisture: number;
  temperature: number;
  waterLevel: number;
  lastUpdate: string;
  status: 'online' | 'offline';
}

export interface IrrigationSystem {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  lastActivated: string;
}

export interface Alert {
  id: string;
  type: 'low_moisture' | 'high_temp' | 'low_water';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}
 