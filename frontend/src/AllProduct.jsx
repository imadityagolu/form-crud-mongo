import { useState, useEffect } from 'react';

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  const fetchProducts = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setActionMsg('');
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setActionMsg('Product deleted');
        setProducts(products.filter(p => p._id !== id));
      } else {
        setActionMsg(data.error || 'Delete failed');
      }
    } catch (err) {
      setActionMsg('Network error: ' + err.message);
    }
  };

  const startEdit = (product) => {
    setEditId(product._id);
    setEditName(product.name);
    setEditPrice(product.price);
    setActionMsg('');
  };

  const handleEditSave = async (id) => {
    setActionMsg('');
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, price: Number(editPrice) })
      });
      const data = await res.json();
      if (res.ok) {
        setActionMsg('Product updated');
        setProducts(products.map(p => p._id === id ? { ...p, name: editName, price: editPrice } : p));
        setEditId(null);
      } else {
        setActionMsg(data.error || 'Update failed');
      }
    } catch (err) {
      setActionMsg('Network error: ' + err.message);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditName('');
    setEditPrice('');
    setActionMsg('');
  };

  return (
    <div>
      <h2>All Product</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {actionMsg && <p>{actionMsg}</p>}
      {products.length > 0 ? (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', minWidth: '300px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Price</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {editId === product._id ? (
                    <input value={editName} onChange={e => setEditName(e.target.value)} />
                  ) : (
                    product.name
                  )}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {editId === product._id ? (
                    <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {editId === product._id ? (
                    <>
                      <button onClick={() => handleEditSave(product._id)}>Save</button>
                      <button onClick={handleEditCancel} style={{ marginLeft: 8 }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(product)}>Edit</button>
                      <button onClick={() => handleDelete(product._id)} style={{ marginLeft: 8 }}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : !loading && <p>No products found.</p>}
    </div>
  );
}

export default AllProduct; 