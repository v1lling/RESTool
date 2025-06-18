import React from 'react';
import LogViewer from './logViewer.comp';
import { withAppContext } from '../withContext/withContext.comp';
import { IAppContext } from '../app.context';
import { usePageTranslation } from '../../hooks/usePageTranslation';

interface IProps {
  context: IAppContext;
}

const LogViewerPageComp: React.FC<IProps> = ({ context }) => {
  const { activePage } = context;
  const { translate } = usePageTranslation();

  return (
    <div className="app-page">
      <header className="app-page-header">
        <hgroup>
          <h2>{translate('logs.title')}</h2>
          <h4>{translate('logs.description')}</h4>
        </hgroup>
      </header>
      <main className="app-page-content">
        <LogViewer />
      </main>
    </div>
  );
};

export const LogViewerPage = withAppContext(LogViewerPageComp);
