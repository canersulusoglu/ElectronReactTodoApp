import React, {useEffect} from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './App.css';

import Header from './components/Header';
import Body from './components/Body';

// Moment Locales
import moment from 'moment';
import 'moment/min/locales'

function App() {

  useEffect(() => {
    const lang = navigator.language; // tr en-US ...
    moment.locale(lang);
  }, [])

  return (
    <I18nextProvider i18n={ i18n }>
      <div className="App">
        <Header/>
        <Body/>
      </div>
    </I18nextProvider>
  );
}

export default App;
