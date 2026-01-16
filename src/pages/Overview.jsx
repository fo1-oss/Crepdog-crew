import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  revenueChartData,
  revenueChartOptions,
  channelDonutData,
  channelDonutOptions,
  miniDonutOptions,
  onlineDonutData,
  retailDonutData
} from '../data/chartConfig';
import PageHeader from '../components/PageHeader';
import StatPill from '../components/StatPill';
import MetricRow from '../components/MetricRow';
import { useData } from '../context/DataContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Custom plugin to draw labels inside doughnut
const doughnutLabelsPlugin = {
  id: 'doughnutLabels',
  afterDraw: function(chart) {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);

    meta.data.forEach((arc, index) => {
      const data = chart.data.datasets[0].data[index];
      const centerAngle = (arc.startAngle + arc.endAngle) / 2;
      const radius = (arc.innerRadius + arc.outerRadius) / 2;
      const x = arc.x + Math.cos(centerAngle) * radius;
      const y = arc.y + Math.sin(centerAngle) * radius;

      ctx.save();
      ctx.font = 'bold 16px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(data + '%', x, y);
      ctx.restore();
    });
  }
};

function Overview() {
  const { companyInfo, revenueData, channelData, storesData, productData } = useData();

  // Dynamic stat pills from context data
  const statPills = [
    { label: 'Founded', value: String(companyInfo.founded) },
    { label: 'Headquarters', value: 'Delhi' },
    { label: 'Team', value: companyInfo.totalEmployees },
    { label: 'ARR^', value: `₹${revenueData.arr} Crore` },
    { label: 'Gross Margin*', value: `${revenueData.ytdFY26.grossMargin}%` },
    { label: 'CM2*', value: '9%' }
  ];

  // Dynamic metrics from context data
  const metrics = [
    { icon: 'fa-store', label: `Stores - ${companyInfo.storeCount}*`, value: storesData.stores.map(s => s.name).join(', ') },
    { icon: 'fa-receipt', label: '# of Monthly Billings*', value: '11,400 orders' },
    { icon: 'fa-ruler-combined', label: 'Revenue per sqft*', value: '₹6,000' },
    { icon: 'fa-shopping-bag', label: 'Average Billing Value*', value: `₹${productData.aov.overall.toLocaleString()}` },
    { icon: 'fa-user-friends', label: 'Customers**', value: companyInfo.totalCustomers },
    { icon: 'fa-redo', label: 'Retention Rate*', value: '30% (YTD)' }
  ];

  return (
    <section className="section active">
      <PageHeader
        title="Traction &"
        highlight="key Metrics"
      />

      <div className="stat-pills">
        {statPills.map((pill, index) => (
          <StatPill key={index} label={pill.label} value={pill.value} />
        ))}
      </div>

      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div>
          {metrics.map((metric, index) => (
            <MetricRow key={index} icon={metric.icon} label={metric.label} value={metric.value} />
          ))}
        </div>

        <div className="cdc-card" style={{ background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <div className="donut-section">
              <div style={{ maxWidth: '200px', maxHeight: '200px' }}>
                <Doughnut
                  data={channelDonutData}
                  options={channelDonutOptions}
                  plugins={[doughnutLabelsPlugin]}
                />
              </div>
              <div className="donut-label">Total Revenue</div>
            </div>
            <div className="mini-donut-row">
              <div className="mini-donut">
                <div className="mini-donut-title">Online</div>
                <div style={{ width: '80px', height: '80px' }}>
                  <Doughnut data={onlineDonutData} options={miniDonutOptions} />
                </div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ background: 'var(--olive-darker)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>
                    {channelData.productMix.online.shoes}%
                  </span>
                  <span style={{ fontSize: '10px', color: '#666' }}> Shoes</span>
                </div>
              </div>
              <div className="mini-donut">
                <div className="mini-donut-title">Retail</div>
                <div style={{ width: '80px', height: '80px' }}>
                  <Doughnut data={retailDonutData} options={miniDonutOptions} />
                </div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ background: 'var(--olive-darker)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>
                    {channelData.productMix.retail.shoes}%
                  </span>
                  <span style={{ fontSize: '10px', color: '#666' }}> Shoes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cdc-card white">
        <div className="chart-header">
          <div className="chart-title">Revenue Trajectory</div>
          <div className="chart-underline"></div>
        </div>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', background: 'var(--black)' }}></div>
            <span style={{ fontSize: '12px' }}>Gross Margin %</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', background: 'var(--lime)' }}></div>
            <span style={{ fontSize: '12px' }}>Consolidated Revenue</span>
          </div>
        </div>
        <div className="chart-wrapper">
          <Bar data={revenueChartData} options={revenueChartOptions} />
        </div>
      </div>

      <p style={{ fontSize: '11px', color: '#666', marginTop: '16px' }}>*YTD FY'26 &nbsp;&nbsp; **LTD &nbsp;&nbsp; ^(Annualized basis YTD FY'26)</p>
    </section>
  );
}

export default Overview;
