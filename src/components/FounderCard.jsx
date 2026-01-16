function FounderCard({ initials, name, role, variant = 'default', details }) {
  const cardClass = `founder-card ${variant === 'dark' ? 'dark' : variant === 'darker' ? 'darker' : ''}`;

  return (
    <div className={cardClass}>
      <div className="founder-avatar">{initials}</div>
      <div className="founder-name">{name}</div>
      <div className="founder-role">{role}</div>
      <div className="founder-details">
        {details.map((detail, index) => (
          <div key={index} className="founder-detail">
            <i className={`fas ${detail.icon}`}></i>
            {detail.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FounderCard;
