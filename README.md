# Budget Brain

A simple and intuitive personal finance advisor that helps users create budget breakdowns based on their monthly salary and loan obligations.

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

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js) or **yarn**

You can check your versions by running:
```bash
node --version
npm --version

```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd financial-advisor-mvp
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Start the Development Server

Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will start running on `http://localhost:5173`

## 📦 Available Scripts

In the project directory, you can run:

### `npm run dev` or `yarn dev`
Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build` or `yarn build`
Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview` or `yarn preview`
Locally preview the production build.

### `npm run lint` or `yarn lint`
Runs ESLint to check for code quality issues.

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

## 🔧 Customization

### Modifying Budget Percentages

To adjust the budget allocation percentages, edit the `calculateBudget` function in `src/App.tsx`:

```typescript
const housing = availableIncome * 0.30;        // 30% for housing
const food = availableIncome * 0.15;           // 15% for food
const transportation = availableIncome * 0.15; // 15% for transportation
// ... modify as needed
```

### Styling Changes

The project uses Tailwind CSS for styling. You can:
- Modify existing styles by changing Tailwind classes in components
- Add custom styles in `src/index.css`
- Extend the Tailwind configuration in `tailwind.config.js`

## 🚀 Deployment

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify by dragging and dropping it on [netlify.com/drop](https://netlify.com/drop)

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

### Deploy to Other Platforms

The built files in the `dist` folder can be deployed to any static hosting service like:
- GitHub Pages
- Firebase Hosting
- AWS S3
- Surge.sh

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues

If you encounter any issues or have suggestions for improvements, please create an issue on the repository.

## 📞 Support

For support or questions, please open an issue on the repository or contact the maintainers.

---

Made with ❤️ using React, TypeScript, and Tailwind CSS
