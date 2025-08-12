
import React, { useState, useRef } from 'react';
import { Calculator, IndianRupee, PieChart as PieChartIcon, TrendingUp, FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const COLORS = ['#3B82F6', '#22C55E', '#EAB308', '#A855F7', '#6366F1', '#EC4899', '#6B7280'];

function App() {
  const [data, setData] = useState<FinancialData>({
    salary: 0,
    loanPayment: 0,
    interestRate: 0
  });

  const [budget, setBudget] = useState<Budget | null>(null);
  const budgetRef = useRef<HTMLDivElement>(null);

  const calculateBudget = () => {
    if (data.salary <= 0) return;

    const netIncome = data.salary * 0.75;
    const availableIncome = netIncome - data.loanPayment;

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
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const downloadPDF = () => {
    if (!budgetRef.current) return;
    html2canvas(budgetRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('budget-breakdown.pdf');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center space-x-3">
          <Calculator className="h-9 w-9 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-gray-900">Budget Brain</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center space-x-2">
            <PieChartIcon className="h-6 w-6 text-blue-500" />
            <span>Enter Your Financial Information</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Salary</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="number"
                  value={data.salary || ''}
                  onChange={(e) => setData({ ...data, salary: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="50000"
                />
              </div>
            </div>

            {/* Loan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Loan Payment</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="number"
                  value={data.loanPayment || ''}
                  onChange={(e) => setData({ ...data, loanPayment: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="8000"
                />
              </div>
            </div>

            {/* Interest */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="number"
                  step="0.1"
                  value={data.interestRate || ''}
                  onChange={(e) => setData({ ...data, interestRate: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="5.5"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculateBudget}
            disabled={data.salary <= 0}
            className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg shadow-md"
          >
            Calculate Budget
          </button>
        </div>

        {/* Results */}
        {budget && (
          <div ref={budgetRef} className="bg-white rounded-xl shadow-lg p-10 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Your Budget Breakdown</h2>

            {/* Summary */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { label: 'Net Monthly Income', value: data.salary * 0.75, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Loan Payment', value: data.loanPayment, color: 'text-red-600', bg: 'bg-red-50' },
                { label: 'Available Income', value: (data.salary * 0.75) - data.loanPayment, color: 'text-green-600', bg: 'bg-green-50' }
              ].map((item, idx) => (
                <div key={idx} className={`${item.bg} rounded-lg p-6 text-center shadow`}>
                  <div className={`text-2xl font-bold ${item.color}`}>
                    {formatCurrency(item.value)}
                  </div>
                  <div className="text-sm font-medium text-gray-700 mt-2">{item.label}</div>
                </div>
              ))}
            </div>

{/* Chart */}
<div className="w-full h-96 mb-20 p-6 flex justify-center items-center">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={[
          { name: 'Housing & Rent', value: budget.housing },
          { name: 'Food & Groceries', value: budget.food },
          { name: 'Transportation', value: budget.transportation },
          { name: 'Savings', value: budget.savings },
          { name: 'Investment', value: budget.investment },
          { name: 'Entertainment', value: budget.entertainment },
          { name: 'Remaining', value: budget.remaining },
        ]}
        cx="45%" // push chart left to make room for right-side labels
        cy="50%"
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
        labelLine={false}
        label={({
          cx = 0,
          cy = 0,
          midAngle = 0,
          outerRadius = 120,
          index = 0,
          name = '',
          value = 0
        }) => {
          const RADIAN = Math.PI / 180;
          const labelRadius = outerRadius + 30;
          const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
          const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
              style={{
                fontSize: 17,
                fill: COLORS[index % COLORS.length], // match slice color
                fontWeight: 500,
              }}
            >
              {`${name}: ${formatCurrency(value)}`}
            </text>
          );
        }}
      >
        {COLORS.map((color, index) => (
          <Cell key={`cell-${index}`} fill={color} />
        ))}
      </Pie>

      <Tooltip formatter={(value: number) => formatCurrency(value)} />

      <Legend
        layout="vertical"
        verticalAlign="middle"
        align="right"
        wrapperStyle={{
          right: 0,
          top: '20%',
          lineHeight: '24px',
          fontSize: '13px',
          fontWeight: 500,
        }}
      />
    </PieChart>
  </ResponsiveContainer>
</div>



            {/* Categories */}
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                { name: 'Housing & Rent', amount: budget.housing, color: 'bg-blue-500' },
                { name: 'Food & Groceries', amount: budget.food, color: 'bg-green-500' },
                { name: 'Transportation', amount: budget.transportation, color: 'bg-yellow-500' },
                { name: 'Savings', amount: budget.savings, color: 'bg-purple-500' },
                { name: 'Investment', amount: budget.investment, color: 'bg-indigo-500' },
                { name: 'Entertainment', amount: budget.entertainment, color: 'bg-pink-500' },
              ].map((category, index) => (
                <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-lg shadow">
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

            {/* Quick Tips */}
            <div className="mt-10 p-8 bg-yellow-50 rounded-xl border border-yellow-300 shadow-lg">
              <div className="flex items-center mb-6">
                <span className="bg-yellow-400 text-white rounded-full p-3 mr-4 shadow">💡</span>
                <h3 className="font-bold text-gray-900 text-2xl">Quick Tips</h3>
              </div>
              <ul className="text-lg text-gray-800 space-y-4 leading-relaxed">
                <li>• Save at least 20% of your available income</li>
                <li>• Keep housing under 30% of your net income</li>
                <li>• Maintain an emergency fund of 3–6 months</li>
                <li>• Invest in low-cost, diversified options</li>
              </ul>
            </div>

            {/* Download */}
            <button
              onClick={downloadPDF}
              className="mt-8 w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors text-lg shadow-md"
            >
              <FileDown className="h-5 w-5" /> Download as PDF
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
