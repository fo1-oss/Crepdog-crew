import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { storeChartData, storeChartOptions } from '../data/chartConfig';
import { storesData, productData } from '../data/businessData';
import PageHeader from '../components/PageHeader';
import StatPill from '../components/StatPill';
import StoreCard from '../components/StoreCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dynamic stat pills from centralized data
const statPills = [
  { label: 'Monthly Footfall*', value: `${storesData.economics.monthlyFootfall.toLocaleString()}+` },
  { label: 'Conversion Rate*', value: `${storesData.economics.conversionRate}%` },
  { label: 'Rent to Revenue*', value: '3%' },
  { label: 'ABV*', value: `₹${productData.aov.retail.toLocaleString()}` }
];

// Dynamic store cards from centralized data
const stores = storesData.stores.map((store, index) => {
  const maxRevenue = Math.max(...storesData.stores.map(s => s.revenueQ3));
  return {
    name: store.name,
    meta: `${store.area.toLocaleString()} sqft • Since ${store.openDate}`,
    revenue: `₹${store.revenueQ3} Cr`,
    barWidth: `${(store.revenueQ3 / maxRevenue) * 100}%`,
    apparelPct: store.shoesPct,
    shoesPct: store.apparelPct,
    variant: store.variant
  };
});

function Stores() {
  return (
    <section className="section active">
      <PageHeader
        title="Retail -"
        highlight="Traction"
      />

      <div className="stat-pills">
        {statPills.map((pill, index) => (
          <StatPill key={index} label={pill.label} value={pill.value} />
        ))}
      </div>

      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        {stores.map((store, index) => (
          <StoreCard key={index} {...store} />
        ))}
      </div>

      <div className="cdc-card white">
        <div className="chart-header">
          <div className="chart-title">Store-wise Revenue Comparison</div>
          <div className="chart-underline"></div>
        </div>
        <div className="chart-wrapper">
          <Bar data={storeChartData} options={storeChartOptions} />
        </div>
      </div>

      <p style={{ fontSize: '11px', color: '#666', marginTop: '16px' }}>*YTD - FY'26</p>
    </section>
  );
}

export default Stores;
