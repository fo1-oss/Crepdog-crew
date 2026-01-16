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
import { channelTrendData, channelTrendOptions } from '../data/chartConfig';
import { unitEconomics, channelData } from '../data/businessData';
import PageHeader from '../components/PageHeader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Financials() {
  return (
    <section className="section active">
      <PageHeader
        title="Unit Economics -"
        highlight="Online vs Retail"
      />

      <div className="cdc-card white" style={{ marginBottom: '24px' }}>
        <div className="unit-econ-grid">
          <div className="unit-econ-col">
            <h4>Online</h4>
            <div className="econ-bar">
              <div className="econ-bar-track" style={{ width: '100%', background: 'var(--olive-darker)' }}>
                100%<span style={{ fontSize: '11px', marginLeft: '8px', opacity: 0.7 }}>(Revenue - GST)</span>
              </div>
            </div>
            <div className="econ-bar">
              <div className="econ-bar-track" style={{ width: `${100 - channelData.margin.online}%`, background: 'var(--olive-dark)' }}>
                {100 - channelData.margin.online}%
              </div>
            </div>
            <div className="econ-bar">
              <div className="econ-bar-track" style={{ width: `${channelData.margin.online}%`, background: 'var(--olive)' }}>
                {channelData.margin.online}%
              </div>
            </div>
            <div className="econ-bar">
              <div className="econ-bar-track" style={{ width: '14%', background: 'var(--lime-dark)' }}>14%</div>
            </div>
            <div className="econ-bar">
              <div className="econ-bar-track light" style={{ width: `${channelData.ebitda.online}%`, background: 'var(--lime)' }}>
                {channelData.ebitda.online}%
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}><div style={{ width: '12px', height: '12px', background: 'var(--olive-darker)' }}></div>Net Sales</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}><div style={{ width: '12px', height: '12px', background: 'var(--olive-dark)' }}></div>COGS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}><div style={{ width: '12px', height: '12px', background: 'var(--olive)' }}></div>Gross Margin</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}><div style={{ width: '12px', height: '12px', background: 'var(--lime-dark)' }}></div>CM1</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}><div style={{ width: '12px', height: '12px', background: 'var(--lime)' }}></div>Operational EBITDA</div>
            </div>
          </div>
          <div className="unit-econ-col">
            <h4>Retail</h4>
            <div className="econ-bar">
              <div className="econ-bar-track" style={{ width: '100%', background: 'var(--olive-darker)' }}>
                100%<span style={{ fontSize: '11px', marginLeft: '8px', opacity: 0.7 }}>(Revenue - GST)</span>
              </div>
            </div>
            <div className="econ-bar">
              <div className="econ-bar-track" style={{ width: `${100 - channelData.margin.retail}%`, background: 'var(--olive-dark)' }}>
                {100 - channelData.margin.retail}%
              </div>
            </div>
            <div className="econ-bar">
              <div className="econ-bar-track" style={{ width: `${channelData.margin.retail}%`, background: 'var(--olive)' }}>
                {channelData.margin.retail}%
              </div>
            </div>
            <div className="econ-bar">
              <div className="econ-bar-track" style={{ width: '19%', background: 'var(--lime-dark)' }}>19%</div>
            </div>
            <div className="econ-bar">
              <div className="econ-bar-track light" style={{ width: `${channelData.ebitda.retail}%`, background: 'var(--lime)' }}>
                {channelData.ebitda.retail}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="cdc-card white">
          <div className="chart-header">
            <div className="chart-title">Channel Revenue Trend</div>
            <div className="chart-underline"></div>
          </div>
          <div className="chart-wrapper">
            <Bar data={channelTrendData} options={channelTrendOptions} />
          </div>
        </div>
        <div className="notes-box">
          <div className="notes-title">NOTES</div>
          <div className="note-item">
            <span className="note-label">FY'25 - Q1</span>
            <span className="note-arrow">→</span>
            <span>Mumbai store revenue dipped due to a store fire in May</span>
          </div>
          <div className="note-item">
            <span className="note-label">FY'25 - Q4</span>
            <span className="note-arrow">→</span>
            <span>Both Retail & Online revenue saw a dip due to seasonality in Jan'25 & Feb'25</span>
          </div>
          <div className="note-item">
            <span className="note-label">FY'26 - Q1</span>
            <span className="note-arrow">→</span>
            <span>Registered highest CM3% of 10% in Jun'25</span>
          </div>
          <div className="note-item">
            <span className="note-label">FY'26 - Q3</span>
            <span className="note-arrow">→</span>
            <span>Hit highest company level revenue of <strong>₹15.5 Cr</strong> in Dec'26</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Financials;
