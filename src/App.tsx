import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import VaultPanel from './components/VaultPanel';
import HomePage from './pages/HomePage';
import CompetitionPage from './pages/CompetitionPage';
import MachinePage from './pages/MachinePage';
import ChallengePage from './pages/ChallengePage';

function LegacyBoot2RootRedirect() {
  const location = useLocation();
  const newPath = location.pathname.replace(/^\/boot2root/, '/security-challenges');
  return <Navigate to={newPath} replace />;
}

function App() {
  return (
    <div className="min-h-screen bg-surface-0">
      <ScrollToTop />
      <VaultPanel />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <main>
              <HomePage />
            </main>
            <Footer />
          </>
        } />
        <Route path="/ctf/:id" element={<CompetitionPage />} />
        <Route path="/ctf/:id/:challengeId" element={<ChallengePage />} />
        <Route path="/security-challenges/:id" element={<CompetitionPage />} />
        <Route path="/security-challenges/:id/:machineId" element={<MachinePage />} />
        {/* Legacy redirects for the previous /boot2root/* URLs */}
        <Route path="/boot2root/*" element={<LegacyBoot2RootRedirect />} />
        {/* Redirects for section URLs */}
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/achievements" element={<Navigate to="/#achievements" replace />} />
        <Route path="/skills" element={<Navigate to="/#skills" replace />} />
        <Route path="/timeline" element={<Navigate to="/#timeline" replace />} />
        {/* 404 catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
