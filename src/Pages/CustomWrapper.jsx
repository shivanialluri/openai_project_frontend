// CustomWrapper.jsx

import React from 'react';

const CustomWrapper = ({ isFirst, isLast, hideInput, children, ...rest }) => {
  // Log the custom props to demonstrate handling them
  console.log('CustomWrapper props - isFirst:', isFirst);
  console.log('CustomWrapper props - isLast:', isLast);
  console.log('CustomWrapper props - hideInput:', hideInput);

  // Pass the rest of the props to the div element
  return (
    <div {...rest}>
      {children}
    </div>
  );
};

export default CustomWrapper;
