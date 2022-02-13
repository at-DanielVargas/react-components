import React from 'react';
import './style.css';
import { Input } from './components/Input';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <Input
        placeholder="+52 (000) 000-0000"
        data-pattern="+52 (___) ___-____"
        data-slots="_"
        data-accept="\d"
      />
    </div>
  );
}
