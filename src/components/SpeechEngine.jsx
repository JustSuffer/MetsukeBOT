import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Send, TerminalSquare } from 'lucide-react';

const SpeechEngine = ({ onCommand }) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const handleSpeak = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onCommand({ type: 'speech', text: text.trim() });
      setText('');
    }
  };

  return (
    <div className="border border-gothic-grey/30 bg-deep-black/60 p-6 rounded-lg backdrop-blur flex-1">
      <h2 className="text-sm text-gothic-grey tracking-[0.2em] border-b border-gothic-grey/30 pb-2 mb-4 cyberpunk-text uppercase flex items-center gap-2">
         <Mic size={16} />
         {t('speech_engine')}
      </h2>
      <form onSubmit={handleSpeak} className="flex flex-col gap-4">
        <div className="relative">
          <TerminalSquare size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gothic-grey" />
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-deep-black/80 border border-gothic-grey/50 pl-12 pr-4 py-3 text-monster-white font-inter placeholder-gothic-grey/40 focus:outline-none focus:border-metal-blue focus:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all rounded shadow-inner"
            placeholder={t('placeholder_speech')}
            autoComplete="off"
          />
        </div>
        <button 
          type="submit"
          disabled={!text.trim()}
          className="group relative overflow-hidden bg-metal-blue/10 border border-metal-blue/50 disabled:border-gothic-grey/20 disabled:text-gothic-grey/50 hover:bg-metal-blue text-monster-white font-bold uppercase tracking-[0.2em] py-3 rounded transition-all duration-300 shadow-metal-glow disabled:shadow-none cyberpunk-text flex items-center justify-center gap-2"
        >
          <div className="absolute inset-0 w-0 bg-monster-white group-hover:w-full transition-all duration-300 ease-out z-0 disabled:hidden"></div>
          <span className="relative z-10 flex items-center gap-2 group-hover:text-deep-black transition-colors">
             {t('speak')} <Send size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </form>
      
      <div className="mt-4 flex items-center gap-2">
         <span className="w-1.5 h-1.5 rounded-full bg-metal-blue animate-ping"></span>
         <span className="text-[9px] text-gothic-grey uppercase tracking-widest font-mono">
            MAX98357A I2S DAC ONLINE
         </span>
      </div>
    </div>
  );
};

export default SpeechEngine;
