# app.py
import streamlit as st
import pandas as pd
import math
from datetime import datetime

# ---------- Helper ----------
def monthly_from_annual_rate(balance, monthly_payment, annual_rate):
    """Estimate months to pay off using iterative approach."""
    r = annual_rate / 12.0 / 100.0
    months = 0
    b = balance
    if monthly_payment <= b * r:
        return float('inf')  # will never amortize
    while b > 0 and months < 1200:
        interest = b * r
        b = b + interest - monthly_payment
        months += 1
    return months

# ---------- UI ----------
st.set_page_config(page_title="Financial Literacy Chatbot", layout="centered")

st.title("💰 Financial Literacy Chatbot")
st.write("Enter your details below to get personalized budgeting, investing, and debt repayment tips.")

# Input section
income = st.number_input("Monthly Income (₹)", min_value=0.0, step=1000.0)
expenses = st.number_input("Monthly Expenses (₹)", min_value=0.0, step=500.0)
debt = st.number_input("Total Debt (₹)", min_value=0.0, step=1000.0)
annual_interest = st.number_input("Debt Annual Interest Rate (%)", min_value=0.0, max_value=100.0, step=0.1)
monthly_debt_payment = st.number_input("Monthly Debt Payment (₹)", min_value=0.0, step=500.0)
goal_amount = st.number_input("Savings Goal (₹)", min_value=0.0, step=1000.0)

if st.button("Get Recommendations"):
    if income <= 0:
        st.error("Please enter a valid monthly income.")
    else:
        savings = income - expenses
        if savings < 0:
            st.warning("⚠️ Your expenses exceed your income. Consider cutting costs.")
        
        # Debt payoff time
        if debt > 0 and monthly_debt_payment > 0:
            months_to_payoff = monthly_from_annual_rate(debt, monthly_debt_payment, annual_interest)
        else:
            months_to_payoff = 0

        # Recommendations
        st.subheader("📊 Recommendations")
        st.write(f"**Monthly Savings Potential:** ₹{savings:,.2f}")

        if debt > 0:
            if months_to_payoff == float('inf'):
                st.write("❌ Your current monthly payment is too low to ever repay the debt. Increase it.")
            else:
                st.write(f"⏳ Estimated Debt Payoff Time: {months_to_payoff} months.")
        
        if savings > 0:
            st.write(f"💵 Suggested: Save at least 20% of income → ₹{income * 0.2:,.2f}")
            st.write("📈 Suggested: Invest remaining savings into low-cost index funds or recurring deposits.")
        
        if goal_amount > 0 and savings > 0:
            months_to_goal = goal_amount / savings
            st.write(f"🎯 Estimated Time to Reach Goal: {months_to_goal:.1f} months.")
