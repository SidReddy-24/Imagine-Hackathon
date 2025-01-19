import React, { useState } from 'react';
import { Edit2, Save, X, Eye, Download } from 'lucide-react';

interface DataTableProps {
  data: any[];
  isLoading: boolean;
  onUpdateData: (id: string, updates: any) => void;
  searchTerm: string;
}

export function DataTable({ data, isLoading, onUpdateData, searchTerm }: DataTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<any>({});

  const handleEdit = (id: string) => {
    setEditingId(id);
    setEditedValues(data.find(item => item.id === id));
  };

  const handleSave = async (id: string) => {
    await onUpdateData(id, editedValues);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedValues({});
  };

  const filteredData = data.filter(item => 
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Submission Date</th>
            <th className="px-4 py-3 text-left">Form Type</th>
            <th className="px-4 py-3 text-right">Taxable Income</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="border-b border-white/10">
              <td className="px-4 py-3">{item.name}</td>
              <td className="px-4 py-3">{item.email}</td>
              <td className="px-4 py-3">
                {new Date(item.submissionDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">{item.formType}</td>
              <td className="px-4 py-3 text-right">
                {editingId === item.id ? (
                  <input
                    type="number"
                    value={editedValues.taxableIncome}
                    onChange={(e) => setEditedValues({
                      ...editedValues,
                      taxableIncome: e.target.value
                    })}
                    className="bg-white/10 rounded px-2 py-1 w-32"
                  />
                ) : (
                  `₹${item.taxableIncome.toLocaleString()}`
                )}
              </td>
              <td className="px-4 py-3">
                {editingId === item.id ? (
                  <select
                    value={editedValues.status}
                    onChange={(e) => setEditedValues({
                      ...editedValues,
                      status: e.target.value
                    })}
                    className="bg-white/10 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="processed">Processed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'processed' ? 'bg-green-500/20 text-green-300' :
                    item.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {item.status}
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-center space-x-2">
                  {editingId === item.id ? (
                    <>
                      <button
                        onClick={() => handleSave(item.id)}
                        className="p-1 hover:bg-white/10 rounded"
                      >
                        <Save className="h-4 w-4 text-green-400" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-1 hover:bg-white/10 rounded"
                      >
                        <X className="h-4 w-4 text-red-400" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="p-1 hover:bg-white/10 rounded"
                      >
                        <Edit2 className="h-4 w-4 text-blue-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Eye className="h-4 w-4 text-purple-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Download className="h-4 w-4 text-green-400" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 