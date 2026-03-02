import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Terminal } from 'lucide-react';
import JoystickPanel from './JoystickPanel';
import EmotionGrid from './EmotionGrid';
import SpeechEngine from './SpeechEngine';
import TelemetryPanel from './TelemetryPanel';
import { useWebSocket } from '../hooks/useWebSocket';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { isConnected, telemetry, sendCommand } = useWebSocket();

  return (
    <div className="min-h-screen bg-deep-black text-monster-white flex flex-col p-4 md:p-8 font-inter overflow-x-hidden relative">
      {/* Heavy Cyberpunk Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Header Panel */}
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-gothic-grey/40 pb-4 mb-6 relative z-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-metal-blue/10 border-2 border-metal-blue rounded flex items-center justify-center shadow-metal-glow group transition-all hover:bg-metal-blue/20">
             <AlertCircle className="text-metal-blue group-hover:scale-110 transition-transform" size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-[0.15em] cyberpunk-text drop-shadow-metal-glow text-monster-white uppercase block leading-none">
              Metsuke Controller
            </h1>
            <div className="flex items-center gap-2 mt-2">
               <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`}></span>
               <p className="text-[10px] text-gothic-grey uppercase tracking-widest font-mono">
                 SYS_ACTIVE: ESP32-S3 N16R8 | WS_LINK: {isConnected ? 'SECURE' : 'OFFLINE'}
               </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={() => i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr')}
            className="text-gothic-grey hover:text-monster-white font-mono text-[10px] border border-gothic-grey/40 hover:border-metal-blue px-4 py-2 rounded transition-colors flex items-center gap-2"
          >
            <Terminal size={14} />
            {i18n.language === 'tr' ? 'ENGLISH_SYS' : 'TÜRKÇE_SİS'}
          </button>
        </div>
      </header>

      {/* Grid Content Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 relative z-10 h-full">
        {/* Left Column: Movement & Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full">
          <JoystickPanel onCommand={sendCommand} />
        </div>

        {/* Right Column: Emotes, Speech & Telemetry */}
        <div className="lg:col-span-7 flex flex-col gap-6 h-full">
          {/* Telemetry Panel */}
          <TelemetryPanel telemetry={telemetry} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
             {/* Speech Engine */}
             <div className="flex flex-col h-full">
                <SpeechEngine onCommand={sendCommand} />
             </div>

             {/* Emotion Grid */}
             <div className="flex flex-col h-full">
                <EmotionGrid onCommand={sendCommand} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
