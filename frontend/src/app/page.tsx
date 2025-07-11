"use client";

import { BarChart, PieChart } from "@mui/x-charts";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import CustomerTable from "./components/customer-table";
import StatOverview from "./components/stat-overview";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [totalUser, setTotalUser] = useState(0);
  const [genderData, setGenderData] = useState({ male: 0, female: 0 });
  const [locationData, setLocationData] = useState<{
    labels: string[];
    values: number[];
  }>({ labels: [], values: [] });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/overview`
      );
      const json = await res.json();
      setTotalUser(json.totalUser);
      setGenderData(json.genderCount);
      setLocationData(json.locationType);
    } catch (err) {
      console.error("Gagal fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Dashboard</h1>
          <p className="text-gray-500">
            Comprehensive overview of customer data and analytics
          </p>
        </div>
        <span className="badge">
          <Calendar className="w-4 h-4 mr-1" />
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>

      <StatOverview totalUser={totalUser} />

      <div className="p-4">
        <div role="tablist" className="tabs tabs-boxed mb-4">
          <a
            role="tab"
            className={`tab ${activeTab === "overview" ? "tab-active" : ""} ${loading ? "pointer-events-none opacity-50" : ""}`}
            onClick={() => !loading && setActiveTab("overview")}
          >
            Overview
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "customer" ? "tab-active" : ""} ${loading ? "pointer-events-none opacity-50" : ""}`}
            onClick={() => !loading && setActiveTab("customer")}
          >
            Customer Data
          </a>
        </div>

        <div className="bg-base-100 rounded-lg p-4 shadow space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card: Gender Distribution */}
                  <div className="card card-side bg-base-100 shadow-md w-full">
                    <div className="card-body">
                      <h2 className="card-title">Gender Distribution</h2>
                      <p className="text-gray-500">Customer distribution by gender</p>
                      <PieChart
                        className="mt-7"
                        series={[
                          {
                            data: [
                              { id: 0, value: genderData.male, label: "Male", color: "#4f46e5" },
                              { id: 1, value: genderData.female, label: "Female", color: "#ec4899" },
                            ],
                          },
                        ]}
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>

                  <div className="card card-side bg-base-100 shadow-md w-full">
                    <div className="card-body">
                      <h2 className="card-title">Location Distribution</h2>
                      <p className="text-gray-500">Customers by city</p>
                      <BarChart
                        xAxis={[
                          {
                            data: locationData.labels.map((label) =>
                              label.charAt(0).toUpperCase() + label.slice(1)
                            ),
                          },
                        ]}
                        series={[{ data: locationData.values }]}
                        height={300}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "customer" && (
                <div>
                  <div className="overflow-x-auto">
                    <CustomerTable />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
