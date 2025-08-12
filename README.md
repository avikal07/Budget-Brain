<p align="center">
  <img src="assets/pic1.jpg" alt="Budget Brain Logo" width="100"/>
</p>

<h1 align="center">Budget Brain</h1>
<p align="center">A simple and intuitive personal finance advisor</p>

## 🚀 Live Demo

Visit the live application: [https://budgetbrain-ai.netlify.app](https://budgetbrain-ai.netlify.app)

## ✨ Features

- **Simple Input Form**: Enter monthly salary, loan payments, and interest rates
- **Instant Budget Calculation**: Get personalized budget recommendations using proven financial ratios
- **Visual Budget Breakdown**: Clear display of recommended spending across different categories
- **Financial Tips**: Actionable advice for better financial management
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## 🛠️ Setup & Usage

**Prerequisites**  
- **Node.js** (v16.0 or higher)  
- **npm** (comes with Node.js) or **yarn**  

Check versions:
```bash
node --version
npm --version
```

**Common Commands**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code for issues
npm run lint
```

## 🏗️ Project Structure

```
financial-advisor-mvp/
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles and Tailwind imports
│   └── vite-env.d.ts    # Vite type definitions
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # Project documentation
```


## 🎯 How It Works
1. **Input Financial Data**: Users enter their monthly salary, loan payments, and interest rates  
2. **Budget Calculation**: The app calculates net income after taxes (assuming 25% tax rate) and subtracts loan payments  
3. **Category Allocation**: Remaining income is allocated across categories using financial best practices:  
   - Housing: 30%  
   - Food: 15%  
   - Transportation: 15%  
   - Savings: 20%  
   - Investment: 10%  
   - Entertainment: 5%  
   - Buffer: 5%  

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues & Support

If you find a bug, have suggestions, or need help, please [open an issue](../../issues) in the repository.

---

<p align="center">Made with ❤️ using React, TypeScript, and Tailwind CSS</p>




