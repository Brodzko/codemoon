import React, { useState } from 'react';

const ReactComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count => count + 1);
  };

  return (
    <div>
      You have clicked the button {count} times.
      <button onClick={() => handleClick()}>Click me!</button>
    </div>
  );
};

export default ReactComponent;
