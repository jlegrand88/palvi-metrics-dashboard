'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const lightIcons = [
  '/star-wars-icons/icons8-bebe-yoda-48.png',
  '/star-wars-icons/icons8-chewbacca-48.png',
  '/star-wars-icons/icons8-ahsoka-tano-100.png'
];

const darkIcons = [
  '/star-wars-icons/icons8-darth-vader-48.png',
  '/star-wars-icons/darth-maul_icon-icons.com_76953(1).png'
];

const lightSaberColors = ['#0074D9', '#2ECC40', '#B10DC9', '#FFDC00'];
const darkSaberColor = '#FF4136';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentIcon, setCurrentIcon] = useState('');
  const [saberColor, setSaberColor] = useState('');

  useEffect(() => {
    setMounted(true);
    const isDark = theme === 'dark';
    
    if (isDark) {
      setCurrentIcon(darkIcons[Math.floor(Math.random() * darkIcons.length)]);
      setSaberColor(darkSaberColor);
    } else {
      setCurrentIcon(lightIcons[Math.floor(Math.random() * lightIcons.length)]);
      setSaberColor(lightSaberColors[Math.floor(Math.random() * lightSaberColors.length)]);
    }
  }, [theme]);

  if (!mounted || !currentIcon) return <div className="w-14 h-14" />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex flex-col items-center justify-center w-14 h-14 transition-transform duration-200 active:scale-90 group cursor-pointer"
    >
      {/* FIX: Usamos 'animate-pulse' de Tailwind directamente. 
         Si quieres algo más lento, lo forzamos con style 
      */}
      <div 
        className="relative z-10 mb-1 transition-transform duration-300 group-hover:-translate-y-1"
        style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
      >
        <Image 
          src={currentIcon} 
          alt="Force Toggle" 
          width={35} 
          height={35}
          className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
        />
      </div>

      {/* Sable de Luz Neón */}
      <div 
        className="h-[3px] rounded-full transition-all duration-300"
        style={{ 
          width: '70%',
          backgroundColor: saberColor,
          boxShadow: `0 0 8px ${saberColor}, 0 0 15px ${saberColor}`
        }}
      />
      
      {/* El "Brillo" en el suelo del Navbar */}
      <div 
        className="absolute bottom-1 w-8 h-1 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-sm"
        style={{ backgroundColor: saberColor }}
      />
    </button>
  );
};