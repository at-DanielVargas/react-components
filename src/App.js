import React from 'react';
import './style.css';
import { Input } from './components/Input';

export default function App() {
  return (
    <div className="container">
      <div className="columns is-mobile">
        <div className="column is-half is-offset-one-quarter">
          <h1>Custom components for react</h1>
        </div>
      </div>

      <Input
        placeholder="+52 (000) 000-0000"
        data-pattern="+52 (###) ###-####"
        data-slots="#"
        data-accept="\d"
      />
    </div>
  );
}
