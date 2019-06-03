import React from 'react';
import Exception from '../../components/Exception';

const Forbidden = () => {
  return (
    <Exception
      statusCode="403"
      image="https://img.alicdn.com/tfs/TB174TvGCzqK1RjSZPcXXbTepXa-260-260.png"
      description="抱歉，你无权访问该页面"
    />
  );
};

export default Forbidden;
