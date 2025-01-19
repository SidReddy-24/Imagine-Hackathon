import mongoose from 'mongoose';

const TaxFilingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  primaryIncome: { type: Number, required: true },
  secondaryIncome: { type: Number, required: true },
  itrType: { type: String, required: true },
  taxReturn: { type: Number, required: true },
  form16Data: {
    // ... (your existing schema)
  }
}, { timestamps: true });

export const TaxFiling = mongoose.model('TaxFiling', TaxFilingSchema); 