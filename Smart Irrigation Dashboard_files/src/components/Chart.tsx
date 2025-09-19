import  { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartProps {
  data: any[];
}

export default function Chart({ data }: ChartProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">24-Hour Trends</h3>
      
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="moisture" stroke="#3b82f6" name="Moisture %" strokeWidth={2} />
            <Line type="monotone" dataKey="temp" stroke="#f59e0b" name="Temperature °C" strokeWidth={2} />
            <Line type="monotone" dataKey="water" stroke="#10b981" name="Water Level %" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
 