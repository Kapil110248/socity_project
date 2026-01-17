import api from '@/lib/api';
import { API_CONFIG } from '@/config/api.config';

export const UnitService = {
  getAll: async () => {
    const response = await api.get(API_CONFIG.UNIT.LIST);
    return response.data;
  },

  getById: async (id: number | string) => {
    const response = await api.get(API_CONFIG.UNIT.GET(id));
    return response.data;
  },

  create: async (data: {
    block: string;
    number: string;
    floor: number;
    type: string;
    areaSqFt: number;
    ownerId?: number;
    tenantId?: number;
  }) => {
    const response = await api.post(API_CONFIG.UNIT.CREATE, data);
    return response.data;
  },

  update: async (id: number | string, data: any) => {
    const response = await api.patch(API_CONFIG.UNIT.UPDATE(id), data);
    return response.data;
  },

  delete: async (id: number | string) => {
    const response = await api.delete(API_CONFIG.UNIT.DELETE(id));
    return response.data;
  },
};
