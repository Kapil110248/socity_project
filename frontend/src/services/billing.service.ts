import api from '@/lib/api';
import { API_CONFIG } from '@/config/api.config';

export const BillingService = {
  getInvoices: async (params?: {
    status?: string;
    month?: string;
    unitId?: number;
  }) => {
    let url = API_CONFIG.BILLING.INVOICES;
    const queryParams: string[] = [];
    
    if (params?.status) queryParams.push(`status=${params.status}`);
    if (params?.month) queryParams.push(`month=${params.month}`);
    if (params?.unitId) queryParams.push(`unitId=${params.unitId}`);
    
    if (queryParams.length) url += `?${queryParams.join('&')}`;
    
    const response = await api.get(url);
    return response.data;
  },

  generateInvoices: async (data: {
    month: string;
    year: number;
  }) => {
    const response = await api.post(API_CONFIG.BILLING.GENERATE, data);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get(API_CONFIG.BILLING.STATS);
    return response.data;
  },

  getDefaulters: async () => {
    const response = await api.get(API_CONFIG.BILLING.DEFAULTERS);
    return response.data;
  },
};
