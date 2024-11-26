'use client';

import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    patientName: '',
    dob: '',
    height: '',
    weight: '',
    bmi: '',
  });

  const calculateBMI = (height, weight) => {
    if (height && weight) {
      const heightInMeters = height * 0.0254;
      const bmi = (weight * 0.453592) / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'height' || name === 'weight') {
        newData.bmi = calculateBMI(
          name === 'height' ? value : prev.height,
          name === 'weight' ? value : prev.weight
        );
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      alert('Form submitted successfully!');
      // Optionally reset form
      // setFormData(initialState);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <main className="min-h-screen p-8">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Zepbound (tirzepatide) Medical Necessity Documentation Form
        </h1>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Height (inches)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter height in inches"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Weight (lbs)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter weight in pounds"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">BMI (calculated)</label>
              <input
                type="text"
                value={formData.bmi}
                className="w-full p-2 border rounded bg-gray-50"
                readOnly
              />
            </div>
          </div>
        </section>

        <button 
          type="submit" 
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit Form
        </button>
      </form>
    </main>
  );
}
