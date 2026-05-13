import { Card, Statistic, Tooltip } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined } from '@ant-design/icons';

interface Props {
  label: string;
  value: number | null;
  unit: string;
  trend: number;
  status: 'success' | 'error' | 'neutral';
  description?: string;
}

export const MetricCard = ({ label, value, unit, trend, status, description }: Props) => {
  // Definimos el color según el negocio
  const getStatusColor = () => {
    if (status === 'success') return '#3f8600';
    if (status === 'error') return '#cf1322';
    return '#d46b08';
  };

  return (
    <Card hoverable className="shadow-sm border-0 h-full">
      <Statistic
        title={
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium">{label}</span>
            {description && (
              <Tooltip title={description}>
                <InfoCircleOutlined className="text-gray-400 cursor-help" />
              </Tooltip>
            )}
          </div>
        }
        value={value ?? 'N/A'}
        suffix={<span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>}
        precision={value && value % 1 !== 0 ? 2 : 0}
        // USANDO LA NUEVA API 'styles'
        styles={{
          content: {
            color: getStatusColor(),
            fontSize: '1.8rem',
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }
        }}
        prefix={
          status !== 'neutral' && (
            <span style={{ color: getStatusColor() }}>
              {trend > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </span>
          )
        }
      />
      <div className="mt-2 flex items-center gap-2">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          status === 'success' ? 'bg-green-50 text-green-700' : 
          status === 'error' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'
        }`}>
          {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
        </span>
        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
          vs ayer
        </span>
      </div>
    </Card>
  );
};