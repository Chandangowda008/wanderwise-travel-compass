
import { useState, useEffect } from "react";
import { Wallet, TrendingUp, TrendingDown, PieChart, Plus, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  icon: string;
  color: string;
}

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  currency: string;
}

export const BudgetTracker = () => {
  const [totalBudget, setTotalBudget] = useState(2000);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: '1', name: 'Accommodation', allocated: 800, spent: 450, icon: '🏨', color: 'bg-blue-500' },
    { id: '2', name: 'Food & Dining', allocated: 400, spent: 285, icon: '🍽️', color: 'bg-green-500' },
    { id: '3', name: 'Transportation', allocated: 300, spent: 120, icon: '🚗', color: 'bg-yellow-500' },
    { id: '4', name: 'Activities', allocated: 350, spent: 180, icon: '🎯', color: 'bg-purple-500' },
    { id: '5', name: 'Shopping', allocated: 150, spent: 75, icon: '🛍️', color: 'bg-pink-500' }
  ]);

  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([
    { id: '1', category: 'Accommodation', amount: 150, description: 'Hotel night', date: '2024-01-15', currency: 'EUR' },
    { id: '2', category: 'Food & Dining', amount: 45, description: 'Lunch at bistro', date: '2024-01-15', currency: 'EUR' },
    { id: '3', category: 'Transportation', amount: 25, description: 'Metro day pass', date: '2024-01-14', currency: 'EUR' },
    { id: '4', category: 'Activities', amount: 17, description: 'Museum entry', date: '2024-01-14', currency: 'EUR' }
  ]);

  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: ''
  });

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetUtilization = (totalSpent / totalBudget) * 100;

  const addExpense = () => {
    if (!newExpense.category || !newExpense.amount || !newExpense.description) return;

    const expense: Expense = {
      id: Date.now().toString(),
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      date: new Date().toISOString().split('T')[0],
      currency: 'EUR'
    };

    setRecentExpenses(prev => [expense, ...prev]);
    
    // Update category spending
    setCategories(prev => prev.map(cat => 
      cat.name === newExpense.category 
        ? { ...cat, spent: cat.spent + expense.amount }
        : cat
    ));

    setNewExpense({ category: '', amount: '', description: '' });
  };

  const getBudgetStatus = (allocated: number, spent: number) => {
    const usage = (spent / allocated) * 100;
    if (usage > 100) return { status: 'over', color: 'text-red-600', bg: 'bg-red-100' };
    if (usage > 80) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Wallet className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Budget Tracker</h2>
          </div>
          <Badge variant={budgetUtilization > 80 ? "destructive" : "default"}>
            {budgetUtilization.toFixed(1)}% Used
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-2xl font-bold">€{totalBudget.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold text-red-600">€{totalSpent.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              €{remainingBudget.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              budgetUtilization > 100 ? 'bg-red-500' : budgetUtilization > 80 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
          ></div>
        </div>
      </Card>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="expenses">Recent Expenses</TabsTrigger>
          <TabsTrigger value="add">Add Expense</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          {categories.map((category) => {
            const status = getBudgetStatus(category.allocated, category.spent);
            const usage = (category.spent / category.allocated) * 100;
            
            return (
              <Card key={category.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        €{category.spent} / €{category.allocated}
                      </p>
                    </div>
                  </div>
                  <Badge className={status.bg + ' ' + status.color}>
                    {usage.toFixed(0)}%
                  </Badge>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      usage > 100 ? 'bg-red-500' : usage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(usage, 100)}%` }}
                  ></div>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          {recentExpenses.map((expense) => (
            <Card key={expense.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {expense.category} • {expense.date}
                  </p>
                </div>
                <p className="font-semibold">
                  {expense.currency} {expense.amount}
                </p>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Add New Expense</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Amount (EUR)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Input
                  placeholder="What did you spend on?"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <Button onClick={addExpense} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
