import api from '../lib/api';
import { API_CONFIG } from '../config/api.config';

export const VendorService = {
    list: async () => {
        const response = await api.get(API_CONFIG.VENDOR.LIST);
        return response.data;
    },
    create: async (data: any) => {
        const response = await api.post(API_CONFIG.VENDOR.CREATE, data);
        return response.data;
    },
    update: async (id: number | string, data: any) => {
        const response = await api.put(API_CONFIG.VENDOR.UPDATE(id), data);
        return response.data;
    },
    delete: async (id: number | string) => {
        const response = await api.delete(API_CONFIG.VENDOR.DELETE(id));
        return response.data;
    }
};
