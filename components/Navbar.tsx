'use client';

import { Layout, Typography, Segmented, Divider, ConfigProvider, theme } from 'antd';
import { ThemeToggle } from './ThemeToggle';

const { Header } = Layout;
const { Title } = Typography;

interface NavbarProps {
  selectedDataset: string;
  onDatasetChange: (value: string) => void;
}

export const Navbar = ({ selectedDataset, onDatasetChange }: NavbarProps) => {
  // Usamos el hook de antd para detectar el algoritmo actual (opcional, pero pro)
  const { token } = theme.useToken();

  return (
    <Header className="sticky top-0 z-50 w-full flex items-center justify-between px-6 h-16 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800">
      
      {/* Logo e Identidad */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="text-white font-bold text-xs">P</span>
        </div>
        <Title level={4} style={{ margin: 0 }} className="hidden sm:block !text-zinc-100">
          Palvi <span className="font-light text-zinc-400">Metrics</span>
        </Title>
      </div>

      {/* Controles y Theme Switcher */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-100 dark:bg-zinc-900 rounded-lg p-1 border border-gray-200 dark:border-zinc-800">
          <span className="text-[10px] font-bold text-zinc-500 px-2 uppercase tracking-tight">Dataset</span>
          
          {/* ConfigProvider local para arreglar el contraste del Segmented */}
          <ConfigProvider
            theme={{
              components: {
                Segmented: {
                  // En modo claro usamos blanco puro para el seleccionado (high contrast)
                  // En modo oscuro usamos un zinc que resalte
                  itemSelectedBg: 'var(--background)', 
                  itemSelectedColor: '#1677ff',
                  trackBg: 'transparent',
                },
              },
            }}
          >
            <Segmented
              options={['A', 'B', 'C', 'D']}
              value={selectedDataset}
              onChange={(value) => onDatasetChange(value as string)}
              className="bg-transparent border-none"
            />
          </ConfigProvider>
        </div>
        
        <Divider orientation="vertical" className="h-6 border-gray-300 dark:border-zinc-700" />
        
        <ThemeToggle />
      </div>
    </Header>
  );
};