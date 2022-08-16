import React from 'react';
import ReactDOM from 'react-dom';
import Launcher from './views/launcher/Launcher';
import AdminDashboard from './views/admin/AdminDashboard';
import Viewer from './views/viewer/Viewer';
import SimpleReactLightbox from 'simple-react-lightbox';
import APIContextProvider from './views/admin/providers/APIContextProvider';
import './css/common.css';

document.getElementById("app-launcher") ? ReactDOM.render(<Launcher />, document.getElementById("app-launcher")) : null;

document.getElementById("admin") ? ReactDOM.render(
  <APIContextProvider>
    <AdminDashboard />
  </APIContextProvider>, document.getElementById("admin")) : null;

document.getElementById("app-viewer") ? ReactDOM.render(
  <SimpleReactLightbox>
    <Viewer />
  </SimpleReactLightbox>, document.getElementById("app-viewer")) : null;