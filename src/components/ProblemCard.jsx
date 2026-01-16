function ProblemCard({ icon, stat, text, activeCount }) {
  return (
    <div className="problem-card">
      <div className="problem-badge">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="problem-stat">{stat}</div>
      <div className="problem-text" dangerouslySetInnerHTML={{ __html: text }}></div>
      <div className="problem-people">
        {[...Array(10)].map((_, i) => (
          <i
            key={i}
            className={`fas fa-user ${i < activeCount ? 'active' : 'inactive'}`}
          ></i>
        ))}
      </div>
    </div>
  );
}

export default ProblemCard;
