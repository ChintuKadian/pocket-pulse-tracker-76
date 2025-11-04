import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { getBudget, setBudget, Budget as BudgetType } from '@/lib/mockApi';
import { toast } from 'sonner';

export default function Budget() {
  const [budget, setBudgetState] = useState<BudgetType>({
    month: '',
    amount: 0,
    spent: 0,
  });
  const [newBudgetAmount, setNewBudgetAmount] = useState('');

  useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
  try {
    const data = await getBudget();
    console.log("🔹 Raw budget data from DB:", data);

    // ✅ If your API returns an array
    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0];
      console.log("✅ Loaded budget item:", firstItem);

      const budgetAmount = parseFloat(firstItem.amount?.toString() || "0");
      const spentAmount = parseFloat(firstItem.spent?.toString() || "0");

      setBudgetState({
      month: new Date().toISOString().slice(0, 7),
      amount: budgetAmount,
      spent: spentAmount,
      });


      setNewBudgetAmount(budgetAmount.toString());
    } 
    // ✅ If your API returns a single object
    else if (data && typeof data === "object") {
      console.log("✅ Loaded single budget object:", data);

      const budgetAmount = parseFloat(data.amount?.toString() || "0");
      const spentAmount = parseFloat(data.spent?.toString() || "0");

      setBudgetState({
      month: new Date().toISOString().slice(0, 7),
      amount: budgetAmount,
      spent: spentAmount,
      });


      setNewBudgetAmount(budgetAmount.toString());
    } 
    // ⚠️ No data found
    else {
      console.warn("⚠️ No budget data found");
      setBudgetState({
      month: "",
      amount: 0,
      spent: 0,
      });

      setNewBudgetAmount("");
    }
  } catch (error) {
    console.error("❌ Error loading budget:", error);
    setBudgetState({
    month: "",
    amount: 0,
    spent: 0,
    });

  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newBudgetAmount || parseFloat(newBudgetAmount) <= 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }

    try {
      const currentMonth = new Date().toISOString().slice(0, 7);
      await setBudget({
        month: currentMonth,
        amount: parseFloat(newBudgetAmount),
        spent: budget.spent,
      });

      toast.success('Budget updated successfully');
      loadBudget();
    } catch (error) {
      toast.error('Failed to update budget');
    }
  };

  const percentageSpent =
    budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
  const remaining = budget.amount - budget.spent;
  const isOverBudget = remaining < 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Budget</h1>
        <p className="text-muted-foreground">Set and track your monthly budget.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Monthly Budget</p>
                <h3 className="text-3xl font-bold text-foreground">
                  ${budget.amount ? budget.amount.toLocaleString() : 0}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Spent</p>
                <h3 className="text-3xl font-bold text-destructive">
                  ${budget.spent ? budget.spent.toLocaleString() : 0}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-destructive/10 text-destructive">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                <h3
                  className={`text-3xl font-bold ${
                    isOverBudget ? 'text-destructive' : 'text-success'
                  }`}
                >
                  ${remaining ? Math.abs(remaining).toLocaleString() : 0}
                </h3>
              </div>
              <div
                className={`p-3 rounded-xl ${
                  isOverBudget
                    ? 'bg-destructive/10 text-destructive'
                    : 'bg-success/10 text-success'
                }`}
              >
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Budget Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{percentageSpent.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(percentageSpent, 100)} className="h-3" />
            </div>

            {isOverBudget && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
                <AlertCircle className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="font-medium">Over Budget!</p>
                  <p className="text-sm">
                    You've exceeded your budget by $
                    {remaining ? Math.abs(remaining).toLocaleString() : 0}.
                  </p>
                </div>
              </div>
            )}

            {!isOverBudget && percentageSpent > 80 && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 text-warning">
                <AlertCircle className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="font-medium">Budget Warning</p>
                  <p className="text-sm">
                    You've used {percentageSpent.toFixed(1)}% of your budget.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium">
                  ${budget.amount ? budget.amount.toLocaleString() : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Spent:</span>
                <span className="font-medium text-destructive">
                  ${budget.spent ? budget.spent.toLocaleString() : 0}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Remaining:</span>
                <span
                  className={`font-bold ${
                    isOverBudget ? 'text-destructive' : 'text-success'
                  }`}
                >
                  ${remaining ? Math.abs(remaining).toLocaleString() : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>{budget.amount > 0 ? 'Update Budget' : 'Add Budget'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Amount</Label>
                <Input
                  id="budget"
                  type="number"
                  step="0.01"
                  placeholder="Enter budget amount"
                  value={newBudgetAmount}
                  onChange={(e) => setNewBudgetAmount(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Current Month</Label>
                <Input
                  value={new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                  disabled
                />
              </div>

              <Button type="submit" className="w-full">
                {budget.amount > 0 ? 'Update Budget' : 'Add Budget'}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Your budget will be applied to the current month.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
