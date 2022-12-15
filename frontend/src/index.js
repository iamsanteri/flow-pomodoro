import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './config/reportWebVitals';
import * as serviceWorkerRegistration from './config/serviceWorkerRegistration';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function DocumentHead() {
  return (
    <HelmetProvider>
      <Helmet>
          <title>Santeri's Flow App</title>
          <meta name="description" content="This is a custom Pomodoro timer" />
          <meta name="keywords" content="pomodoro flow rest" />
      </Helmet>
    </HelmetProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <DocumentHead />
      <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
