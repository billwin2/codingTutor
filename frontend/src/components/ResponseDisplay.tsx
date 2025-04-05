// src/components/ResponseDisplay.tsx
import React from 'react';

interface Props {
  response: string;
}

const ResponseDisplay: React.FC<Props> = ({ response }) => {
  return (
    <div style={{ whiteSpace: 'pre-wrap', background: '#f4f4f4', padding: '10px', borderRadius: '8px' }}>
      {response ? response : 'Response will appear here...'}
    </div>
  );
};

export default ResponseDisplay;
