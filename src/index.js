import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(document.getElementById('root'));
// I removed strict mode because React renders more than once.
root.render(
  <>
      <RecoilRoot>
          <App/>
      </RecoilRoot>
  </>
);

