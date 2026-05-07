import { useEffect, useState } from "react";
import {
  AttachMoney,
  CheckCircle,
  Groups,
  PersonAdd,
  ThumbDown,
  TrendingUp,
} from "@mui/icons-material";
import { Card, CardContent, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

import api from "../../services/api";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("crm_user")) || {};

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await api.get("/dashboard");
      setDashboardData(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const dashboard = dashboardData?.dashboard || {};

  const cards = [
    {
      title: "Total Leads",
      value: dashboard.total_leads || 0,
      subtitle: "All saved customer leads",
      icon: <Groups />,
    },
    {
      title: "New Leads",
      value: dashboard.new_leads || 0,
      subtitle: "Recently added leads",
      icon: <PersonAdd />,
    },
    {
      title: "Qualified Leads",
      value: dashboard.qualified_leads || 0,
      subtitle: "Leads with real potential",
      icon: <TrendingUp />,
    },
    {
      title: "Won Leads",
      value: dashboard.won_leads || 0,
      subtitle: "Successfully closed deals",
      icon: <CheckCircle />,
    },
    {
      title: "Lost Leads",
      value: dashboard.lost_leads || 0,
      subtitle: "Rejected or not converted",
      icon: <ThumbDown />,
    },
    {
      title: "Won Deal Value",
      value: `Rs. ${Number(dashboard.total_won_deal_value || 0).toLocaleString()}`,
      subtitle: "Total value of won deals",
      icon: <AttachMoney />,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-4xl font-bold text-[#0b132b] mb-2">
        Welcome back, {user.name || "Admin User"}
      </h1>

      <p className="text-gray-600 mb-8">
        Here is your CRM sales lead summary.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {cards.map((card) => (
          <Card
            key={card.title}
            className="rounded-3xl"
            sx={{
              borderRadius: "28px",
              boxShadow: "0 6px 18px rgba(11, 19, 43, 0.08)",
            }}
          >
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e6f6ff] text-[#00a6fb] flex items-center justify-center">
                  {card.icon}
                </div>

                <div>
                  <p className="text-gray-600 text-sm">{card.title}</p>
                  <h2 className="text-2xl font-bold mt-2 text-[#0b132b]">
                    {card.value}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">{card.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card
          className="xl:col-span-2"
          sx={{
            borderRadius: "28px",
            boxShadow: "0 6px 18px rgba(11, 19, 43, 0.08)",
          }}
        >
          <CardContent>
            <h2 className="text-xl font-bold mb-1">Lead Status Summary</h2>
            <p className="text-gray-500 mb-5">
              Current pipeline breakdown by status
            </p>

            <div className="space-y-4">
              {(dashboardData?.statusSummary || []).map((item) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between bg-[#f7fbff] border border-blue-100 rounded-2xl px-4 py-3"
                >
                  <span className="font-medium text-[#0b132b]">
                    {item.status}
                  </span>
                  <span className="bg-[#00a6fb] text-white rounded-full px-4 py-1 text-sm font-bold">
                    {item.count}
                  </span>
                </div>
              ))}

              {dashboardData?.statusSummary?.length === 0 && (
                <p className="text-gray-500">No lead data available yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card
          sx={{
            borderRadius: "28px",
            boxShadow: "0 6px 18px rgba(11, 19, 43, 0.08)",
          }}
        >
          <CardContent>
            <h2 className="text-xl font-bold mb-1">Lead Sources</h2>
            <p className="text-gray-500 mb-5">Where your leads came from</p>

            <div className="space-y-4">
              {(dashboardData?.sourceSummary || []).map((item) => (
                <div
                  key={item.lead_source}
                  className="bg-[#f7fbff] border border-blue-100 rounded-2xl px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#0b132b]">
                      {item.lead_source}
                    </span>
                    <span className="font-bold text-[#00a6fb]">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}

              {dashboardData?.sourceSummary?.length === 0 && (
                <p className="text-gray-500">No source data available yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;