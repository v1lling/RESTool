import React from 'react';
import { usePageTranslation } from '../../hooks/usePageTranslation';
import './serverStatusBanner.scss';

interface ServerStatusBannerProps {
  serverStatus: 'RUNNING' | 'NOT_RUNNING' | 'FAILED' | 'INITIALIZING';
}

export const ServerStatusBanner = ({ serverStatus }: ServerStatusBannerProps) => {
  const { translate } = usePageTranslation();
  
  // Only show for problematic states
  if (serverStatus === 'RUNNING') {
    return null;
  }
  
  const getStatusKey = () => {
    switch (serverStatus) {
      case 'FAILED':
        return 'global.serverStatus.failed';
      case 'NOT_RUNNING':
        return 'global.serverStatus.notRunning';
      case 'INITIALIZING':
        return 'global.serverStatus.initializing';
      default:
        return 'global.serverStatus.failed';
    }
  };

  const getIconClass = () => {
    switch (serverStatus) {
      case 'FAILED':
        return 'fa-exclamation-circle';
      case 'NOT_RUNNING':
        return 'fa-exclamation-triangle';
      case 'INITIALIZING':
        return 'fa-spinner fa-spin';
      default:
        return 'fa-exclamation-circle';
    }
  };

  return (
    <div className={`server-status-banner ${serverStatus.toLowerCase().replace('_', '-')}`}>
      <div className="banner-content">
        <i className={`fa ${getIconClass()}`} aria-hidden="true"></i>
        <span className="banner-message">{translate(getStatusKey())}</span>
      </div>
    </div>
  );
};