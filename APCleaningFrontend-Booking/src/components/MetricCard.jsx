

const MetricCard = ({ title, value, color }) => (
  <div className={`bg-gradient-to-r ${color} text-white rounded-lg shadow p-4 transition-transform hover:scale-105`}>
    <h4 className="text-sm font-medium">{title}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default MetricCard;