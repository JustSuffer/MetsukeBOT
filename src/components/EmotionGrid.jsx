import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Zap, Search, Moon, Frown } from 'lucide-react';

const EmotionGrid = ({ onCommand }) => {
  const { t } = useTranslation();
  
  const emotes = [
    { id: 'happy', icon: Eye, color: 'text-green-400' },
    { id: 'angry', icon: Frown, color: 'text-red-500' },
    { id: 'surprised', icon: Zap, color: 'text-yellow-400' },
    { id: 'sleeping', icon: Moon, color: 'text-blue-400' },
    { id: 'search', icon: Search, color: 'text-purple-400' }
  ];

  const handleEmote = (id) => {
    onCommand({ type: 'emotion', target: id });
  };

  return (
    <div className="border border-gothic-grey/30 bg-deep-black/60 p-6 rounded-lg flex-1">
       <h2 className="text-sm text-gothic-grey tracking-[0.2em] border-b border-gothic-grey/30 pb-2 mb-4 cyberpunk-text uppercase">
         {t('emotion_grid')}
       </h2>
       <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {emotes.map((emote) => {
            const Icon = emote.icon;
            return (
               <button 
                 key={emote.id} 
                 onClick={() => handleEmote(emote.id)}
                 className="relative overflow-hidden border border-gothic-grey/50 hover:border-metal-blue bg-deep-black hover:bg-metal-blue/10 rounded py-3 text-center text-[10px] lg:text-xs uppercase font-bold tracking-widest text-gothic-grey hover:text-monster-white transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)] group h-24 flex flex-col items-center justify-center gap-2"
               >
                 <div className="absolute inset-0 bg-gradient-to-t from-metal-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <Icon size={28} className={`${emote.color} opacity-40 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_currentColor] transition-all`} strokeWidth={1.5} />
                 <span className="relative z-10">{t(`emotions.${emote.id}`)}</span>
               </button>
            )
          })}
       </div>
    </div>
  );
};

export default EmotionGrid;
