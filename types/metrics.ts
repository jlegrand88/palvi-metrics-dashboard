export type MetricKey = 
  | "traffic" | "leads_created" | "leads_qualified" | "deals_created" 
  | "deals_won" | "deals_lost" | "avg_response_time_min" 
  | "avg_deal_cycle_days" | "stale_deals" | "support_tickets_opened" 
  | "support_avg_resolution_hours";

export interface MetricMetadata {
  key: MetricKey;
  label: string;
  unit: string;
  direction: "higher_is_better" | "lower_is_better";
  description: string;
}

export interface DayData {
  date: string;
  metrics: Record<MetricKey, number | null>;
}

export interface Dataset {
  metadata: {
    start_date: string;
    end_date: string;
    days: number;
    metrics: MetricMetadata[];
  };
  days: DayData[];
}

export type MetricsJSON = Record<"A" | "B" | "C" | "D", Dataset>;