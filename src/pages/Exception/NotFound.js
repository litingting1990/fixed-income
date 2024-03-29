import React from 'react';
import Exception from '../../components/Exception';

const NotFound = () => {
  return (
    <Exception
      statusCode="404"
      image="https://img.alicdn.com/tfs/TB1BJ_3GxTpK1RjSZFKXXa2wXXa-260-260.png"
      description="抱歉，你访问的页面不存在"
    />
  );
};

export default NotFound;
