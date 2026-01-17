import api from '@/lib/api';
import { API_CONFIG } from '@/config/api.config';

export const VendorService = {
  getAll: async (typeFilter?: string, statusFilter?: string) => {
    let url = API_CONFIG.VENDOR.LIST;
    const params: string[] = [];
    if (typeFilter && typeFilter !== 'all') params.push(`type=${typeFilter}`);
    if (statusFilter && statusFilter !== 'all') params.push(`status=${statusFilter}`);
    if (params.length) url += `?${params.join('&')}`;
    
    const response = await api.get(url);
    return response.data;
  },

  getById: async (id: number | string) => {
    const response = await api.get(API_CONFIG.VENDOR.GET(id));
    return response.data;
  },

  create: async (data: {
    name: string;
    company?: string;
    type: string;
    contactPerson: string;
    phone: string;
    email?: string;
    address?: string;
    gst?: string;
    pan?: string;
    contractStart?: string;
    contractEnd?: string;
    contractValue?: number;
    paymentTerms?: string;
  }) => {
    const response = await api.post(API_CONFIG.VENDOR.CREATE, data);
    return response.data;
  },

  update: async (id: number | string, data: any) => {
    const response = await api.patch(API_CONFIG.VENDOR.UPDATE(id), data);
    return response.data;
  },

  delete: async (id: number | string) => {
    const response = await api.delete(API_CONFIG.VENDOR.DELETE(id));
    return response.data;
  },

  // Renew contract
  renewContract: async (id: number | string, data: {
    contractStart: string;
    contractEnd: string;
    contractValue: number;
  }) => {
    const response = await api.patch(API_CONFIG.VENDOR.UPDATE(id), {
      ...data,
      contractStatus: 'active',
    });
    return response.data;
  },

  // Update status
  updateStatus: async (id: number | string, status: 'active' | 'inactive') => {
    const response = await api.patch(API_CONFIG.VENDOR.UPDATE(id), { status });
    return response.data;
  },
};
