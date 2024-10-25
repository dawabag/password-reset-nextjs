// src/app/search/page.js
"use client";

import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Image from 'next/image';

export default function SearchUser() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase
      .from('master_users')
      .select('password')
      .eq('email', email)
      .single();

    if (error) {
      setError('User not found');
    } else {
      setName(data?.password || 'No name found');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    
      
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Re-Enter Email for Secured Recovery</h1>
      
      <form onSubmit={handleSearch} className="bg-white p-8 rounded-lg shadow-lg w-80">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Dawabag User Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter email"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Recover Password
        </button>
      </form>

      {name && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          <p><strong>Password:</strong> {name}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
