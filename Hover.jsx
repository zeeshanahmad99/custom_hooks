import React from 'react';
import { useHover } from './hooks';

const Hover = () => {
  const [isHovered, bind] = useHover();

  return (
    <div>
      <Card {...bind}></Card>
    </div>
  );
};

export default Hover;
