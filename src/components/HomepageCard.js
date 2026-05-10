import React from 'react';
import Link from '@docusaurus/Link';

const HomepageCard = ({ title, description, link }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      to={link}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        style={{
          flex: '1',
          minWidth: '250px',
          padding: '2rem',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          backgroundColor: '#fff',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <p style={{ marginBottom: 0, color: '#666' }}>{description}</p>
      </div>
    </Link>
  );
};

export default HomepageCard;
