import React from 'react';
import { useContext } from 'react';
import i18n from 'i18next';
import { AppContext } from '../app.context';
import './header.scss';
import { buildInfo } from '../../version';

// Logo will be imported when it exists
let logoImage: string | undefined;
try {
  // Dynamic import for logo - will throw if file doesn't exist
  logoImage = require('../../assets/images/logo.png');
} catch (e) {
  logoImage = undefined;
}

export const Header: React.FC = () => {
  const { config } = useContext(AppContext);

  // Only show header if logo exists
  if (!logoImage) {
    return null;
  }

  return (
    <header className="restool-header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logoImage} alt={config?.name} className="logo" />
          {buildInfo && (
            <div className="app-version">
              <h3>{buildInfo.version || 'dev'}</h3>
              <h4>
                {new Date(buildInfo.buildDate).toLocaleDateString(i18n.language, {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </h4>
            </div>
          )}
        </div>
      </div>
    </header >
  );
};