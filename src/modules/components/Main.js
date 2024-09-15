import React, { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardContainer from '../containers/dashboard/DashboardContainer';

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

Main.propTypes = {};
