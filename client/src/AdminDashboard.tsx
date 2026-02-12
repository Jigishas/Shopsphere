import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, Trash2, Plus, Users, Package, BarChart3, LogOut, 
  Search, X, CheckCircle, AlertCircle, TrendingUp,
  DollarSign, ShoppingCart, Eye, Grid, List, RefreshCw, Shield
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';


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
  stock?: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

const API_URL = '/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // Modal states
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [_showUserDetails, setShowUserDetails] = useState<User | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Stats state
  const [stats, _setStats] = useState({

    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 1234,
    monthlyRevenue: [
      { month: 'Jan', revenue: 45000 },
      { month: 'Feb', revenue: 52000 },
      { month: 'Mar', revenue: 48000 },
      { month: 'Apr', revenue: 61000 },
      { month: 'May', revenue: 55000 },
      { month: 'Jun', revenue: 67000 },
    ]
  });
  
  // Form states

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', category: '', price: 0, originalPrice: 0,
    image: '', badge: '', isDeal: false, stock: 100
  });
  
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('shopsphere-user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (!parsedUser.isAdmin) {
        navigate('/');
        showNotification('error', 'Access denied. Admin privileges required.');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchProducts(), fetchUsers()]);
    } catch (error) {
      showNotification('error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    setProducts(data);
  };

  const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    setUsers(data.users || []);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProduct, id: Date.now() }),
      });
      if (!response.ok) throw new Error('Failed to add product');
      await fetchProducts();
      setShowAddProduct(false);
      setNewProduct({ name: '', category: '', price: 0, originalPrice: 0, image: '', badge: '', isDeal: false, stock: 100 });
      showNotification('success', 'Product added successfully!');
    } catch (error) {
      showNotification('error', 'Failed to add product');
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const response = await fetch(`${API_URL}/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      if (!response.ok) throw new Error('Failed to update product');
      await fetchProducts();
      setShowEditProduct(false);
      setEditingProduct(null);
      showNotification('success', 'Product updated successfully!');
    } catch (error) {
      showNotification('error', 'Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      await fetchProducts();
      setShowDeleteConfirm(null);
      showNotification('success', 'Product deleted successfully!');
    } catch (error) {
      showNotification('error', 'Failed to delete product');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete user');
      await fetchUsers();
      showNotification('success', 'User deleted successfully!');
    } catch (error) {
      showNotification('error', 'Failed to delete user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('shopsphere-user');
    localStorage.removeItem('shopsphere-token');
    navigate('/');
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });


  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
          >
            {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {notification.message}
            <button onClick={() => setNotification(null)} className="ml-2"><X size={18} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-secondary text-white z-40">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary rounded-lg"><Shield size={24} /></div>
            <div><h1 className="text-xl font-bold">Admin Panel</h1><p className="text-xs text-gray-400">ShopSphere</p></div>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
              { id: 'products', icon: Package, label: 'Products', count: products.length },
              { id: 'users', icon: Users, label: 'Users', count: users.length },
              { id: 'orders', icon: ShoppingCart, label: 'Orders' },
              { id: 'analytics', icon: TrendingUp, label: 'Analytics' }
            ].map(({ id, icon: Icon, label, count }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === id ? 'bg-primary text-white' : 'hover:bg-white/10'}`}
              >
                <Icon size={20} />{label}
                {count !== undefined && <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-xs">{count}</span>}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-6 left-6 right-6">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30">
              <LogOut size={20} />Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-secondary capitalize">{activeTab === 'dashboard' ? 'Dashboard Overview' : activeTab}</h2>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchDashboardData} className="p-2 text-gray-600 hover:text-primary"><RefreshCw size={20} /></button>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">A</div>
              <div><p className="font-medium text-sm">Admin User</p><p className="text-xs text-gray-500">admin@shopsphere.com</p></div>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Products', value: stats.totalProducts || products.length, icon: Package, color: 'blue', trend: '+12%' },
                { label: 'Total Users', value: stats.totalUsers || users.length, icon: Users, color: 'green', trend: '+8%' },
                { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'purple', trend: '+23%' },
                { label: 'Total Orders', value: stats.totalOrders.toLocaleString(), icon: ShoppingCart, color: 'orange', trend: '-3%' }

              ].map((stat, index) => (
                <motion.div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-secondary mt-1">{stat.value}</p>
                      <p className={`text-sm mt-2 flex items-center gap-1 ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        <TrendingUp size={14} className={stat.trend.startsWith('-') ? 'rotate-180' : ''} />{stat.trend} this month
                      </p>
                    </div>
                    <div className={`p-4 bg-${stat.color}-100 rounded-xl`}>
                      <stat.icon className={`text-${stat.color}-600`} size={28} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-secondary mb-6">Recent Users</h3>
                <div className="space-y-4">
                  {users.slice(0, 5).map((user: User) => (

                    <div key={user._id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">{user.name.charAt(0).toUpperCase()}</div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${user.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{user.isAdmin ? 'Admin' : 'User'}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-secondary mb-6">Recent Products</h3>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product: Product) => (

                    <div key={product._id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                      </div>
                      <span className="font-medium text-primary">${product.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-xl shadow-sm">
              <div className="flex gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                >
                  {categories.map((cat: string) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}><List size={18} /></button>
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}><Grid size={18} /></button>
                </div>
                <button onClick={() => setShowAddProduct(true)} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"><Plus size={18} />Add Product</button>
              </div>
            </div>

            {viewMode === 'list' ? (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Product</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Category</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Price</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product._id} className="border-t hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-secondary">{product.name}</p>
                              {product.badge && <span className="text-xs text-primary">{product.badge}</span>}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 capitalize text-gray-600">{product.category}</td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-secondary">${product.price.toFixed(2)}</span>
                          {product.originalPrice && <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>}
                        </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingProduct(product); setShowEditProduct(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                          <button onClick={() => setShowDeleteConfirm(product._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                        </div>
                      </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div key={product._id} className="bg-white rounded-xl shadow-sm overflow-hidden group" whileHover={{ y: -4 }}>
                    <div className="relative aspect-square">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      {product.isDeal && <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">DEAL</span>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-secondary mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 capitalize mb-3">{product.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingProduct(product); setShowEditProduct(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                          <button onClick={() => setShowDeleteConfirm(product._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">User</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Role</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Joined</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="border-t hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">{user.name.charAt(0).toUpperCase()}</div>
                          <div>
                            <p className="font-medium text-secondary">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{user.isAdmin ? 'Administrator' : 'Customer'}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button onClick={() => setShowUserDetails(user)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={18} /></button>
                          <button onClick={() => handleDeleteUser(user._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders & Analytics Placeholder */}
        {(activeTab === 'orders' || activeTab === 'analytics') && (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'orders' ? <ShoppingCart size={40} className="text-gray-400" /> : <BarChart3 size={40} className="text-gray-400" />}
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-2">Coming Soon</h3>
            <p className="text-gray-500">This feature is under development. Check back later!</p>
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold text-secondary">Add New Product</h3>
              <button onClick={() => setShowAddProduct(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input type="text" required value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input type="text" required value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input type="number" required min="0" step="0.01" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                  <input type="number" min="0" step="0.01" value={newProduct.originalPrice} onChange={(e) => setNewProduct({...newProduct, originalPrice: parseFloat(e.target.value)})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="url" required value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge (Optional)</label>
                  <input type="text" value={newProduct.badge} onChange={(e) => setNewProduct({...newProduct, badge: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input type="number" min="0" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value)})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isDeal" checked={newProduct.isDeal} onChange={(e) => setNewProduct({...newProduct, isDeal: e.target.checked})} className="w-4 h-4" />
                <label htmlFor="isDeal">Mark as Deal</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddProduct(false)} className="flex-1 px-4 py-3 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-secondary">Add Product</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditProduct && editingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold text-secondary">Edit Product</h3>
              <button onClick={() => setShowEditProduct(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <form onSubmit={handleUpdateProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input type="text" required value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input type="text" required value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input type="number" required min="0" step="0.01" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                  <input type="number" min="0" step="0.01" value={editingProduct.originalPrice || ''} onChange={(e) => setEditingProduct({...editingProduct, originalPrice: parseFloat(e.target.value)})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="url" required value={editingProduct.image} onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                  <input type="text" value={editingProduct.badge || ''} onChange={(e) => setEditingProduct({...editingProduct, badge: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="editIsDeal" checked={editingProduct.isDeal} onChange={(e) => setEditingProduct({...editingProduct, isDeal: e.target.checked})} className="w-4 h-4" />
                <label htmlFor="editIsDeal">Mark as Deal</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowEditProduct(false)} className="flex-1 px-4 py-3 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-secondary">Update Product</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Delete Product?</h3>
              <p className="text-gray-500 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 px-4 py-3 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleDeleteProduct(showDeleteConfirm)} className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
