import React from 'react';

const Empty = () => {
  return (
    <div className="empty-block">
      <h1 className="title-empty">
        Không tìm thấy dữ liệu liên quan!
        <i className="fa fa-exclamation-triangle ml-2" aria-hidden="true"></i>
        </h1>
    </div>
  );
};

export default Empty;
