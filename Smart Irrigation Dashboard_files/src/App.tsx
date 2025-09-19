import  { useState, useEffect } from 'react';
import  { Activity, AlertTriangle, Bell, Play, Square, Wifi, Settings, User, Menu, X, Home, MapPin, Clock, RefreshCw, Check, Droplets, Zap, Database, ChevronDown, ChevronUp } from 'lucide-react'; 

interface SensorData {
  id: string;
  location: string;
  depth: string;
  soilMoisture: number;
  temperature: number;
  waterLevel: number;
  status: 'online' | 'offline';
  lastUpdate: string;
}

interface IrrigationSystem {
  id: string;
  name: string;
  segment: string;
  status: 'active' | 'inactive' | 'scheduled';
  lastActivated: string;
  valveType: 'magnetic' | 'solenoid';
  sensors: string[];
  priority: number;
}

interface Alert {
  id: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  type: 'sensor' | 'valve' | 'tank' | 'system';
}

interface TankData {
  id: string;
  name: string;
  level: number;
  capacity: number;
  status: 'normal' | 'low' | 'critical';
  type: 'header' | 'master' | 'collection';
}

export default function App() {
  const [sensorData, setSensorData] = useState<SensorData[]>([
    { id: '1', location: 'Terrace A1', depth: 'Surface (5cm)', soilMoisture: 45, temperature: 24, waterLevel: 78, status: 'online', lastUpdate: '2 mins ago' },
    { id: '2', location: 'Terrace A1', depth: 'Mid (15cm)', soilMoisture: 62, temperature: 22, waterLevel: 78, status: 'online', lastUpdate: '2 mins ago' },
    { id: '3', location: 'Terrace A1', depth: 'Deep (30cm)', soilMoisture: 71, temperature: 21, waterLevel: 78, status: 'online', lastUpdate: '2 mins ago' },
    { id: '4', location: 'Valley S1', depth: 'Surface (5cm)', soilMoisture: 28, temperature: 26, waterLevel: 85, status: 'online', lastUpdate: '1 min ago' },
    { id: '5', location: 'Valley S1', depth: 'Mid (15cm)', soilMoisture: 35, temperature: 24, waterLevel: 85, status: 'online', lastUpdate: '1 min ago' },
    { id: '6', location: 'Valley S2', depth: 'Surface (5cm)', soilMoisture: 52, temperature: 25, waterLevel: 85, status: 'offline', lastUpdate: '15 mins ago' }
  ]);

  const [systems, setSystems] = useState<IrrigationSystem[]>([
    { id: '1', name: 'Terrace A1 Valve', segment: 'Terrace A1', status: 'inactive', lastActivated: '3 hours ago', valveType: 'magnetic', sensors: ['1', '2', '3'], priority: 1 },
    { id: '2', name: 'Valley S1 Valve', segment: 'Valley S1', status: 'active', lastActivated: '10 mins ago', valveType: 'magnetic', sensors: ['4', '5'], priority: 2 },
    { id: '3', name: 'Valley S2 Valve', segment: 'Valley S2', status: 'scheduled', lastActivated: '2 hours ago', valveType: 'solenoid', sensors: ['6'], priority: 3 }
  ]);

  const [tanks, setTanks] = useState<TankData[]>([
    { id: '1', name: 'Header Tank', level: 15, capacity: 5000, status: 'critical', type: 'header' },
    { id: '2', name: 'Master Tank', level: 78, capacity: 10000, status: 'normal', type: 'master' },
    { id: '3', name: 'Rain Collection', level: 92, capacity: 3000, status: 'normal', type: 'collection' }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', message: 'Header Tank critically low - Turn ON Motor to Refill', severity: 'high', timestamp: '5 mins ago', type: 'tank' },
    { id: '2', message: 'Valley S1 sensors detect dry soil - Auto irrigation active', severity: 'medium', timestamp: '10 mins ago', type: 'sensor' },
    { id: '3', message: 'Valley S2 sensor offline - Manual check required', severity: 'medium', timestamp: '15 mins ago', type: 'sensor' }
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedSegments, setExpandedSegments] = useState<string[]>(['Terrace A1']);

  const getSegmentSensors = (segment: string) => {
    return sensorData.filter(sensor => sensor.location === segment);
  };

  const getSegmentMoistureStatus = (segment: string) => {
    const sensors = getSegmentSensors(segment);
    const avgMoisture = sensors.reduce((sum, sensor) => sum + sensor.soilMoisture, 0) / sensors.length;
    const allSufficient = sensors.every(sensor => sensor.soilMoisture > 50);
    return { avgMoisture: Math.round(avgMoisture), allSufficient, sensors };
  };

  const toggleSystem = (id: string) => {
    setSystems(prev => prev.map(system => 
      system.id === id 
        ? { ...system, status: system.status === 'active' ? 'inactive' : 'active', lastActivated: 'Just now' }
        : system
    ));
  };

  const toggleSegmentExpansion = (segment: string) => {
    setExpandedSegments(prev => 
      prev.includes(segment) 
        ? prev.filter(s => s !== segment)
        : [...prev, segment]
    );
  };

  const getUniqueSegments = () => {
    return [...new Set(sensorData.map(sensor => sensor.location))];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-600 lg:hidden"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Smart Irrigation</h1>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'dashboard' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('segments')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'segments' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Segments</span>
            </button>
            <button
              onClick={() => setActiveTab('tanks')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'tanks' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
                           <Database className="w-4 h-4" />
              <span>Tanks</span> 
            </button>
          </nav>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {alerts.length}
              </span>
            </button>
            <button className="hidden sm:flex p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
            <nav className="space-y-2">
              <button
                onClick={() => { setActiveTab('dashboard'); setIsMenuOpen(false); }}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'dashboard' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => { setActiveTab('segments'); setIsMenuOpen(false); }}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'segments' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Segments</span>
              </button>
              <button
                onClick={() => { setActiveTab('tanks'); setIsMenuOpen(false); }}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'tanks' ? 'bg-green-100 text-green-700' : 'text-gray-600'
                }`}
              >
                               <Database className="w-4 h-4" />
                <span>Tanks</span> 
              </button>
            </nav>
          </div>
        )}
      </header>

      <div 
        className="relative h-48 sm:h-56 lg:h-64 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent opacity-60" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 leading-tight">Multi-Sensor Irrigation Control</h1>
            <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-4">Automated valve control with 4-6 sensors per segment</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
              <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>{sensorData.filter(s => s.status === 'online').length} Sensors Online</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>{systems.filter(s => s.status === 'active').length} Valves Active</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span>{tanks.filter(t => t.status === 'critical').length > 0 ? 'Tank Alert' : 'Tanks Normal'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Control Overview</h2>
                <button className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Valve Control</h3>
                  <span className="text-xs sm:text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {systems.filter(s => s.status === 'active').length}/{systems.length} Active
                  </span>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {systems.map((system) => {
                    const segmentData = getSegmentMoistureStatus(system.segment);
                    return (
                      <div key={system.id} className="border border-gray-100 rounded-lg p-3 sm:p-4 hover:border-gray-200 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <div className="mb-2 sm:mb-0">
                            <h4 className="font-medium text-gray-900">{system.name}</h4>
                            <p className="text-sm text-gray-500">{system.segment} • {system.valveType} valve</p>
                            <p className="text-xs text-gray-400">Sensors: {segmentData.sensors.length} • Avg: {segmentData.avgMoisture}%</p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              segmentData.allSufficient ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                              {segmentData.allSufficient ? 'Sufficient' : 'Dry'}
                            </span>
                            <button
                              onClick={() => toggleSystem(system.id)}
                              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                system.status === 'active'
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                  : system.status === 'scheduled'
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
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
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          Last activated: {system.lastActivated} • Priority: {system.priority}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tank Status</h3>
                <div className="space-y-4">
                  {tanks.map((tank) => (
                    <div key={tank.id} className={`p-3 rounded-lg border-l-4 ${
                      tank.status === 'critical' ? 'bg-red-50 border-red-400' :
                      tank.status === 'low' ? 'bg-yellow-50 border-yellow-400' :
                      'bg-green-50 border-green-400'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{tank.name}</span>
                        <span className={`text-sm font-bold ${
                          tank.status === 'critical' ? 'text-red-700' :
                          tank.status === 'low' ? 'text-yellow-700' :
                          'text-green-700'
                        }`}>
                          {tank.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            tank.status === 'critical' ? 'bg-red-500' :
                            tank.status === 'low' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${tank.level}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{tank.type} tank</span>
                        <span>{Math.round(tank.capacity * tank.level / 100)}L / {tank.capacity}L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
                <span className="text-xs sm:text-sm px-2 py-1 bg-red-100 text-red-700 rounded-full">
                  {alerts.length} Alert{alerts.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {alerts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-gray-600 text-sm">All systems running smoothly</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {alerts.map((alert) => {
                    const getSeverityColor = (severity: string) => {
                      switch (severity) {
                        case 'high': return 'text-red-700 bg-red-50 border-red-200 hover:bg-red-100';
                        case 'medium': return 'text-orange-700 bg-orange-50 border-orange-200 hover:bg-orange-100';
                        default: return 'text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100';
                      }
                    };

                                       const getSeverityIcon = (severity: string, type: string) => {
                      if (type === 'tank') return <Database className="w-4 h-4" />;
                      return severity === 'high' ? <AlertTriangle className="w-4 h-4" /> : <Activity className="w-4 h-4" />;
                    }; 

                    const getSeverityBadge = (severity: string) => {
                      const colors = {
                        high: 'bg-red-100 text-red-700',
                        medium: 'bg-orange-100 text-orange-700',
                        low: 'bg-blue-100 text-blue-700'
                      };
                      return colors[severity as keyof typeof colors] || colors.low;
                    };

                    return (
                      <div key={alert.id} className={`border rounded-lg p-4 transition-colors cursor-pointer ${getSeverityColor(alert.severity)}`}>
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getSeverityIcon(alert.severity, alert.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <p className="text-sm font-medium leading-tight">{alert.message}</p>
                              <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ml-2 ${getSeverityBadge(alert.severity)}`}>
                                {alert.severity.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-xs opacity-75">{alert.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'segments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Farming Segments</h2>
              <div className="text-sm text-gray-600">
                Multi-sensor monitoring with automatic valve control
              </div>
            </div>

            {getUniqueSegments().map((segment) => {
              const segmentSensors = getSegmentSensors(segment);
              const segmentSystem = systems.find(s => s.segment === segment);
              const isExpanded = expandedSegments.includes(segment);
              const { avgMoisture, allSufficient } = getSegmentMoistureStatus(segment);

              return (
                <div key={segment} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div 
                    className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleSegmentExpansion(segment)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${allSufficient ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{segment}</h3>
                          <p className="text-sm text-gray-600">
                            {segmentSensors.length} sensors • Avg moisture: {avgMoisture}% • 
                            {segmentSystem ? ` ${segmentSystem.valveType} valve` : ' No valve'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          allSufficient ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {allSufficient ? 'Sufficient Moisture' : 'Requires Irrigation'}
                        </span>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                        {segmentSensors.map((sensor) => (
                          <div key={sensor.id} className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900">{sensor.depth}</h4>
                              <div className="flex items-center space-x-1">
                                {sensor.status === 'online' ? (
                                  <Wifi className="w-4 h-4 text-green-500" />
                                ) : (
                                  <AlertTriangle className="w-4 h-4 text-red-500" />
                                )}
                                <span className={`text-xs ${sensor.status === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                                  {sensor.status}
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Moisture</span>
                                  <span className="font-medium text-blue-600">{sensor.soilMoisture}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${sensor.soilMoisture}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Temperature</span>
                                <span className="font-medium text-orange-600">{sensor.temperature}°C</span>
                              </div>
                              
                              <div className="text-xs text-gray-500 pt-2 border-t">
                                Updated {sensor.lastUpdate}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {segmentSystem && (
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Valve Control</h4>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">{segmentSystem.name}</p>
                              <p className="text-xs text-gray-500">
                                Logic: {allSufficient ? 'All sensors sufficient → Valve closed' : 'Dry sensors detected → Valve open'}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSystem(segmentSystem.id);
                              }}
                              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                segmentSystem.status === 'active'
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              {segmentSystem.status === 'active' ? (
                                <>
                                  <Square className="w-4 h-4" />
                                  <span>Close Valve</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4" />
                                  <span>Open Valve</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'tanks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Water Tank Management</h2>
              <div className="text-sm text-gray-600">
                Rainwater collection → Header tank → Gravity irrigation
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tanks.map((tank) => (
                <div key={tank.id} className="bg-white rounded-xl border border-gray-200 p-6">
                                   <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{tank.name}</h3>
                    <Database className="w-6 h-6 text-gray-400" />
                  </div> 
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Water Level</span>
                        <span className={`text-2xl font-bold ${
                          tank.status === 'critical' ? 'text-red-600' :
                          tank.status === 'low' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {tank.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full transition-all duration-500 ${
                            tank.status === 'critical' ? 'bg-red-500' :
                            tank.status === 'low' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${tank.level}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Current</span>
                        <p className="font-semibold">{Math.round(tank.capacity * tank.level / 100)}L</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Capacity</span>
                        <p className="font-semibold">{tank.capacity}L</p>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-lg text-sm font-medium ${
                      tank.status === 'critical' ? 'bg-red-100 text-red-700' :
                      tank.status === 'low' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {tank.status === 'critical' ? 'CRITICAL - Turn ON Motor' :
                       tank.status === 'low' ? 'LOW - Consider Refilling' :
                       'NORMAL - Adequate Level'}
                    </div>

                    {tank.type === 'header' && tank.status === 'critical' && (
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Zap className="w-4 h-4" />
                        <span>Turn ON Motor</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Flow System</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Rainwater Collection</p>
                    <p className="text-sm text-gray-600">Collects rainwater from rooftops and terrain</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Master Tank Storage</p>
                    <p className="text-sm text-gray-600">Main storage reservoir for collected water</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Header Tank Distribution</p>
                    <p className="text-sm text-gray-600">Pumped to elevated header tank for gravity irrigation</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Terrace Irrigation</p>
                    <p className="text-sm text-gray-600">Gravity-fed irrigation from header tank to terraced farms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
 