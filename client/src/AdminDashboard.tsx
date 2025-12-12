import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash, Plus, Users, Package, BarChart3, LogOut } from 'lucide-react';

interface Product {
  _id: string;
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  isDeal: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: '',
    category: '',
    price: 0,
    originalPrice: 0,
    image: '',
    badge: '',
    isDeal: false
  });

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://shopsphere-p12m.onrender.com/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://shopsphere-p12m.onrender.com/api/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shopsphere-p12m.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        fetchProducts();
        setShowAddProduct(false);
        setNewProduct({
          id: 0,
          name: '',
          category: '',
          price: 0,
          originalPrice: 0,
          image: '',
          badge: '',
          isDeal: false
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const response = await fetch(`https://shopsphere-p12m.onrender.com/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct),
      });

      if (response.ok) {
        fetchProducts();
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`https://shopsphere-p12m.onrender.com/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('shopsphere-user');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-secondary">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-secondary">{products.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-secondary">{users.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <BarChart3 className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-secondary">$0</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'products'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'users'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Users
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-secondary">Product Management</h2>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Plus size={18} />
                    Add Product
                  </button>
                </div>

                {/* Add Product Form */}
                {showAddProduct && (
                  <motion.div
                    className="bg-gray-50 p-6 rounded-lg mb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
                    <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="addProductId" className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                        <input
                          id="addProductId"
                          type="number"
                          placeholder="ID"
                          value={newProduct.id}
                          onChange={(e) => setNewProduct({...newProduct, id: parseInt(e.target.value)})}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="addProductName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          id="addProductName"
                          type="text"
                          placeholder="Name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="addProductCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                          id="addProductCategory"
                          type="text"
                          placeholder="Category"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="addProductPrice" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                          id="addProductPrice"
                          type="number"
                          placeholder="Price"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="addProductOriginalPrice" className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                        <input
                          id="addProductOriginalPrice"
                          type="number"
                          placeholder="Original Price"
                          value={newProduct.originalPrice}
                          onChange={(e) => setNewProduct({...newProduct, originalPrice: parseFloat(e.target.value)})}
                          className="p-3 border rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="addProductImage" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                          id="addProductImage"
                          type="text"
                          placeholder="Image URL"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="addProductBadge" className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                        <input
                          id="addProductBadge"
                          type="text"
                          placeholder="Badge"
                          value={newProduct.badge}
                          onChange={(e) => setNewProduct({...newProduct, badge: e.target.value})}
                          className="p-3 border rounded-lg w-full"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isDeal"
                          checked={newProduct.isDeal}
                          onChange={(e) => setNewProduct({...newProduct, isDeal: e.target.checked})}
                          className="w-4 h-4"
                        />
                        <label htmlFor="isDeal">Is Deal</label>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
                        >
                          Add Product
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddProduct(false)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Edit Product Form */}
                {editingProduct && (
                  <motion.div
                    className="bg-gray-50 p-6 rounded-lg mb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                    <form onSubmit={handleUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="editProductId" className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                        <input
                          id="editProductId"
                          type="number"
                          placeholder="ID"
                          value={editingProduct.id}
                          onChange={(e) => setEditingProduct({...editingProduct, id: parseInt(e.target.value)})}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="editProductName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          id="editProductName"
                          type="text"
                          placeholder="Name"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="editProductCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                          id="editProductCategory"
                          type="text"
                          placeholder="Category"
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="editProductPrice" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                          id="editProductPrice"
                          type="number"
                          placeholder="Price"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="editProductOriginalPrice" className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                        <input
                          id="editProductOriginalPrice"
                          type="number"
                          placeholder="Original Price"
                          value={editingProduct.originalPrice}
                          onChange={(e) => setEditingProduct({...editingProduct, originalPrice: parseFloat(e.target.value)})}
                          className="p-3 border rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="editProductImage" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                          id="editProductImage"
                          type="text"
                          placeholder="Image URL"
                          value={editingProduct.image}
                          onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                          className="p-3 border rounded-lg w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="editProductBadge" className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                        <input
                          id="editProductBadge"
                          type="text"
                          placeholder="Badge"
                          value={editingProduct.badge}
                          onChange={(e) => setEditingProduct({...editingProduct, badge: e.target.value})}
                          className="p-3 border rounded-lg w-full"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="editIsDeal"
                          checked={editingProduct.isDeal}
                          onChange={(e) => setEditingProduct({...editingProduct, isDeal: e.target.checked})}
                          className="w-4 h-4"
                        />
                        <label htmlFor="editIsDeal">Is Deal</label>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
                        >
                          Update Product
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Image</th>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-left py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                          </td>
                          <td className="py-3 px-4 font-medium">{product.name}</td>
                          <td className="py-3 px-4 capitalize">{product.category}</td>
                          <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                aria-label="Edit product"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                aria-label="Delete product"
                              >
                                <Trash size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold text-secondary mb-6">User Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{user.name}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.isAdmin
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.isAdmin ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
