import PageHeader from '../components/PageHeader';
import ProblemCard from '../components/ProblemCard';

const problems = [
  {
    icon: 'fa-check',
    stat: '6/10',
    text: 'Sneakers sold are <strong>fake</strong>, customers end up paying <strong>2x the original price</strong>',
    activeCount: 6
  },
  {
    icon: 'fa-exclamation',
    stat: '70%',
    text: 'Indian customers buy from International brands due to <strong>limited accessibility</strong> to homegrown lifestyle brands',
    activeCount: 7
  },
  {
    icon: 'fa-rupee-sign',
    stat: '80%',
    text: 'Affluent Indians shop luxury online, <strong>abandon carts</strong> over trust issues, and <strong>30-40% lose money</strong> to non-delivery and scams',
    activeCount: 8
  }
];

const competitors = [
  { name: 'CDC', revenue: '₹120 Cr', sqft: '12,500', fulfillment: '98%', fulfillmentBadge: 'green', authenticity: '99%', authenticityBadge: 'green', isCdc: true },
  { name: 'Culture', revenue: '₹50 Cr', sqft: '1,200', fulfillment: '70%', fulfillmentBadge: 'yellow', authenticity: '60%', authenticityBadge: null, isCdc: false },
  { name: 'Dawntown', revenue: '₹40 Cr', sqft: '3,500', fulfillment: '60%', fulfillmentBadge: null, authenticity: '44%', authenticityBadge: null, isCdc: false },
  { name: 'MainStreet', revenue: '₹25 Cr', sqft: '200', fulfillment: '10%', fulfillmentBadge: 'red', authenticity: '80%', authenticityBadge: null, isCdc: false }
];

function Market() {
  return (
    <section className="section active">
      <PageHeader
        title="CDC's"
        highlight="₹35,000 Cr"
      />

      <div className="cdc-card cream" style={{ marginBottom: '24px', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ background: 'var(--lime)', border: '2px solid var(--black)', borderRadius: '50px', padding: '8px 20px', fontWeight: 700 }}>CAGR 6.5%</span>
        </div>
        <div className="grid grid-2" style={{ gap: '40px' }}>
          <div className="cdc-card" style={{ textAlign: 'center' }}>
            <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: '50px', padding: '8px 20px', display: 'inline-block', marginBottom: '16px', fontWeight: 700 }}>2025</div>
            <div style={{ background: 'var(--black)', borderRadius: '16px', padding: '20px', color: 'var(--white)', marginBottom: '12px' }}>
              <div style={{ fontSize: '20px', fontWeight: 700 }}>₹110 Cr*</div>
              <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>CREPDOG CREW</div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900 }}>₹15,150 Cr</div>
            <div style={{ fontSize: '13px', color: '#666' }}>Indian Market</div>
            <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px' }}>₹6.1 Lakh Cr</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Global Market</div>
          </div>
          <div className="cdc-card" style={{ textAlign: 'center' }}>
            <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: '50px', padding: '8px 20px', display: 'inline-block', marginBottom: '16px', fontWeight: 700 }}>2030</div>
            <div style={{ background: 'var(--black)', borderRadius: '16px', padding: '20px', color: 'var(--white)', marginBottom: '12px' }}>
              <div style={{ fontSize: '20px', fontWeight: 700 }}>₹1,000 Cr*</div>
              <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>CREPDOG CREW</div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900 }}>₹35,000 Cr</div>
            <div style={{ fontSize: '13px', color: '#666' }}>Indian Market</div>
            <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px' }}>₹15 Lakh Cr</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Global Market</div>
          </div>
        </div>
        <div style={{ textAlign: 'right', marginTop: '16px' }}>
          <span style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: '12px', padding: '12px 20px', display: 'inline-block', fontSize: '13px' }}>
            Crepdog Crew aims to capture <strong>3%</strong> of this market
          </span>
        </div>
      </div>

      <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>The Problem</h3>
      <div className="grid grid-3" style={{ marginBottom: '32px' }}>
        {problems.map((problem, index) => (
          <ProblemCard key={index} {...problem} />
        ))}
      </div>

      <div className="cdc-card white">
        <div className="chart-header">
          <div className="chart-title">Leading Premium Luxury</div>
          <div className="chart-underline"></div>
          <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>while organizing the 85% unstructured market</p>
        </div>
        <table className="comp-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Revenue</th>
              <th>Retail Sqft</th>
              <th>Order Fulfillment</th>
              <th>Authenticity</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((comp, index) => (
              <tr key={index} className={comp.isCdc ? 'cdc' : ''}>
                <td><strong style={{ fontSize: comp.isCdc ? '16px' : '14px' }}>{comp.name}</strong></td>
                <td><strong style={{ color: comp.isCdc ? 'var(--olive-dark)' : 'inherit', fontSize: comp.isCdc ? '16px' : '14px' }}>{comp.revenue}</strong></td>
                <td><strong>{comp.sqft}</strong></td>
                <td>
                  {comp.fulfillmentBadge ? (
                    <span className={`badge ${comp.fulfillmentBadge}`}>{comp.fulfillment}</span>
                  ) : comp.fulfillment}
                </td>
                <td>
                  {comp.authenticityBadge ? (
                    <span className={`badge ${comp.authenticityBadge}`}>{comp.authenticity}</span>
                  ) : comp.authenticity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Market;
