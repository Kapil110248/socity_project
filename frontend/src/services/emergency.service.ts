import api from '../lib/api';
import { API_CONFIG } from '../config/api.config';

export const EmergencyService = {
    listLogs: async () => {
        const response = await api.get(API_CONFIG.EMERGENCY.LOGS);
        return response.data;
    },
    listBarcodes: async () => {
        const response = await api.get(API_CONFIG.EMERGENCY.BARCODES);
        return response.data;
    },
    updateBarcodeStatus: async (id: string, status: string) => {
        const response = await api.put(API_CONFIG.EMERGENCY.UPDATE_BARCODE_STATUS(id), { status });
        return response.data;
    },
    resetBarcodes: async (phone: string) => {
        const response = await api.post(API_CONFIG.EMERGENCY.RESET_BARCODES, { phone });
        return response.data;
    }
};
