// Mock API functions that simulate AWS Lambda endpoints
// Replace these with actual AWS API Gateway URLs when ready

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

// Mock data store (in production, this would be in a database)
let transactions: Transaction[] = [
  {
    id: '1',
    amount: 5000,
    category: 'Salary',
    date: '2025-10-01',
    note: 'Monthly salary',
    type: 'income'
  },
  {
    id: '2',
    amount: 1200,
    category: 'Rent',
    date: '2025-10-05',
    note: 'Monthly rent payment',
    type: 'expense'
  },
  {
    id: '3',
    amount: 350,
    category: 'Groceries',
    date: '2025-10-08',
    note: 'Weekly shopping',
    type: 'expense'
  },
  {
    id: '4',
    amount: 80,
    category: 'Utilities',
    date: '2025-10-10',
    note: 'Electricity bill',
    type: 'expense'
  },
  {
    id: '5',
    amount: 200,
    category: 'Entertainment',
    date: '2025-10-15',
    note: 'Concert tickets',
    type: 'expense'
  },
];

let budget: Budget = {
  month: '2025-10',
  amount: 4000,
  spent: 1830
};

// POST /transactions - Add new transaction
export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  const newTransaction = {
    ...transaction,
    id: Date.now().toString()
  };
  transactions.push(newTransaction);
  return new Promise(resolve => setTimeout(() => resolve(newTransaction), 300));
};

// GET /transactions - Get all transactions
export const getTransactions = async (): Promise<Transaction[]> => {
  return new Promise(resolve => setTimeout(() => resolve([...transactions]), 300));
};

// GET /transactions/date - Get transactions by date
export const getTransactionsByDate = async (startDate: string, endDate: string): Promise<Transaction[]> => {
  const filtered = transactions.filter(t => t.date >= startDate && t.date <= endDate);
  return new Promise(resolve => setTimeout(() => resolve(filtered), 300));
};

// POST /budget - Set budget
export const setBudget = async (newBudget: Budget): Promise<Budget> => {
  budget = newBudget;
  return new Promise(resolve => setTimeout(() => resolve(budget), 300));
};

// GET /budget - Get budget
export const getBudget = async (): Promise<Budget> => {
  return new Promise(resolve => setTimeout(() => resolve(budget), 300));
};

// GET /summary - Get financial summary
export const getSummary = async (): Promise<Summary> => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;
  
  return new Promise(resolve => setTimeout(() => resolve({
    totalIncome,
    totalExpenses,
    balance
  }), 300));
};
