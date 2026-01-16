import {
  revenueData,
  channelData,
  storesData,
  fundingData,
  expansionData
} from './businessData';

export const colors = {
  lime: '#C0E529',
  limeDark: '#9BBF1E',
  olive: '#6B8E23',
  oliveDark: '#4A5D23',
  oliveDarker: '#3D4A2B',
  black: '#000000',
  white: '#FFFFFF',
  cream: '#F5F3EB'
};

// Revenue Chart - Using centralized data
export const revenueChartData = {
  labels: revenueData.quarterly.labels,
  datasets: [{
    label: 'Revenue (₹ Cr)',
    data: revenueData.quarterly.values,
    backgroundColor: colors.lime,
    borderRadius: 4
  }]
};

export const revenueChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: ctx => `₹${ctx.raw} Cr`
      }
    }
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { weight: 'bold' } } },
    y: { beginAtZero: true, ticks: { callback: v => `₹${v}` } }
  }
};

// Channel Donut - Using centralized data
export const channelDonutData = {
  labels: ['Online', 'Retail'],
  datasets: [{
    data: [channelData.split.online, channelData.split.retail],
    backgroundColor: [colors.oliveDarker, colors.oliveDark],
    borderWidth: 3,
    borderColor: '#000'
  }]
};

export const channelDonutOptions = {
  responsive: true,
  cutout: '65%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true }
  }
};

export const miniDonutOptions = {
  responsive: true,
  cutout: '55%',
  plugins: { legend: { display: false } }
};

// Product mix donuts - Using centralized data
export const onlineDonutData = {
  labels: ['Shoes', 'Apparel'],
  datasets: [{
    data: [channelData.productMix.online.shoes, channelData.productMix.online.apparel],
    backgroundColor: [colors.oliveDarker, colors.oliveDark],
    borderWidth: 2,
    borderColor: '#000'
  }]
};

export const retailDonutData = {
  labels: ['Shoes', 'Apparel'],
  datasets: [{
    data: [channelData.productMix.retail.shoes, channelData.productMix.retail.apparel],
    backgroundColor: [colors.oliveDarker, colors.oliveDark],
    borderWidth: 2,
    borderColor: '#000'
  }]
};

// Channel Trend - Using centralized data
export const channelTrendData = {
  labels: channelData.trend.labels,
  datasets: [
    { label: 'Online', data: channelData.trend.online, backgroundColor: colors.oliveDark, borderRadius: 4 },
    { label: 'Retail', data: channelData.trend.retail, backgroundColor: colors.lime, borderRadius: 4 }
  ]
};

export const channelTrendOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'top' } },
  scales: {
    x: { stacked: true, grid: { display: false } },
    y: { stacked: true, beginAtZero: true, ticks: { callback: v => `₹${v}` } }
  }
};

// Store Chart - Using centralized data
export const storeChartData = {
  labels: storesData.quarterlyRevenue.labels,
  datasets: [
    { label: 'Delhi', data: storesData.quarterlyRevenue.delhi, backgroundColor: colors.lime, borderRadius: 4 },
    { label: 'Mumbai', data: storesData.quarterlyRevenue.mumbai, backgroundColor: colors.oliveDark, borderRadius: 4 },
    { label: 'Hyderabad', data: storesData.quarterlyRevenue.hyderabad, backgroundColor: colors.oliveDarker, borderRadius: 4 }
  ]
};

export const storeChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'top' } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, ticks: { callback: v => `₹${v}` } }
  }
};

// Funding Donut - Using centralized data
export const fundingDonutData = {
  labels: fundingData.currentRound.allocation.map(a => a.name),
  datasets: [{
    data: fundingData.currentRound.allocation.map(a => a.amount),
    backgroundColor: [colors.oliveDarker, colors.oliveDark, colors.olive, colors.limeDark, colors.lime],
    borderWidth: 0
  }]
};

export const fundingDonutOptions = {
  responsive: true,
  cutout: '55%',
  plugins: { legend: { display: false } }
};

// Expansion Chart - Using centralized data
export const expansionChartData = {
  labels: expansionData.sqftByCity.labels,
  datasets: [
    { label: '2025', data: expansionData.sqftByCity['2025'], backgroundColor: colors.oliveDarker, borderRadius: 4 },
    { label: '2027', data: expansionData.sqftByCity['2027'], backgroundColor: colors.oliveDark, borderRadius: 4 },
    { label: '2030', data: expansionData.sqftByCity['2030'], backgroundColor: colors.lime, borderRadius: 4 }
  ]
};

export const expansionChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'top' } },
  scales: {
    x: { stacked: true, grid: { display: false } },
    y: { stacked: true, beginAtZero: true, ticks: { callback: v => `${v/1000}K sqft` } }
  }
};
