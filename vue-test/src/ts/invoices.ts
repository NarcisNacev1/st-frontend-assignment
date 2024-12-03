import { ref } from 'vue';

export const invoices = ref([
    {
        id: 1,
        invoiceNumber: 101,
        client: 'Narcis',
        date: '2024-12-03',
        items: [{ iName: 'Item A', quantity: 2, amount: 50 }],
        totalAmount: 100,
    },
    {
        id: 2,
        invoiceNumber: 102,
        client: 'Benjamin',
        date: '2024-12-03',
        items: [{ iName: 'Item B', quantity: 3, amount: 30 }],
        totalAmount: 90,
    },
]);
