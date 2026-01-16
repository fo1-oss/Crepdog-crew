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
  fundingDonutData,
  fundingDonutOptions,
  expansionChartData,
  expansionChartOptions
} from '../data/chartConfig';
import PageHeader from '../components/PageHeader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const roadmapItems = [
  { title: 'Retail Expansion', desc: 'Establishing strong retail presence in top Tier 1 cities and expanding within current geographies' },
  { title: 'Experience Centers', desc: 'Creating world class experience centers with a minimum 10,000 sq. ft area' },
  { title: 'Product Mix', desc: 'Curate an optimal product mix with focus on better blended margins' },
  { title: 'Marketing Expansion', desc: 'Conduct community engagement and activation campaigns' }
];

const allocations = [
  { color: 'var(--olive-darker)', label: 'Store Expansion Capex - ₹21 Cr (53%)' },
  { color: 'var(--olive-dark)', label: 'Store Opex - ₹8 Cr (20%)' },
  { color: 'var(--olive)', label: 'Inventory - ₹6 Cr (15%)' },
  { color: 'var(--lime-dark)', label: 'Marketing - ₹3.5 Cr (9%)' },
  { color: 'var(--lime)', label: 'Team Expansion - ₹1.5 Cr (3%)' }
];

function Funding() {
  return (
    <section className="section active">
      <PageHeader
        title=""
        highlight="Fund Utilization"
      />

      <div className="fund-hero">
        <div className="fund-roadmap">
          <h4>Roadmap with this raise</h4>
          {roadmapItems.map((item, index) => (
            <div key={index} className="roadmap-item">
              <div className="roadmap-title">{item.title}</div>
              <div className="roadmap-desc">{item.desc}</div>
            </div>
          ))}
        </div>
        <div className="fund-chart-container">
          <div style={{ maxWidth: '280px', margin: '0 auto' }}>
            <Doughnut data={fundingDonutData} options={fundingDonutOptions} />
          </div>
          <div className="fund-amount">
            <div className="fund-amount-value">₹40 Cr</div>
          </div>
          <div className="alloc-legend">
            {allocations.map((alloc, index) => (
              <div key={index} className="alloc-item">
                <div className="alloc-color" style={{ background: alloc.color }}></div>
                {alloc.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cdc-card white">
        <div className="chart-header">
          <div className="chart-title">Retail Expansion Plan</div>
          <div className="chart-underline"></div>
        </div>
        <div className="chart-wrapper">
          <Bar data={expansionChartData} options={expansionChartOptions} />
        </div>
        <p style={{ fontSize: '11px', color: '#666', marginTop: '12px' }}>*Squarefeet</p>
      </div>
    </section>
  );
}

export default Funding;
