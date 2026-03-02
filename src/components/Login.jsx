import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, ShieldAlert, Lock, User, TerminalSquare } from 'lucide-react';

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'GemCan' && password.length > 3) {
      // Mock encrypted login wait
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } else {
      setError(true);
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr');
  };

  return (
    <div className="min-h-screen bg-deep-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-metal-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Language Toggle */}
      <button 
        onClick={toggleLanguage}
        className="absolute top-6 right-8 text-gothic-grey hover:text-metal-blue transition-colors font-bold tracking-widest text-sm uppercase flex items-center gap-2"
      >
        <TerminalSquare size={16} />
        {i18n.language === 'tr' ? 'EN' : 'TR'}
      </button>

      {/* Main Login Card */}
      <div className="w-full max-w-md p-8 relative z-10 border border-gothic-grey/30 bg-deep-black/60 shadow-lg backdrop-blur-sm shadow-metal-glow/20 rounded-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4 group">
            <div className="absolute inset-0 bg-metal-blue/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <Eye size={72} strokeWidth={1.5} className="text-monster-white drop-shadow-metal-glow relative z-10 animate-pulse" />
          </div>
          <h1 className="text-3xl text-monster-white font-bold tracking-[0.2em] cyberpunk-text drop-shadow-metal-glow">
            {t('login_title')}
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-metal-blue to-transparent mt-4 opacity-50"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 relative">
            <label className="text-xs text-gothic-grey tracking-[0.1em] uppercase font-semibold">{t('username')}</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gothic-grey" />
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                className="w-full bg-deep-black border border-gothic-grey/50 px-10 py-3 text-monster-white placeholder-gothic-grey/50 focus:outline-none focus:border-metal-blue focus:drop-shadow-metal-glow transition-all rounded transition-colors text-sm"
                placeholder="GEMCAN..."
              />
            </div>
          </div>

          <div className="space-y-2 relative">
            <label className="text-xs text-gothic-grey tracking-[0.1em] uppercase font-semibold">{t('password')}</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gothic-grey" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-deep-black border border-gothic-grey/50 px-10 py-3 text-monster-white placeholder-gothic-grey/50 focus:outline-none focus:border-metal-blue focus:drop-shadow-metal-glow transition-all rounded transition-colors text-sm font-mono tracking-widest"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="absolute -bottom-6 left-0 text-[10px] text-red-500 flex items-center gap-1 font-mono uppercase tracking-wider">
                <ShieldAlert size={12} /> Access Denied. Verify Credentials.
              </div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full py-4 mt-8 relative overflow-hidden group bg-metal-blue/10 border border-metal-blue/50 text-monster-white hover:bg-metal-blue hover:text-deep-black transition-all duration-300 cyberpunk-text tracking-[0.2em] uppercase font-bold text-sm"
          >
            <div className="absolute inset-0 w-0 bg-monster-white group-hover:w-full transition-all duration-300 ease-out z-0"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              <TerminalSquare size={16} />
              {t('connect')}
            </span>
          </button>
        </form>
      </div>

      <div className="mt-12 text-center opacity-40">
        <p className="text-[10px] text-gothic-grey font-mono uppercase tracking-[0.2em]">
          SECURE CONNECTION PROTOCOL V1.2.9 <br/>
          ESP-NOW & WEBSOCKET BRIDGE
        </p>
      </div>
    </div>
  );
};

export default Login;
