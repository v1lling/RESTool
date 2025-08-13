import React, { useState, useRef } from 'react';
import LogViewer from './logViewer.comp';
import { withAppContext } from '../withContext/withContext.comp';
import { IAppContext } from '../app.context';
import { usePageTranslation } from '../../hooks/usePageTranslation';
import { Button } from '../button/button.comp';

interface IProps {
  context: IAppContext;
}

const LogViewerPageComp: React.FC<IProps> = ({ context }) => {
  const { activePage } = context;
  const { translate } = usePageTranslation();
  const [isPolling, setIsPolling] = useState(true);
  const logViewerRef = useRef<any>(null);

  const togglePolling = () => {
    setIsPolling(!isPolling);
    if (logViewerRef.current) {
      logViewerRef.current.setPollingState(!isPolling);
    }
  };

  const downloadLogs = () => {
    window.open('/api/v1/logs/download', '_blank');
  };

  return (
    <div className="app-page">
      <header className="app-page-header">
        <hgroup>
          <h2>{translate('logs.title')}</h2>
          <h4>{translate('logs.description')}</h4>
        </hgroup>
        <div className="log-viewer-buttons">
          <Button 
            className="download-button"
            onClick={downloadLogs}
          >
            <i className="fa fa-download" aria-hidden="true"></i>
            {translate('logs.buttons.downloadLogs')}
          </Button>
          <Button 
            className={`auto-refresh-button ${isPolling ? 'active' : ''}`}
            onClick={togglePolling}
          >
            {isPolling ? translate('logs.buttons.stopAutoRefresh') : translate('logs.buttons.startAutoRefresh')}
          </Button>
        </div>
      </header>
      <main className="app-page-content">
        <LogViewer ref={logViewerRef} initialPollingState={isPolling} />
      </main>
    </div>
  );
};

export const LogViewerPage = withAppContext(LogViewerPageComp);
