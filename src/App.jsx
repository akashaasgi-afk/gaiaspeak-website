import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TokenCards } from './components/TokenCards';
import { HowItWorks } from './components/HowItWorks';
import { Distribution } from './components/Distribution';
import { StageIndicator } from './components/StageIndicator';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <TokenCards />
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent" />
        <HowItWorks />
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent" />
        <Distribution />
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <StageIndicator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
