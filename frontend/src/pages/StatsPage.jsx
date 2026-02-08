import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";


const StatCard = ({ title, description, children }) => (
  <div
    style={{
      flex: 1,
      padding: "1.5rem",
      borderRadius: "12px",
      background: "#f9f9f9",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }}
  >
    <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>
    <div style={{ height: 250 }}>{children}</div>
    <p style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "#555" }}>
      {description}
    </p>
  </div>
);

const StatsPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stats/daily")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2.5rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        🌍 Community Impact Dashboard
      </h1>
    <button
  onClick={() => navigate("/home")}
  style={{
    marginBottom: "1.5rem",
    padding: "0.5rem 1.2rem",
    fontSize: "0.95rem",
    cursor: "pointer",
  }}
>
  ← Back to Home
</button>

      {/* ROW 1 */}
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <StatCard
          title="Daily Active Users"
          description="Number of users completing at least one challenge per day."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usersActive" />
            </BarChart>
          </ResponsiveContainer>
        </StatCard>

        <StatCard
          title="Challenges Completed"
          description="Total daily challenge completions across the community."
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="totalChallengesCompleted" />
            </LineChart>
          </ResponsiveContainer>
        </StatCard>
      </div>

      {/* ROW 2 */}
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <StatCard
          title="CO₂ Reduction"
          description="Estimated kilograms of CO₂ emissions avoided over time."
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="totalCO2" />
            </LineChart>
          </ResponsiveContainer>
        </StatCard>

        <StatCard
          title="Water & Waste Saved"
          description="Daily reduction in water usage (liters) and waste (kg)."
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="totalWater" />
              <Line type="monotone" dataKey="totalWaste" />
            </LineChart>
          </ResponsiveContainer>
        </StatCard>
      </div>
    </div>
  );
};

export default StatsPage;
