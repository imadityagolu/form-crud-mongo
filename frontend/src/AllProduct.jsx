import { useState, useEffect } from 'react';

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch products: ' + err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>All Product</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {products.length > 0 ? (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', minWidth: '300px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{product.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : !loading && <p>No products found.</p>}
    </div>
  );
}

export default AllProduct; 