'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Segmented, Spin, Divider } from 'antd';
import { MetricCard } from '@/components/MetricCard';
import { useMetrics } from '@/hooks/useMetrics';
import { MetricsJSON } from '@/types/metrics';
import { TrendChart } from '@/components/TrendChart';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
  const [data, setData] = useState<MetricsJSON | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch inicial de los datos
  useEffect(() => {
    fetch('/api/metrics')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  const { selectedDataset, setSelectedDataset, metrics, chartData } = useMetrics(data);

  if (loading || !data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" description="Cargando métricas de Palvi..." />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white border-b px-8 flex items-center justify-between sticky top-0 z-10">
        <div>
          <Title level={4} style={{ margin: 0 }}>Palvi Executive Report</Title>
          <Text type="secondary" size="small">Insight Daily Overview</Text>
        </div>
        
        <div className="flex items-center gap-4">
          <Text strong>Dataset:</Text>
          <Segmented
            options={['A', 'B', 'C', 'D']}
            value={selectedDataset}
            onChange={(value) => setSelectedDataset(value as any)}
          />
        </div>
      </Header>

      <Content className="p-8 max-w-[1400px] mx-auto w-full">
        {/* Sección de "Foco" / Alertas */}
        <div className="mb-8">
          <Title level={5}>Métricas Clave de Hoy</Title>
          <Text type="secondary">
            Basado en la comparación del último día reportado vs el anterior.
          </Text>
        </div>

        {/* Grid de Métricas */}
        <Row gutter={[16, 16]}>
          {metrics.map((m) => (
            <Col xs={24} sm={12} md={8} lg={6} key={m.key}>
              <MetricCard 
                label={m.label}
                value={m.value}
                unit={m.unit}
                trend={m.trend}
                status={m.status}
              />
            </Col>
          ))}
        </Row>

        <Divider />
        
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
              label="Ventas Cerradas" 
              color="#52c41a" 
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}