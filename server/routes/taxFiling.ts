import express from 'express';
import { TaxFiling } from '../models/TaxFiling';
import { determineITRType, calculateTaxReturn } from '../utils/taxCalculations';

const router = express.Router();

router.post('/file-tax', async (req, res) => {
  try {
    const { userId, primaryIncome, secondaryIncome, form16Data } = req.body;

    if (!userId || primaryIncome == null || secondaryIncome == null || !form16Data) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const itrType = determineITRType(primaryIncome, secondaryIncome);
    const taxReturn = calculateTaxReturn(primaryIncome, secondaryIncome);

    const taxFiling = new TaxFiling({
      userId,
      primaryIncome,
      secondaryIncome,
      itrType,
      taxReturn,
      form16Data,
    });

    await taxFiling.save();

    res.status(200).json({
      message: 'Tax filing successful',
      data: { userId, itrType, taxReturn },
    });
  } catch (error: any) {
    console.error('Error filing tax:', error);
    res.status(500).json({ message: 'Error filing tax', error: error.message });
  }
});

export const TaxFilingRouter = router; 