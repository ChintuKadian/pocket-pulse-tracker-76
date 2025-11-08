import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet, FileText, ExternalLink } from 'lucide-react';
import { SummaryCard } from '@/components/SummaryCard';
import { ReceiptUpload } from '@/components/ReceiptUpload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
<<<<<<< HEAD
import { getSummary, getTransactions, Transaction } from '@/lib/mockApi';
import ReceiptUploader from "./ReceiptUploader";
=======
import { getSummary, getTransactions, Transaction, getReceipts, Receipt } from '@/lib/mockApi';
>>>>>>> cba94f56fd306349d0089e195d07d71f738d3351

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function Dashboard() {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const summaryData = await getSummary();
    const transactionsData = await getTransactions();
    setSummary(summaryData);
    setTransactions(transactionsData);
    
    // Load receipts - using default userId
    try {
      const receiptsData = await getReceipts('user123');
      setReceipts(receiptsData);
    } catch (error) {
      console.error('Failed to load receipts:', error);
    }
  };

  // Process data for category pie chart
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

  // Process data for monthly bar chart
  const monthlyData = [
    { month: 'Sep', income: 4800, expenses: 3200 },
    { month: 'Oct', income: summary.totalIncome, expenses: summary.totalExpenses },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
<<<<<<< HEAD
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
        <ReceiptUploader />
=======
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
        </div>
        <ReceiptUpload onUploadSuccess={loadData} />
>>>>>>> cba94f56fd306349d0089e195d07d71f738d3351
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <SummaryCard
          title="Total Income"
          amount={summary.totalIncome}
          icon={TrendingUp}
          variant="success"
          trend="This month"
        />
        <SummaryCard
          title="Total Expenses"
          amount={summary.totalExpenses}
          icon={TrendingDown}
          variant="destructive"
          trend="This month"
        />
        <SummaryCard
          title="Balance"
          amount={summary.balance}
          icon={Wallet}
          variant="default"
          trend="Current balance"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="hsl(var(--chart-1))" name="Income" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="hsl(var(--chart-3))" name="Expenses" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Receipts and Recent Transactions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Receipts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {receipts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No receipts uploaded yet</p>
              ) : (
                receipts.slice(-5).reverse().map((receipt) => (
                  <div key={receipt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{receipt.fileName}</p>
                      <p className="text-sm text-muted-foreground">{receipt.uploadDate}</p>
                      {receipt.category && (
                        <p className="text-xs text-muted-foreground mt-1">{receipt.category}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {receipt.amount && (
                        <p className="font-bold text-foreground">
                          ${receipt.amount.toLocaleString()}
                        </p>
                      )}
                      <Button size="sm" variant="ghost" asChild>
                        <a href={receipt.fileUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(-5).reverse().map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div>
                    <p className="font-medium text-foreground">{transaction.category}</p>
                    <p className="text-sm text-muted-foreground">{transaction.note}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${transaction.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
