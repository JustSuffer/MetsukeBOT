import React from 'react';
import { useTranslation } from 'react-i18next';
import { Wifi, Battery, AlertCircle, Activity, ShieldCheck } from 'lucide-react';

const TelemetryPanel = ({ telemetry }) => {
  const { t } = useTranslation();
  
  // Calculate visual indicators
  const batteryColor = telemetry.battery > 7.4 ? 'text-metal-blue' : telemetry.battery > 6.8 ? 'text-yellow-400' : 'text-red-500';
  const signalColor = telemetry.signal > 70 ? 'text-green-400' : telemetry.signal > 30 ? 'text-yellow-400' : 'text-red-500';
  const distanceColor = telemetry.distance < 20 ? 'text-red-500' : telemetry.distance < 50 ? 'text-orange-400' : 'text-metal-blue';

  return (
    <div className="border border-gothic-grey/30 bg-deep-black/60 p-4 lg:p-6 rounded-lg flex flex-col md:flex-row items-center justify-between shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] border-t border-t-gothic-grey/50">
       <div className="flex items-center gap-4 md:border-r border-gothic-grey/30 md:pr-6 w-full md:w-auto justify-between md:justify-start mb-4 md:mb-0">
         <div className="flex items-center gap-3">
           <Wifi size={24} className={`${signalColor} drop-shadow-[0_0_8px_currentColor] transition-colors`} />
           <div>
              <div className="text-[10px] text-gothic-grey uppercase font-mono tracking-widest">{t('connection')}</div>
              <div className="text-sm font-bold text-monster-white cyberpunk-text tracking-widest">{telemetry.signal}%</div>
           </div>
         </div>
         <div className="text-[9px] text-gothic-grey font-mono text-right md:hidden">WEB_SOCK<br/>ACTIVE</div>
       </div>

       <div className="flex items-center gap-4 md:border-r border-gothic-grey/30 md:px-6 w-full md:w-auto justify-between md:justify-start mb-4 md:mb-0">
         <div className="flex items-center gap-3">
           <Activity size={24} className={`${distanceColor} drop-shadow-[0_0_8px_currentColor] transition-colors`} />
           <div>
              <div className="text-[10px] text-gothic-grey uppercase font-mono tracking-widest">{t('distance')}</div>
              <div className="text-sm font-bold text-monster-white cyberpunk-text tracking-widest">{telemetry.distance} cm</div>
           </div>
         </div>
         <div className="text-[9px] text-gothic-grey font-mono text-right md:hidden">HC-SR04<br/>SONAR</div>
       </div>

       <div className="flex items-center gap-4 md:pl-6 w-full md:w-auto justify-between md:justify-start">
         <div className="flex items-center gap-3">
           <Battery size={24} className={`${batteryColor} drop-shadow-[0_0_8px_currentColor] transition-colors`} />
           <div>
              <div className="text-[10px] text-gothic-grey uppercase font-mono tracking-widest">{t('battery')}</div>
              <div className="text-sm font-bold text-monster-white cyberpunk-text tracking-widest">{telemetry.battery.toFixed(1)}V</div>
           </div>
         </div>
         <div className="text-[9px] text-gothic-grey font-mono text-right md:hidden">2S_LIPO<br/>POWER</div>
       </div>
    </div>
  );
};

export default TelemetryPanel;
