import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import MetricCard from "../../components/MetricCard";
import BookingsByDayChart from "../../components/BookingsByDayChart";
import RevenueByMonthChart from "../../components/RevenueByMonthChart";
import CleanerPerformanceChart from "../../components/CleanerPerformanceChart";
import DriverEfficiencyChart from "../../components/DriverEfficiencyChart";
import RevenueByServiceTypeChart from "../../components/RevenueByServiceTypeChart";
import ServiceTypeBreakdownChart from "../../components/ServiceTypeBreakdownChart";
import PeakBookingTimesBarChart from "../../components/PeakBookingTimesBarChart";

const Analytics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/Admin/analytics")
      .then(res => {
        setMetrics(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load analytics");
        setLoading(false);
      });
  }, []);

  const isEmpty = !metrics || Object.values(metrics).every(val => {
    if (Array.isArray(val)) return val.length === 0;
    if (typeof val === 'object' && val !== null) return Object.keys(val).length === 0;
    if (typeof val === 'number') return val === 0;
    return !val;
  });

  if (loading) {
    return <p className="text-center py-10 text-indigo-600 text-xl">Loading analytics...</p>;
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-red-600">No analytics available</h2>
          <p className="text-gray-700 text-lg">
            Once bookings and revenue start flowing, your dashboard will light up with insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-6 space-y-10">
        <h2 className="text-4xl font-bold text-center text-purple-700">Admin Analytics Dashboard</h2>

        {/* Summary Metrics */}
        <section className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-2">Summary Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard title="Total Bookings" value={metrics.totalBookings} color="from-indigo-500 to-purple-500" />
            <MetricCard title="Total Revenue" value={`R${metrics.totalRevenue}`} color="from-pink-500 to-red-500" />
            <MetricCard title="Completion Rate" value={`${metrics.completionRate}%`} color="from-green-500 to-teal-500" />
            <MetricCard title="Unassigned Bookings" value={metrics.unassignedCount} color="from-yellow-500 to-orange-500" />
          </div>
        </section>

        {/* Booking & Revenue Trends */}
        <section className="bg-gradient-to-r from-pink-100 to-red-100 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">Booking & Revenue Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BookingsByDayChart data={metrics.bookingsByDay || []} />
            <RevenueByMonthChart data={metrics.revenueByMonth || []} />
          </div>
        </section>

        {/* Performance & Breakdown */}
        <section className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">Performance & Service Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CleanerPerformanceChart data={metrics.cleanerPerformance || []} />
            <DriverEfficiencyChart data={metrics.driverEfficiency || []} />
            <RevenueByServiceTypeChart data={metrics.revenueByServiceType || []} />
            <ServiceTypeBreakdownChart data={metrics.serviceTypeBreakdown || []} />
          </div>
        </section>

        {/* Peak Booking Patterns */}
        <section className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2">Peak Booking Patterns</h3>
          <p className="text-sm text-gray-700 mb-2">
            Shows hourly booking intensity across weekdays to help optimize staffing and scheduling.
          </p>
          <PeakBookingTimesBarChart data={metrics.peakBookingTimes || {}} />
        </section>
      </div>
    </div>
  );
};

export default Analytics;