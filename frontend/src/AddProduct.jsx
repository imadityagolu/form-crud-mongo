import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {

      const res = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: Number(price) })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Product added successfully!');
        setName('');
        setPrice('');
      } else {
        setMessage(data.error || 'Error adding product');
      }

    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder='Product Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <input
          type="number"
          required
          placeholder='Price'
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <br /><br />
        <button type="submit">Add Product</button>
      </form>

      {message && <p>{message}</p>}

      <button style={{marginTop: '20px'}} onClick={() => navigate('/all-product')}>Show All Product</button>
    </>
  );
}

export default AddProduct; 