import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const I18nProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsReady(true);
    } else {
      i18n.on('initialized', () => {
        setIsReady(true);
      });
    }
  }, [i18n]);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default I18nProvider;
