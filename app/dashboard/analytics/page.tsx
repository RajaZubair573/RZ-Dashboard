'use client';

import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const AnalyticsPage = () => {
  // Sample data for the bar chart
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Unique Visitors',
        data: [1250, 1900, 1800, 2100, 2900, 2500, 2800, 3100, 3500, 3800, 4200, 4600],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Page Views',
        data: [1800, 2700, 2500, 3000, 4000, 3800, 4200, 4500, 5000, 5200, 5800, 6200],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  // Sample data for the line chart
  const lineData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Active Users',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 200) + 100),
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgb(16, 185, 129)',
        tension: 0.3,
        pointBackgroundColor: 'white',
        pointBorderWidth: 2,
      },
    ],
  };

  // Device distribution data
  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [65, 30, 5],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)'
        ],
        borderWidth: 0,
      },
    ],
  };

  // Traffic sources data
  const trafficData = {
    labels: ['Direct', 'Social', 'Referral', 'Organic', 'Email'],
    datasets: [
      {
        label: 'Traffic Sources',
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(236, 72, 153, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(99, 102, 241, 0.8)'
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    cutout: '70%',
  };

  // Recent activities
  const recentActivities = [
    { id: 1, user: 'Raja Zubair', action: 'signed in', time: '2 min ago', icon: '👋' },
    { id: 2, user: 'Haider Zubair', action: 'updated profile', time: '15 min ago', icon: '✏️' },
    { id: 3, user: 'Sharoon Zubair', action: 'completed task', time: '1 hour ago', icon: '✅' },
    { id: 4, user: 'Raja Zubair', action: 'uploaded file', time: '3 hours ago', icon: '📤' },
    { id: 5, user: 'Haider Zubair', action: 'commented', time: '5 hours ago', icon: '💬' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <select className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 24 hours</option>
            <option>This month</option>
            <option>This year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition-colors">
            Export
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            title: 'Total Visitors', 
            value: '12,845', 
            change: '+12.5%',
            description: 'vs previous month',
            icon: '👥',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
          },
          { 
            title: 'Page Views', 
            value: '48,932', 
            change: '+8.3%',
            description: 'vs previous month',
            icon: '📊',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
          },
          { 
            title: 'Avg. Session', 
            value: '4m 23s', 
            change: '+2.1%',
            description: 'vs previous month',
            icon: '⏱️',
            color: 'text-green-600',
            bgColor: 'bg-green-50'
          },
          { 
            title: 'Bounce Rate', 
            value: '28.5%', 
            change: '-3.2%',
            description: 'vs previous month',
            icon: '📉',
            color: 'text-red-600',
            bgColor: 'bg-red-50'
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <div className="flex items-baseline mt-2">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span className={`ml-2 text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Traffic Overview</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md">Monthly</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded-md">Weekly</button>
            </div>
          </div>
          <div className="h-80">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">User Activity</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md">30 Days</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded-md">7 Days</button>
            </div>
          </div>
          <div className="h-80">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
          <div className="h-64">
            <Bar 
              data={trafficData} 
              options={{
                ...chartOptions,
                indexAxis: 'y' as const,
                scales: {
                  x: {
                    beginAtZero: true,
                    grid: {
                      display: true,
                      color: 'rgba(0, 0, 0, 0.05)',
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }} 
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Devices</h2>
          <div className="h-64">
            <Doughnut data={deviceData} options={donutOptions} />
          </div>
          <div className="mt-4 space-y-2">
            {deviceData.labels.map((label, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: deviceData.datasets[0].backgroundColor[index] as string }}
                  />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
                <span className="text-sm font-medium">{deviceData.datasets[0].data[index]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    <span className="text-gray-900">{activity.user}</span>{' '}
                    <span className="text-gray-500">{activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all activity
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top Pages</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { page: '/', visitors: 8450, change: '+12.5%', trend: 'up' },
              { page: '/dashboard', visitors: 6320, change: '+5.2%', trend: 'up' },
              { page: '/projects', visitors: 4950, change: '-2.1%', trend: 'down' },
              { page: '/settings', visitors: 3240, change: '+8.7%', trend: 'up' },
              { page: '/help', visitors: 2150, change: '+3.4%', trend: 'up' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.page}</p>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">{item.visitors.toLocaleString()} views</span>
                  </div>
                </div>
                <span className={`text-xs font-medium ml-2 ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;