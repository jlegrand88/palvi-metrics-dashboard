'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Spin } from 'antd';
import { useMetrics } from '@/hooks/useMetrics';
import { MetricsJSON } from '@/types/metrics';
import { Navbar } from '@/components/Navbar';
import { MetricCard } from '@/components/MetricCard';
import { TrendChart } from '@/components/TrendChart';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
  const [data, setData] = useState<MetricsJSON | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/metrics')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const { selectedDataset, setSelectedDataset, metrics, chartData } = useMetrics(data);

  if (loading || !data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
        <Spin size="large" description="Cargando métricas ejecutivas..." />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <Navbar 
        selectedDataset={selectedDataset} 
        onDatasetChange={(value) => setSelectedDataset(value as "A" | "B" | "C" | "D")}
      />

      <Content className="p-6 max-w-[1400px] mx-auto w-full">
        {/* Encabezado de sección */}
        <div className="mb-8">
          <Title level={3} className="dark:text-white mb-1">Resumen Operativo</Title>
          <Text type="secondary" className="dark:text-zinc-400">
            Análisis de rendimiento diario para el Dataset {selectedDataset}
          </Text>
        </div>

        {/* Grid de Tarjetas */}
        <Row gutter={[16, 16]}>
          {metrics.map((m) => (
            <Col xs={24} sm={12} lg={6} key={m.key}>
              <MetricCard 
                label={m.label}
                value={m.value}
                unit={m.unit}
                trend={m.trend}
                status={m.status}
                description={m.description}
              />
            </Col>
          ))}
        </Row>

        {/* Sección de Gráficos */}
        <Row gutter={[16, 16]} className="mt-8">
          <Col xs={24} lg={12}>
            <TrendChart 
              data={chartData} 
              metricKey="traffic" 
              label="Tráfico Web" 
              color="#1677ff" 
            />
          </Col>
          <Col xs={24} lg={12}>
            <TrendChart 
              data={chartData} 
              metricKey="deals_won" 
              label="Ventas Cerradas (Deals)" 
              color="#52c41a" 
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}