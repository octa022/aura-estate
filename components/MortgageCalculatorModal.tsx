'use client';

import React, { useState } from 'react';

interface MortgageCalculatorProps {
  propertyPrice: number;
  isOpen: boolean;
  onClose: () => void;
}

export const MortgageCalculatorModal: React.FC<MortgageCalculatorProps> = ({
  propertyPrice,
  isOpen,
  onClose,
}) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  if (!isOpen) return null;

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const principal = propertyPrice - downPaymentAmount;

  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  // Monthly payment formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  } else {
    monthlyPayment = principal / numberOfPayments;
  }

  const formattedPayment = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(monthlyPayment);

  const formattedDownPayment = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(downPaymentAmount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-onyx/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cloud-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-midnight-onyx/10 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-midnight-onyx/60 hover:text-midnight-onyx hover:bg-frosted-pearl transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-desert-gold/15 rounded-2xl text-desert-gold">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-midnight-onyx">Calculadora Hipotecaria</h2>
            <p className="text-xs text-midnight-onyx/60">Estimado de cuota mensual para este inmueble</p>
          </div>
        </div>

        {/* Highlight Result Card */}
        <div className="bg-frosted-pearl p-6 rounded-2xl border border-desert-gold/30 text-center mb-6">
          <span className="text-xs uppercase font-semibold tracking-wider text-midnight-onyx/60">
            Pago Mensual Estimado
          </span>
          <div className="text-4xl font-extrabold text-desert-gold mt-1">{formattedPayment}</div>
          <p className="text-xs text-midnight-onyx/60 mt-1">
            Con enganche del {downPaymentPercent}% ({formattedDownPayment})
          </p>
        </div>

        {/* Inputs Form */}
        <div className="space-y-5">
          {/* Enganche */}
          <div>
            <div className="flex justify-between text-sm font-medium text-midnight-onyx mb-1">
              <span>Enganche ({downPaymentPercent}%)</span>
              <span className="font-semibold text-desert-gold">{formattedDownPayment}</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={e => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-desert-gold cursor-pointer"
            />
          </div>

          {/* Tasa de Interés */}
          <div>
            <div className="flex justify-between text-sm font-medium text-midnight-onyx mb-1">
              <span>Tasa de Interés Anual</span>
              <span className="font-semibold text-desert-gold">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="3"
              max="15"
              step="0.25"
              value={interestRate}
              onChange={e => setInterestRate(Number(e.target.value))}
              className="w-full accent-desert-gold cursor-pointer"
            />
          </div>

          {/* Plazo del Crédito */}
          <div>
            <span className="block text-sm font-medium text-midnight-onyx mb-2">Plazo del Crédito</span>
            <div className="grid grid-cols-3 gap-3">
              {[15, 20, 30].map(years => (
                <button
                  key={years}
                  onClick={() => setLoanTermYears(years)}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                    loanTermYears === years
                      ? 'bg-midnight-onyx text-desert-gold border-midnight-onyx shadow-md'
                      : 'bg-cloud-white text-midnight-onyx border-midnight-onyx/15 hover:border-desert-gold'
                  }`}>
                  {years} Años
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-midnight-onyx/10 flex justify-end">
          <button
            onClick={onClose}
            className="w-full bg-desert-gold text-midnight-onyx font-bold py-3 px-6 rounded-xl hover:bg-desert-gold/90 transition-all shadow-md">
            Aceptar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
