import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DevelopmentSection from './components/DevelopmentSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between selection:bg-celestius-gold selection:text-black antialiased">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <DevelopmentSection />
      </main>
      <Footer />
    </div>
  );
}
