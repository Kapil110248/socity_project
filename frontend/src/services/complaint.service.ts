import api from '../lib/api';
import { API_CONFIG } from '../config/api.config';

export const ComplaintService = {
    list: async () => {
        const response = await api.get(API_CONFIG.COMPLAINT.LIST);
        return response.data;
    },
    create: async (data: any) => {
        const response = await api.post(API_CONFIG.COMPLAINT.CREATE, data);
        return response.data;
    },
    updateStatus: async (id: number | string, status: string) => {
        const response = await api.patch(API_CONFIG.COMPLAINT.UPDATE_STATUS(id), { status });
        return response.data;
    },
    addComment: async (id: number | string, message: string) => {
        const response = await api.post(API_CONFIG.COMPLAINT.ADD_COMMENT(id), { message });
        return response.data;
    }
};
