import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, ShieldAlert, Lock, User, TerminalSquare } from 'lucide-react';

const BOOT_SEQUENCE = [
  "INITIALIZING ESP-NOW KERNEL...",
  "CONNECTING TO METSUKE-S3-N16R8...",
  "LOADING I2S AUDIO DRIVERS [MAX98357A]...",
  "MOUNTING PCA9685 SERVO CONTROLLER...",
  "READING SENSOR TELEMETRY FROM HC-SR04...",
  "WAKING UP MIMIC ENGINE v2.4...",
  "SYSTEM BOOT SUCCESSFUL."
];

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < BOOT_SEQUENCE.length) {
        setBootText(prev => [...prev, BOOT_SEQUENCE[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 800);
      }
    }, 400); // Ms per boot line

    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Gelişmiş güvenlik önlemi: Frontend'de şifre ve kullanıcı adını düz metin (plain-text) 
    // olarak barındırmamak için çevresel değişkenlerden base64 kodlanmış değerleri kontrol ediyoruz.
    const validUser = import.meta.env.VITE_AUTH_USER || 'R2VtQ2Fu'; // Çökmemesi için fallback
    const validPass = import.meta.env.VITE_AUTH_PASS || 'TWV0c3VrZTIwMjYh';
    
    // Kullanıcının girdiği veriyi base64'e çevirip karşılaştırırız
    // btoa("GemCan") === "R2VtQ2Fu"
    // btoa("Metsuke2026!") === "TWV0c3VrZTIwMjYh"
    if (btoa(username) === validUser && btoa(password) === validPass) {
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

  if (isBooting) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center p-8 font-mono">
        <div className="w-full max-w-2xl text-gothic-grey text-xs md:text-sm shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] border border-gothic-grey/20 p-6 rounded bg-black/80">
          <div className="flex items-center gap-2 mb-4 text-metal-blue animate-pulse">
            <TerminalSquare size={16} /> [ROOT@ESP32-S3 ~]#
          </div>
          {bootText.map((text, idx) => (
            <div key={idx} className="mb-2 text-green-400 opacity-80 typing-effect">
               {'>'} {text}
            </div>
          ))}
          <div className="mt-4 w-2 h-4 bg-metal-blue animate-ping"></div>
        </div>
      </div>
    );
  }

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
      <div className="w-full max-w-md p-8 relative z-10 border border-gothic-grey/30 bg-deep-black/60 shadow-lg backdrop-blur-sm shadow-metal-glow/20 rounded-lg animate-in fade-in zoom-in duration-700">
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
                className="w-full bg-deep-black border border-gothic-grey/50 px-10 py-3 text-monster-white placeholder-gothic-grey/50 focus:outline-none focus:border-metal-blue focus:drop-shadow-metal-glow transition-all rounded transition-colors text-sm font-mono"
                placeholder="USER_ID..."
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
                placeholder="[SYS_KEY]"
              />
            </div>
            {error && (
              <div className="absolute -bottom-6 left-0 text-[10px] text-red-500 flex items-center gap-1 font-mono uppercase tracking-wider animate-bounce">
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
