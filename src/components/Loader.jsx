import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function Loader({ className = "" }) {
  return (
    <AiOutlineLoading3Quarters 
      className={`animate-spin ${className}`} 
    />
  );
}
