import  { SensorData, IrrigationSystem, Alert } from './types';

export const sensorData: SensorData[] = [
  {
    id: '1',
    location: 'Field A - Upper Hill',
    soilMoisture: 35,
    temperature: 28,
    waterLevel: 75,
    lastUpdate: '2 mins ago',
    status: 'online'
  },
  {
    id: '2',
    location: 'Field B - Mid Hill',
    soilMoisture: 15,
    temperature: 32,
    waterLevel: 45,
    lastUpdate: '1 min ago',
    status: 'online'
  },
  {
    id: '3',
    location: 'Field C - Lower Hill',
    soilMoisture: 65,
    temperature: 26,
    waterLevel: 85,
    lastUpdate: '5 mins ago',
    status: 'offline'
  }
];

export const irrigationSystems: IrrigationSystem[] = [
  {
    id: '1',
    name: 'Drip System A',
    status: 'active',
    lastActivated: '10 mins ago'
  },
  {
    id: '2',
    name: 'Sprinkler B',
    status: 'inactive',
    lastActivated: '2 hours ago'
  }
];

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'low_moisture',
    message: 'Field B soil moisture below threshold (15%)',
    severity: 'high',
    timestamp: '5 mins ago'
  },
  {
    id: '2',
    type: 'high_temp',
    message: 'Field B temperature exceeds 30°C',
    severity: 'medium',
    timestamp: '8 mins ago'
  }
];

export const historicalData = [
  { time: '00:00', moisture: 45, temp: 24, water: 80 },
  { time: '04:00', moisture: 42, temp: 22, water: 78 },
  { time: '08:00', moisture: 35, temp: 26, water: 75 },
  { time: '12:00', moisture: 28, temp: 30, water: 70 },
  { time: '16:00', moisture: 25, temp: 32, water: 65 },
  { time: '20:00', moisture: 30, temp: 28, water: 68 }
];
 