<script setup lang="ts">
import { ref } from 'vue';
import { invoices } from '@/ts/invoices';

const invoiceNumber = ref(0);
const selectClient = ref('');
const items = ref([{ iName: '', quantity: 0, amount: 0 }]);
const totalAmount = ref(0);
const date = ref(new Date().toISOString().split('T')[0]);
const selectedInvoiceId = ref<number | null>(null);

function calculateTotal() {
  totalAmount.value = items.value.reduce((sum, item) => sum + item.quantity * item.amount, 0);
}

function addOrUpdateInvoice() {
  if (selectedInvoiceId.value !== null) {
    const invoiceIndex = invoices.value.findIndex(inv => inv.id === selectedInvoiceId.value);
    if (invoiceIndex > -1) {
      invoices.value[invoiceIndex] = {
        id: selectedInvoiceId.value,
        invoiceNumber: invoiceNumber.value,
        client: selectClient.value,
        date: date.value,
        items: [...items.value],
        totalAmount: totalAmount.value,
      };
    }
    selectedInvoiceId.value = null;
  } else {
    invoices.value.push({
      id: Date.now(),
      invoiceNumber: invoiceNumber.value,
      client: selectClient.value,
      date: date.value,
      items: [...items.value],
      totalAmount: totalAmount.value,
    });
  }
  resetForm();
}

function editInvoice(id: number) {
  const invoice = invoices.value.find(inv => inv.id === id);
  if (invoice) {
    selectedInvoiceId.value = id;
    invoiceNumber.value = invoice.invoiceNumber;
    selectClient.value = invoice.client;
    date.value = invoice.date;
    items.value = [...invoice.items];
    totalAmount.value = invoice.totalAmount;
  }
}

function deleteInvoice(id: number) {
  invoices.value = invoices.value.filter(inv => inv.id !== id);
}

function resetForm() {
  invoiceNumber.value = 0;
  selectClient.value = '';
  items.value = [{ iName: '', quantity: 0, amount: 0 }];
  totalAmount.value = 0;
  date.value = new Date().toISOString().split('T')[0];
}
</script>

<template>
  <div>
    <form @submit.prevent="addOrUpdateInvoice">
    </form>
    <hr />
    <h2>Invoices List</h2>
    <ul>
      <li v-for="invoice in invoices" :key="invoice.id">
        <strong>{{ invoice.invoiceNumber }}</strong> - {{ invoice.client }} - {{ invoice.date }} - ${{ invoice.totalAmount }}
        <button @click="editInvoice(invoice.id)">Edit</button>
        <button @click="deleteInvoice(invoice.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>


<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #444;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #444;
}

input[type="text"],
input[type="number"],
input[type="date"],
select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

input[type="number"]:read-only {
  background-color: #f0f0f0;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

html { scroll-behavior: smooth;}

button:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #28a745;
}

button[type="button"]:hover {
  background-color: #218838;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

ul {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0;
  list-style: none;
}

li {
  background: #fff;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

li strong {
  color: #007bff;
}

li button {
  margin-left: 0.5rem;
}

hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 2rem 0;
}

div[v-for] {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

div[v-for] label {
  flex-basis: 100%;
}

div[v-for] input {
  flex: 1 1 calc(33% - 1rem);
}

div[v-for] button {
  flex-basis: 100%;
}
</style>

