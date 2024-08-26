'use client';
import i18n from '@/i18n';
import { store } from '@/store';
import { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

export function LangProvider(props: PropsWithChildren) {
  const {
    children
  } = props;

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </Provider>
  );
}
