import PageHeader from '../components/PageHeader';
import FounderCard from '../components/FounderCard';

const founders = [
  {
    initials: 'AK',
    name: 'Anchit Kapil',
    role: 'Co-Founder',
    variant: 'default',
    details: [
      { icon: 'fa-graduation-cap', text: 'Lancaster University' },
      { icon: 'fa-briefcase', text: 'Director | Summer House Cafe Delhi' }
    ]
  },
  {
    initials: 'BM',
    name: 'Bharat Mahrotra',
    role: 'Co-Founder & CBO',
    variant: 'dark',
    details: [
      { icon: 'fa-graduation-cap', text: 'Lancaster University' },
      { icon: 'fa-graduation-cap', text: 'Warwick Business School' }
    ]
  },
  {
    initials: 'SK',
    name: 'Shaurya Kumar',
    role: 'Co-Founder',
    variant: 'darker',
    details: [
      { icon: 'fa-graduation-cap', text: 'London School of Economics' }
    ]
  }
];

const whyItems = [
  { icon: 'fa-building', title: 'Founders with decades of retail and hospitality expertise' },
  { icon: 'fa-tshirt', title: 'Largest home-grown western wear apparel collection under one roof' },
  { icon: 'fa-box', title: 'Capital-Efficient SOR Model - Zero Inventory cost & no dead stock' },
  { icon: 'fa-star', title: 'Commands high customer recall & brand advocacy' },
  { icon: 'fa-hand-holding-usd', title: 'One of the only profitable lifestyle destination in India' },
  { icon: 'fa-chart-bar', title: 'Insight-led product churns in-sync with dynamic customer trends' },
  { icon: 'fa-percentage', title: 'Industry-defining take rates across categories & brands' },
  { icon: 'fa-check-circle', title: 'Authentic inventory' }
];

function Team() {
  return (
    <section className="section active">
      <PageHeader
        title=""
        highlight="Founding team"
        subtitle="with eclectic mix of operational expertise & strong retail acumen"
      />

      <div className="grid grid-3" style={{ marginBottom: '32px' }}>
        {founders.map((founder, index) => (
          <FounderCard key={index} {...founder} />
        ))}
      </div>

      <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>Why Crepdog Crew?</h3>
      <div className="why-grid">
        {whyItems.slice(0, 4).map((item, index) => (
          <div key={index} className="why-item">
            <div className="why-icon"><i className={`fas ${item.icon}`}></i></div>
            <div className="why-title">{item.title}</div>
          </div>
        ))}
      </div>
      <div className="why-grid" style={{ marginTop: '32px' }}>
        {whyItems.slice(4).map((item, index) => (
          <div key={index} className="why-item">
            <div className="why-icon"><i className={`fas ${item.icon}`}></i></div>
            <div className="why-title">{item.title}</div>
          </div>
        ))}
      </div>

      <div className="cdc-card black" style={{ marginTop: '32px' }}>
        <div className="chart-header">
          <div className="chart-title" style={{ color: 'var(--white)' }}>Get in Touch</div>
          <div className="chart-underline" style={{ background: 'var(--lime)' }}></div>
        </div>
        <div className="contact-grid">
          <div>
            <div className="contact-label">Company Contact</div>
            <div className="contact-name">Anchit Kapil</div>
            <div className="contact-info">anchit@crepdogcrew.com</div>
            <div className="contact-info">+91 99908 89494</div>
          </div>
          <div>
            <div className="contact-label">Investment Banking</div>
            <div className="contact-name">Moxie Capital</div>
            <div className="contact-info">investments@moxiecapital.in</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
