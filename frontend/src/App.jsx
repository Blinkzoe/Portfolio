import { useState } from 'react';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Education from './pages/Education';
import Contact from './pages/Contact';

import { trackAction } from './utils/tracking';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tabId, tabName) => {
    setActiveTab(tabId);

    trackAction(`Pestaña: ${tabName}`);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'experience':
        return <Experience />;

      case 'projects':
        return <Projects />;

      case 'skills':
        return <Skills />;

      case 'education':
        return <Education />;

      case 'contact':
        return <Contact />;

      default:
        return <Home onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-800 font-sans antialiased">

      <Header />

      <Navigation
        activeTab={activeTab}
        onNavigate={handleTabChange}
      />

      <main>
        {renderPage()}
      </main>

      <Footer />

    </div>
  );
}
