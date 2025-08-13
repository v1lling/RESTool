import React from 'react';
import { Button } from '../button/button.comp';
import './unappliedChangesBanner.scss';
import { usePageTranslation } from '../../hooks/usePageTranslation';

interface Props {
  onApply: () => Promise<void>;
}

export const UnappliedChangesBanner = ({ onApply }: Props) => {
    const { translate } = usePageTranslation();
  return (
    <div className="unapplied-changes-banner">
      <div className="banner-content">
        <span className="warning-text">
          <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
          {translate('global.common.unappliedChanges')}
        </span>
        <Button className="apply-changes-button" onClick={onApply} aria-label={translate('global.aria.applyChanges')}>
          {translate('global.buttons.applyChanges')}
        </Button>
      </div>
    </div>
  );
};
