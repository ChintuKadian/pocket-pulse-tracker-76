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

// ✅ Base URL of your Flask backend on EC2
const BASE_URL = "http://98.93.73.246:5000";

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
    body: JSON.stringify(newBudget)
  });
  if (!response.ok) throw new Error('Failed to set budget');
  return response.json();
};

// GET /budget - Get budget
export const getBudget = async (): Promise<Budget> => {
  const response = await fetch(`${BASE_URL}/budget`);
  if (!response.ok) throw new Error('Failed to fetch budget');
  return response.json();
};

// ---------------------- SUMMARY ----------------------

// GET /summary - Get financial summary
export const getSummary = async (): Promise<Summary> => {
  const response = await fetch(`${BASE_URL}/summary`);
  if (!response.ok) throw new Error('Failed to fetch summary');
  return response.json();
};
