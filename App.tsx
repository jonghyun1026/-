import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Github, Instagram, Linkedin, Mail, Sparkles } from 'lucide-react';
import { SectionId } from './types';
import { HeroSection, AboutSection, StudySection, TemplatesSection, PortfolioSection } from './components/Sections';
import { AiAssistant } from './components/AiAssistant';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '소개', id: SectionId.ABOUT },
    { name: '스터디 & 강의', id: SectionId.STUDY },
    { name: '템플릿', id: SectionId.TEMPLATES },
    { name: '포트폴리오', id: SectionId.PORTFOLIO },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      {/* --- Navigation --- */}
      <header 
        className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-slate-200/50 py-3' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className={`flex items-center space-x-2 font-bold text-xl cursor-pointer tracking-tight transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-white'}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className={`p-1.5 rounded-lg ${scrolled ? 'bg-indigo-600 text-white' : 'bg-white/20 text-white backdrop-blur-sm'}`}>
              <Sparkles className="h-5 w-5" />
            </div>
            <span>신박한 바이브코딩</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium transition-colors hover:text-indigo-400 ${scrolled ? 'text-slate-600' : 'text-slate-200/90'}`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-md transition-colors ${scrolled ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/10 text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? 
               <X /> : 
               <Menu />
             }
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-6 flex flex-col space-y-4 md:hidden animate-in slide-in-from-top-2">
            {navLinks.map(link => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-left text-base font-medium text-slate-700 py-3 border-b border-slate-50 last:border-none hover:text-indigo-600"
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* --- Main Content --- */}
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <StudySection />
        <TemplatesSection />
        <PortfolioSection />
      </main>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <h3 className="text-white font-bold text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-indigo-400"/> 
                신박한 바이브코딩
              </h3>
              <p className="text-sm leading-relaxed max-w-sm text-slate-400 word-keep-all">
                당신의 HR 커리어에 '신박한' 변화를 주세요. 로우코드와 AI로 나만의 도구를 만드는 크리에이터 커뮤니티입니다.
              </p>
              <div className="flex space-x-5 pt-2">
                <a href="#" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-200"><Instagram size={22} /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-200"><Linkedin size={22} /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-200"><Github size={22} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">커뮤니티</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">그로스 클럽</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">바이브 강의</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">디스코드 입장</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">문의하기</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                  <Mail size={16} className="text-indigo-400 group-hover:text-indigo-300"/> 
                  hello@sinbak-vibe.com
                </li>
                <li>서울시 강남구 테헤란로 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-8 text-xs text-center text-slate-500 font-medium">
            &copy; 2025 신박한 바이브코딩. All rights reserved.
          </div>
        </div>
      </footer>

      {/* --- Floating AI Assistant --- */}
      <AiAssistant />
    </div>
  );
};

export default App;