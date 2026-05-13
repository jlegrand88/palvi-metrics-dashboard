import { useState, useMemo } from 'react';
import { MetricsJSON } from '@/types/metrics';

export const useMetrics = (allData: MetricsJSON | null) => {
  const [selectedDataset, setSelectedDataset] = useState<keyof MetricsJSON>('A');
  
  // El hook se ejecuta SIEMPRE, pero su lógica interna es defensiva
  const currentDataset = useMemo(() => {
    if (!allData) return null;
    return allData[selectedDataset];
  }, [allData, selectedDataset]);

  const metrics = useMemo(() => {
    if (!currentDataset) return [];

    const days = currentDataset.days;
    if (days.length < 2) return [];

    const today = days[days.length - 1];
    const yesterday = days[days.length - 2];

    return currentDataset.metadata.metrics.map(meta => {
      const currentVal = today.metrics[meta.key];
      const prevVal = yesterday.metrics[meta.key];
      
      let trend = 0;
      if (currentVal !== null && prevVal !== null && prevVal !== 0) {
        trend = ((currentVal - prevVal) / prevVal) * 100;
      }

      return {
        ...meta,
        value: currentVal,
        trend,
        status: trend === 0 ? 'neutral' : 
                (meta.direction === 'higher_is_better' ? 
                  (trend > 0 ? 'success' : 'error') : 
                  (trend < 0 ? 'success' : 'error'))
      };
    });
  }, [currentDataset]);

  return {
    selectedDataset,
    setSelectedDataset,
    metrics,
    chartData: currentDataset?.days || []
  };
};