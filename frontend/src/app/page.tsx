"use client"

import { BarChart, PieChart } from "@mui/x-charts";
import { Calendar } from "lucide-react";
import { useState } from "react";
import CustomerTable from "./components/customer-table";


export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");

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

      <div className="p-4">
        <div role="tablist" className="tabs tabs-boxed mb-4">
          <a
            role="tab"
            className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "customer" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("customer")}
          >
            Customer Data
          </a>
        </div>

        <div className="bg-base-100 rounded-lg p-4 shadow space-y-4">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="card card-side bg-base-100 shadow-md w-full">
                <div className="card-body">
                  <h2 className="card-title">Gender Distribution</h2>
                  <p className="text-gray-500">Customer distribution by gender</p>
                  <PieChart className="mt-7"
                    series={[
                      {
                        data: [
                          { id: 0, value: 100, label: "Male" },
                          { id: 1, value: 150, label: "Female" },
                        ],
                      },
                    ]}
                    width={200}
                    height={200}
                  />
                </div>
              </div>

              {/* Card 2 */}
              <div className="card card-side bg-base-100 shadow-md w-full">
                <div className="card-body">
                  <h2 className="card-title">Location Distribution</h2>
                  <p className="text-gray-500">Customers by city</p>
                  <BarChart
                    xAxis={[{ data: ['group A', 'group B', 'group C'] }]}
                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                    height={300}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "customer" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Customer List</h2>
              <div className="overflow-x-auto">
                  <CustomerTable/>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
