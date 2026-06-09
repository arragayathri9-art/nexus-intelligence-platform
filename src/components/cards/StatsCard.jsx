import CountUp from "react-countup";
const StatsCard = ({
  title,
  value,
  color,
}) => {

  return (
    <div
      className="glass rounded-2xl p-6 border"
      style={{
        borderColor: color,
        boxShadow: `0 0 15px ${color}`,
      }}
    >

      <h2 className="text-gray-400 mb-3">
        {title}
      </h2>

      <h1
        className="text-4xl font-bold"
        style={{ color }}
      >
        {value}
      </h1>

    </div>
  );
};

export default StatsCard;