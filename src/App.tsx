import React, { useState } from 'react';
import { Calculator, DollarSign, PieChart, TrendingUp } from 'lucide-react';

interface FinancialData {
  salary: number;
  loanPayment: number;
  interestRate: number;
}

interface Budget {
  housing: number;
  food: number;
  transportation: number;
  savings: number;
  investment: number;
  entertainment: number;
  remaining: number;
}

function App() {
  const [data, setData] = useState<FinancialData>({
    salary: 0,
    loanPayment: 0,
    interestRate: 0
  });
  
  const [budget, setBudget] = useState<Budget | null>(null);

  const calculateBudget = () => {
    if (data.salary <= 0) return;
    
    // Net income after taxes (assuming 25% tax rate)
    const netIncome = data.salary * 0.75;
    const availableIncome = netIncome - data.loanPayment;
    
    // Simple budget allocation
    const housing = availableIncome * 0.30;
    const food = availableIncome * 0.15;
    const transportation = availableIncome * 0.15;
    const savings = availableIncome * 0.20;
    const investment = availableIncome * 0.10;
    const entertainment = availableIncome * 0.05;
    const remaining = availableIncome * 0.05;
    
    setBudget({
      housing,
      food,
      transportation,
      savings,
      investment,
      entertainment,
      remaining
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Financial Advisor MVP</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Financial Information</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Salary
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="number"
                  value={data.salary || ''}
                  onChange={(e) => setData({ ...data, salary: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Loan Payment
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="number"
                  value={data.loanPayment || ''}
                  onChange={(e) => setData({ ...data, loanPayment: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="number"
                  step="0.1"
                  value={data.interestRate || ''}
                  onChange={(e) => setData({ ...data, interestRate: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5.5"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculateBudget}
            disabled={data.salary <= 0}
            className="mt-6 w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Calculate Budget
          </button>
        </div>

        {/* Results */}
        {budget && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Budget Breakdown</h2>
            
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(data.salary * 0.75)}
                </div>
                <div className="text-sm text-blue-800">Net Monthly Income</div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(data.loanPayment)}
                </div>
                <div className="text-sm text-red-800">Loan Payment</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency((data.salary * 0.75) - data.loanPayment)}
                </div>
                <div className="text-sm text-green-800">Available Income</div>
              </div>
            </div>

            {/* Budget Categories */}
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'Housing & Rent', amount: budget.housing, color: 'bg-blue-500' },
                { name: 'Food & Groceries', amount: budget.food, color: 'bg-green-500' },
                { name: 'Transportation', amount: budget.transportation, color: 'bg-yellow-500' },
                { name: 'Savings', amount: budget.savings, color: 'bg-purple-500' },
                { name: 'Investment', amount: budget.investment, color: 'bg-indigo-500' },
                { name: 'Entertainment', amount: budget.entertainment, color: 'bg-pink-500' },
              ].map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 ${category.color} rounded`}></div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              ))}
            </div>

            {/* Simple Tips */}
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">💡 Quick Tips</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Try to save at least 20% of your available income</li>
                <li>• Keep housing costs under 30% of your net income</li>
                <li>• Build an emergency fund of 3-6 months expenses</li>
                <li>• Consider investing in low-cost index funds</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;