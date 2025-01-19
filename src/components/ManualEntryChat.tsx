import React, { useState } from 'react';
import { Upload, IndianRupee, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormSection {
  title: string;
  description: string;
  alternativeDescription?: string;
  fields: FormField[];
}

interface FormField {
  id: string;
  label: string;
  type: 'file' | 'text' | 'number' | 'select';
  accept?: string;
  placeholder?: string;
  alternativeField?: {
    label: string;
    description: string;
    type: 'text' | 'number';
    placeholder?: string;
  };
}

export function ManualEntryChat() {
  const navigate = useNavigate();
  const [showAlternative, setShowAlternative] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<Record<string, any>>({});

  const formSections: FormSection[] = [
    {
      title: "Bank Statements",
      description: "Upload your bank statements for the financial year 2023-24",
      alternativeDescription: "For small business owners without regular bank statements",
      fields: [
        {
          id: "bankStatement",
          label: "Bank Statement (PDF)",
          type: "file",
          accept: ".pdf",
          alternativeField: {
            label: "Daily Cash Collection Record",
            description: "Enter your approximate daily cash collection",
            type: "number",
            placeholder: "Enter average daily collection"
          }
        }
      ]
    },
    {
      title: "Income Documents",
      description: "Upload your salary slips or income proofs",
      alternativeDescription: "For business owners without formal income documents",
      fields: [
        {
          id: "salarySlips",
          label: "Salary Slips",
          type: "file",
          accept: ".pdf",
          alternativeField: {
            label: "Monthly Business Income",
            description: "Enter your approximate monthly business income",
            type: "number",
            placeholder: "Enter monthly income"
          }
        }
      ]
    },
    {
      title: "Investment Proofs",
      description: "Upload documents for tax-saving investments",
      alternativeDescription: "Alternative investment proofs",
      fields: [
        {
          id: "investments",
          label: "Investment Documents",
          type: "file",
          accept: ".pdf",
          alternativeField: {
            label: "Other Investments",
            description: "Enter details of any informal investments (like gold, property)",
            type: "text",
            placeholder: "Describe your investments"
          }
        }
      ]
    },
    {
      title: "Business Expenses",
      description: "Upload bills and expense documents",
      alternativeDescription: "For tracking business expenses without formal bills",
      fields: [
        {
          id: "expenses",
          label: "Expense Documents",
          type: "file",
          accept: ".pdf",
          alternativeField: {
            label: "Monthly Expenses Breakdown",
            description: "Enter your approximate monthly business expenses",
            type: "number",
            placeholder: "Enter monthly expenses"
          }
        }
      ]
    }
  ];

  const handleInputChange = (sectionId: string, fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [sectionId + fieldId]: value
    }));
  };

  const toggleAlternative = (sectionId: string) => {
    setShowAlternative(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-white/90 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
          {formSections.map((section, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-xl rounded-lg p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">{section.title}</h2>
                  <p className="text-white/90">
                    {showAlternative[section.title] ? section.alternativeDescription : section.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleAlternative(section.title)}
                  className="text-purple-200 hover:text-purple-100 text-sm flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4" />
                  {showAlternative[section.title] ? "Show Standard Form" : "I don't have these documents"}
                </button>
              </div>

              <div className="space-y-6">
                {section.fields.map((field) => (
                  <div key={field.id} className="space-y-4">
                    {!showAlternative[section.title] ? (
                      <div>
                        <label className="block text-white font-medium mb-2">{field.label}</label>
                        <input
                          type={field.type}
                          accept={field.accept}
                          onChange={(e) => handleInputChange(section.title, field.id, 
                            field.type === 'file' ? e.target.files?.[0] : e.target.value)}
                          className="w-full bg-white/20 text-white placeholder-white/60 rounded-lg px-4 py-2 
                            focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/10
                            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    ) : field.alternativeField && (
                      <div>
                        <label className="block text-white font-medium mb-2">{field.alternativeField.label}</label>
                        <p className="text-white/90 text-sm mb-2">{field.alternativeField.description}</p>
                        <input
                          type={field.alternativeField.type}
                          placeholder={field.alternativeField.placeholder}
                          onChange={(e) => handleInputChange(section.title, field.id + '_alt', e.target.value)}
                          className="w-full bg-white/20 text-white placeholder-white/60 rounded-lg px-4 py-2 
                            focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/10
                            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end sticky bottom-6">
            <button
              type="submit"
              className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 
                transition-colors flex items-center gap-2 shadow-lg"
            >
              <IndianRupee className="h-5 w-5" />
              Calculate Tax Liability
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 