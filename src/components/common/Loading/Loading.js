import React from 'react';
import { useSelector } from 'react-redux';
import loadingIcon from 'assets/images/loading.gif';

const Loading = () => {

  const isLoading = useSelector(state => state.loadingReducer);

  let html = null;

  if (isLoading) {
    html = (
      <div className="loading-overlay">
        <img src={loadingIcon} alt="Loading icon" />
      </div>
    )
  }
  
  return html;

}

export default Loading;
