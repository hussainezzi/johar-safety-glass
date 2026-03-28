import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirement: '',
    product: 'Windscreens'
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const products = [
    { name: 'Windscreens', desc: 'High-quality windscreens for all vehicles.' },
    { name: 'Bulletproof Glass', desc: 'Maximum security glass for high-risk environments.' },
    { name: 'Laminated Safety Glass', desc: 'Shatter-resistant glass for safety and durability.' },
    { name: 'Tempered Glass', desc: 'Toughened glass designed for strength and safety.' },
    { name: 'Double Glazed Glass', desc: 'Energy-efficient glass with superior insulation.' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('Submitting...');
    
    fetch('https://script.google.com/macros/s/AKfycbwNmFpBnjgQiOL4OeZlBNZO94KRqyzsdUzsRDbM94NOg27QQnc-sLmOAr37uqgQQ1n6Eg/exec', { 
      method: 'POST', 
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(formData) 
    })
    .then(response => response.text())
    .then(data => {
      setSubmitStatus('Order placed successfully! We will contact you soon.');
      setFormData({ name: '', phone: '', requirement: '', product: 'Windscreens' });
    })
    .catch(error => {
      setSubmitStatus('There was an error submitting your request. Please try again.');
      console.error(error);
    });
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Johar Safety Glass</h1>
        <p>Premium Glass Processing & Manufacturing</p>
      </header>

      <section className="portfolio">
        <h2>Our Portfolio & Services</h2>
        <div className="product-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="order-section">
        <h2>Place an Order / Share Your Requirements</h2>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Product of Interest</label>
            <select name="product" value={formData.product} onChange={handleChange}>
              {products.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Detailed Requirement</label>
            <textarea name="requirement" rows="4" value={formData.requirement} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="submit-btn" disabled={submitStatus === 'Submitting...'}>Submit Order</button>
          {submitStatus && <p className="status-msg">{submitStatus}</p>}
        </form>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Johar Safety Glass. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
