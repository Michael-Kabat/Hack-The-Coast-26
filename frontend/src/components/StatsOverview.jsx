import { useEffect, useState } from "react";
import { getAggregates } from "../api/stats";

export default function StatsOverview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAggregates().then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Card title="Users" value={stats.totalUsers} />
      <Card title="CO₂ Saved (kg)" value={stats.totalCO2} />
      <Card title="Water Saved (L)" value={stats.totalWater} />
      <Card title="Waste Reduced (kg)" value={stats.totalWaste} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      padding: "1rem",
      borderRadius: "8px",
      background: "#f4f4f4",
      minWidth: "150px",
      textAlign: "center"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}
