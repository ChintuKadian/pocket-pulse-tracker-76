// api.ts

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  note: string;
  type: 'income' | 'expense';
}

export interface Budget {
  month: string;
  amount: number;
  spent: number;
}

export interface Summary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export interface Receipt {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  amount?: number;
  category?: string;
}

// ✅ Base URL of your Flask backend on EC2
const BASE_URL = "http://100.27.190.37:5000";

// ---------------------- TRANSACTIONS ----------------------

// POST /transactions - Add new transaction
export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  const response = await fetch(`${BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction)
  });
  if (!response.ok) throw new Error('Failed to add transaction');
  return response.json();
};

// GET /transactions - Get all transactions
export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch(`${BASE_URL}/transactions`);
  if (!response.ok) throw new Error('Failed to fetch transactions');
  return response.json();
};

// GET /transactions/date - Get transactions by date
export const getTransactionsByDate = async (startDate: string, endDate: string): Promise<Transaction[]> => {
  const response = await fetch(`${BASE_URL}/transactions/date?start=${startDate}&end=${endDate}`);
  if (!response.ok) throw new Error('Failed to fetch transactions by date');
  return response.json();
};

// ---------------------- BUDGET ----------------------

// POST /budget - Set budget
export const setBudget = async (newBudget: Budget): Promise<Budget> => {
  const response = await fetch(`${BASE_URL}/budget`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: newBudget.amount }) // ✅ backend expects "amount"
  });
  if (!response.ok) throw new Error('Failed to set budget');
  return response.json();
};


// GET /budget - Get budget
export async function getBudget(userId = "default-user") {
  const month = new Date().toISOString().slice(0, 7); // e.g. 2025-11
  const res = await fetch(
    `http://100.27.190.37:5000/budget?userId=${userId}&month=${month}`
  );
  if (!res.ok) throw new Error("Failed to fetch budget");
  return await res.json();
}


// ---------------------- SUMMARY ----------------------

// GET /summary - Get financial summary
export const getSummary = async (): Promise<Summary> => {
  const response = await fetch(`${BASE_URL}/summary`);
  if (!response.ok) throw new Error('Failed to fetch summary');
  return response.json();
};

// ---------------------- RECEIPTS ----------------------

// POST /upload - Upload receipt
export const uploadReceipt = async (file: File, userId: string, amount?: number, category?: string): Promise<Receipt> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);
  if (amount) formData.append('amount', amount.toString());
  if (category) formData.append('category', category);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) throw new Error('Failed to upload receipt');
  return response.json();
};

// GET /receipts - Get all receipts for a user
export const getReceipts = async (userId: string): Promise<Receipt[]> => {
  const response = await fetch(`${BASE_URL}/receipts?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch receipts');
  return response.json();
};
