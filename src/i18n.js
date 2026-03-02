import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "login_title": "METSUKE LOGIN",
      "username": "Username",
      "password": "Password",
      "connect": "CONNECT",
      "joystick_panel": "MOVEMENT",
      "emotion_grid": "MIMIC ENGINE",
      "speech_engine": "SPEECH ENGINE",
      "telemetry": "TELEMETRY",
      "distance": "Distance",
      "battery": "Battery",
      "connection": "Signal",
      "speak": "SPEAK",
      "placeholder_speech": "Enter text...",
      "emotions": {
        "happy": "Happy",
        "angry": "Angry",
        "surprised": "Surprised",
        "sleeping": "Sleeping",
        "search": "Search Mode"
      }
    }
  },
  tr: {
    translation: {
      "login_title": "METSUKE GİRİŞ",
      "username": "Kullanıcı Adı",
      "password": "Şifre",
      "connect": "BAĞLAN",
      "joystick_panel": "HAREKET KONTROL",
      "emotion_grid": "MİMİK MOTORU",
      "speech_engine": "SES MOTORU",
      "telemetry": "TELEMETRİ",
      "distance": "Mesafe",
      "battery": "Batarya",
      "connection": "Sinyal",
      "speak": "KONUŞTUR",
      "placeholder_speech": "Metin girin...",
      "emotions": {
        "happy": "Mutlu",
        "angry": "Kızgın",
        "surprised": "Şaşkın",
        "sleeping": "Uyuyor",
        "search": "Arama Modu"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "tr",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
