import React, { useEffect, useState, useRef } from 'react';
import { withAppContext } from '../withContext/withContext.comp';
import { IAppContext } from '../app.context';
import { usePageTranslation } from '../../hooks/usePageTranslation';
import './logViewer.scss';

interface LogEntry {
  timestamp?: string;
  level?: string;
  logger?: string;
  content?: string;
  raw: string;
}

interface IProps {
  context: IAppContext;
}

const LogViewerComp: React.FC<IProps> = ({ context }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPolling, setIsPolling] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [lines, setLines] = useState(100);
  const contentRef = useRef<HTMLDivElement>(null);
  const { httpService } = context;
  const { translate } = usePageTranslation();

  const fetchLogs = async () => {
    try {
      const result = await httpService.fetch({
        method: 'get',
        origUrl: '/logs'
      });

      if (result?.status === 'success' && Array.isArray(result.data)) {
        const parsedLogs = result.data.map((log: { message: string }) => {
          // Example: 14:24:01.729 [INFO ] o.a.j.m.l.AbstractStateMailetProcessor - Matcher All instantiated.
          const match = log.message.match(/(\d{2}:\d{2}:\d{2}\.\d{3})\s+\[(\w+)\s*\]\s+([^-]+)-\s*(.*)/);
          
          if (match) {
            const [, timestamp, level, logger, content] = match;
            return {
              timestamp,
              level,
              logger,
              content,
              raw: log.message
            };
          }
          return { raw: log.message };
        });
        setLogs(parsedLogs);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchLogs();

    // Set up polling if enabled
    let pollInterval: number | undefined;
    if (isPolling) {
      pollInterval = window.setInterval(fetchLogs, 2000);
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [isPolling, lines]);

  useEffect(() => {
    if (autoScroll && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const isScrolledToBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10;
    setAutoScroll(isScrolledToBottom);
  };

  const togglePolling = () => {
    setIsPolling(!isPolling);
  };

  const downloadLogs = () => {
    window.open('/api/v1/logs/download', '_blank');
  };

  const getLevelClass = (level: string): string => {
    switch (level.trim()) {
      case 'ERROR': return 'level-error';
      case 'WARN': return 'level-warn';
      case 'INFO': return 'level-info';
      case 'DEBUG': return 'level-debug';
      case 'TRACE': return 'level-trace';
      default: return '';
    }
  };


  const renderLogEntry = (log: LogEntry) => {
    if (log.timestamp && log.level && log.logger && log.content) {
      return (
        <>
          <span className="log-viewer__timestamp">{log.timestamp}</span>
          <span className={`log-viewer__level ${getLevelClass(log.level)}`}>[{log.level}]</span>
          <span className="log-viewer__logger">{log.logger}</span>
          <span className="log-viewer__content">{log.content.trim()}</span>
        </>
      );
    }
    return <span className="log-viewer__message">{log.raw}</span>;
  };

  return (
    <div className="log-viewer">
      <div className="log-viewer__controls">
        <button 
          className={`log-viewer__button ${isPolling ? 'active' : ''}`}
          onClick={togglePolling}
        >
          {isPolling ? translate('logs.buttons.stopAutoRefresh') : translate('logs.buttons.startAutoRefresh')}
        </button>
        <button 
          className="log-viewer__button"
          onClick={() => {
            downloadLogs();
          }}
        >
          {translate('logs.buttons.downloadLogs')}
        </button>
      </div>
      <div className="log-viewer__wrapper" ref={contentRef} onScroll={handleScroll}>
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="log-viewer__entry">
              {renderLogEntry(log)}
            </div>
          ))
        ) : (
          <div className="log-viewer__empty-state">
            <i className="fa fa-file-text-o"></i>
            <h3>{translate('logs.emptyState.title')}</h3>
            <p>{translate('logs.emptyState.description')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAppContext(LogViewerComp);
