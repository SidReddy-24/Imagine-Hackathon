const API_URL = 'http://localhost:3000/api';

export const fileTax = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/tax/file-tax`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to file tax');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error filing tax:', error);
    throw error;
  }
}; 