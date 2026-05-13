import { Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface Props {
  label: string;
  value: number | null;
  unit: string;
  trend: number;
  status: 'success' | 'error' | 'neutral';
}

export const MetricCard = ({ label, value, unit, trend, status }: Props) => (
  <Card hoverable className="shadow-sm">
    <Statistic
      title={label}
      value={value ?? 'N/A'}
      suffix={unit}
      precision={2}
      valueStyle={{ color: status === 'success' ? '#3f8600' : status === 'error' ? '#cf1322' : 'inherit' }}
      prefix={status === 'success' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
    />
    <div className={`text-xs mt-2 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
      {trend.toFixed(1)}% vs ayer
    </div>
  </Card>
);