import { account, tablesDB } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaKey, FaStar, FaTrash, FaPlus, FaEye, FaEyeSlash, FaCopy, FaExternalLinkAlt, FaFolder, FaSearch, FaChevronDown, FaChevronLeft, FaChevronRight, FaShieldAlt, FaUserCircle, FaStickyNote, FaEllipsisH, FaCheck } from "react-icons/fa";
import { MdGridView, MdViewList } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader } from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import { calculatePasswordStrength, generatePassword } from "@/utils/passwordStrength";
import { usePasswordData } from "@/hooks/usePasswordData";

function Vault() {
  const navigate = useNavigate();
  const location = useLocation();
  const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const tableId = import.meta.env.VITE_APPWRITE_PASSOWORD_TABLE_ID;

  // Use custom hook for password data (full mode with passwords)
  const { passwords: fetchedPasswords, loading, error, refetch } = usePasswordData({ lightweight: false });

  // Local passwords state for CRUD operations
  const [passwords, setPasswords] = useState([]);
  const [filteredPasswords, setFilteredPasswords] = useState([]);
  
  // UI state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStrength, setSelectedStrength] = useState('any');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasswordValue, setShowPasswordValue] = useState({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    password: '',
    category: 'other',
    notes: ''
  });
  const [showFormPassword, setShowFormPassword] = useState(false);

  // Sync fetched passwords to local state
  useEffect(() => {
    if (fetchedPasswords && fetchedPasswords.length >= 0) {
      setPasswords(fetchedPasswords);
    }
  }, [fetchedPasswords]);

  // Handle navigation state for filtering from Dashboard
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
    if (location.state?.strength) {
      setSelectedStrength(location.state.strength);
    }
  }, [location.state]);

  // Filter and search passwords
  useEffect(() => {
    let filtered = [...passwords];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Strength filter
    if (selectedStrength !== 'any') {
      filtered = filtered.filter(item => {
        const strength = calculatePasswordStrength(item.password);
        return strength.level === selectedStrength;
      });
    }

    // Sorting
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'strength') {
      filtered.sort((a, b) => {
        const strengthA = calculatePasswordStrength(a.password).score;
        const strengthB = calculatePasswordStrength(b.password).score;
        return strengthB - strengthA;
      });
    }

    setFilteredPasswords(filtered);
    setCurrentPage(1);
  }, [passwords, searchQuery, selectedCategory, selectedStrength, sortBy]);

  const addNewPassword = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.password) {
      toast.error("Title and password are required");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const userId = fetchedPasswords[0]?.userId || (await account.get()).$id;
      const response = await tablesDB.createRow({
        databaseId,
        tableId,
        rowId: ID.unique(),
        data: {
          ...formData,
          userId: userId
        }
      });

      setPasswords([response, ...passwords]);
      refetch(); // Refresh cache
      toast.success("Password added successfully");
      setShowAddModal(false);
      setFormData({
        url: '',
        title: '',
        password: '',
        category: 'other',
        notes: ''
      });
    } catch (error) {
      console.error("Error adding password:", error);
      toast.error(error.message || "Failed to add password");
    }
  };

  const deletePassword = async (passwordId) => {
    try {
      await tablesDB.deleteRow({
        databaseId,
        tableId,
        rowId: passwordId
      });
      
      setPasswords(passwords.filter(password => password.$id !== passwordId));
      refetch(); // Refresh cache
      toast.success("Password deleted successfully");
      setShowDeleteModal(false);
      setShowDetailsModal(false);
      setSelectedPassword(null);
    } catch (error) {
      console.error("Error deleting password:", error);
      toast.error(error.message || "Failed to delete password");
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const togglePasswordVisibility = (passwordId) => {
    setShowPasswordValue(prev => ({
      ...prev,
      [passwordId]: !prev[passwordId]
    }));
  };

  const generateNewPassword = () => {
    const newPassword = generatePassword(16);
    setFormData({ ...formData, password: newPassword });
    toast.success("Strong password generated!");
  };

  const handleViewDetails = (password) => {
    setSelectedPassword(password);
    setShowDetailsModal(true);
  };

  const handleEditPassword = () => {
    setFormData({
      url: selectedPassword.url || '',
      title: selectedPassword.title || '',
      password: selectedPassword.password || '',
      category: selectedPassword.category || 'other',
      notes: selectedPassword.notes || ''
    });
    setShowDetailsModal(false);
    setShowEditModal(true);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.password) {
      toast.error("Title and password are required");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await tablesDB.updateRow({
        databaseId,
        tableId,
        rowId: selectedPassword.$id,
        data: {
          url: formData.url,
          title: formData.title,
          password: formData.password,
          category: formData.category,
          notes: formData.notes
        }
      });

      setPasswords(passwords.map(password => 
        password.$id === selectedPassword.$id ? response : password
      ));
      refetch(); // Refresh cache
      toast.success("Password updated successfully");
      setShowEditModal(false);
      setSelectedPassword(null);
      setFormData({
        url: '',
        title: '',
        password: '',
        category: 'other',
        notes: ''
      });
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.message || "Failed to update password");
    }
  };

  const handleDeleteConfirmation = () => {
    setShowDetailsModal(false);
    setShowDeleteModal(true);
  };

  // Pagination
  const totalPages = Math.ceil(filteredPasswords.length / itemsPerPage);
  const paginatedPasswords = filteredPasswords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'social': return '👥';
      case 'email': return '📧';
      case 'banking': return '🏦';
      case 'work': return '💼';
      default: return '🔐';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#22040b] via-[#120006] to-black flex">
      {/* Shared Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-stone-900/95 backdrop-blur-sm border-b border-stone-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/40 flex items-center justify-center">
                <FaLock className="text-red-500 text-xl" />
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold">Vault</h1>
                <p className="text-stone-400 text-sm">Secure Password Manager</p>
              </div>
            </div>

            <Button
              onClick={() => setShowAddModal(true)}
              disabled={loading}
              className="bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full h-10 px-6 shadow-[0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPlus className="mr-2" />
              Add New Item
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
              <Loader />
            </div>
          ) : (
          <div className="max-w-350 mx-auto p-4 md:p-8">
            {/* Page Header */}
            <div className="flex flex-wrap justify-between items-end gap-3 pb-4 border-b border-stone-700 mb-6">
              <div>
                <h2 className="text-white text-3xl font-bold">My Vault</h2>
                <p className="text-stone-400 text-sm mt-1">Manage your passwords and secure notes</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-stone-800 text-red-500 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20">
                  Total Items: {passwords.length}
                </span>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-6">
              {/* Search */}
              <div className="w-full lg:w-96">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <Input
                    type="text"
                    placeholder="Search vault, username, or website..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                  />
                </div>
              </div>

              {/* Filters & View Toggle */}
              <div className="flex gap-3 flex-wrap items-center">
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="h-9 px-3 rounded-lg bg-stone-900/50 border border-stone-700 text-white text-xs hover:bg-stone-800/50 transition-colors"
                  >
                    <option value="all">Category: All</option>
                    <option value="social">Social</option>
                    <option value="email">Email</option>
                    <option value="banking">Banking</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>

                  <select
                    value={selectedStrength}
                    onChange={(e) => setSelectedStrength(e.target.value)}
                    className="h-9 px-3 rounded-lg bg-stone-900/50 border border-stone-700 text-white text-xs hover:bg-stone-800/50 transition-colors"
                  >
                    <option value="any">Strength: Any</option>
                    <option value="weak">Weak</option>
                    <option value="medium">Medium</option>
                    <option value="strong">Strong</option>
                    <option value="very-strong">Very Strong</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-9 px-3 rounded-lg bg-stone-900/50 border border-stone-700 text-white text-xs hover:bg-stone-800/50 transition-colors"
                  >
                    <option value="date">Sort: Date</option>
                    <option value="title">Title</option>
                    <option value="strength">Strength</option>
                  </select>
                </div>

                <div className="h-6 w-px bg-stone-700 mx-1"></div>

                <div className="flex bg-stone-900/50 border border-stone-700 rounded-lg p-1 gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-red-500 text-white'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <MdGridView size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1 rounded transition-colors ${
                      viewMode === 'list'
                        ? 'bg-red-500 text-white'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <MdViewList size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Password Grid/List */}
            {paginatedPasswords.length === 0 ? (
              <div className="text-center py-20">
                <FaLock className="text-6xl text-stone-700 mx-auto mb-4" />
                <p className="text-stone-400 text-lg">No passwords found</p>
                <p className="text-stone-500 text-sm mt-2">Add your first password to get started</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
                : "flex flex-col gap-3"
              }>
                {paginatedPasswords.map((item) => {
                  const strength = calculatePasswordStrength(item.password);
                  return (
                    <Card
                      key={item.$id}
                      className="group bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 hover:border-red-500/50 transition-all duration-200 p-5 relative overflow-hidden"
                    >
                      {/* More Options Button */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleViewDetails(item)}
                          className="text-stone-400 hover:text-white p-1 rounded hover:bg-stone-800"
                        >
                          <FaEllipsisH />
                        </button>
                      </div>

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-red-500/20 to-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0 text-2xl">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="flex flex-col min-w-0 pr-6">
                          <h3 className="text-white font-bold text-lg truncate">{item.title}</h3>
                          <p className="text-stone-400 text-xs truncate capitalize">{item.category}</p>
                        </div>
                      </div>

                      {/* URL if exists */}
                      {item.url && (
                        <div className="bg-stone-950/50 rounded p-2 flex items-center justify-between border border-stone-700 mb-3">
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] text-stone-500 uppercase font-semibold">Website</span>
                            <span className="text-sm text-white truncate">{item.url}</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(item.url, 'URL')}
                            className="text-stone-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-stone-800"
                          >
                            <FaCopy size={14} />
                          </button>
                        </div>
                      )}

                      {/* Password */}
                      <div className="bg-stone-950/50 rounded p-2 flex items-center justify-between border border-stone-700">
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] text-stone-500 uppercase font-semibold">Password</span>
                          <span className="text-sm text-white tracking-widest">
                            {showPasswordValue[item.$id] ? item.password : '••••••••••••'}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => togglePasswordVisibility(item.$id)}
                            className="text-stone-400 hover:text-white transition-colors p-1 rounded hover:bg-stone-800"
                          >
                            {showPasswordValue[item.$id] ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(item.password, 'Password')}
                            className="text-stone-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-stone-800"
                          >
                            <FaCopy size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Footer with Strength & Launch */}
                      <div className="mt-4 pt-3 border-t border-stone-700 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-stone-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                strength.color === 'green' ? 'bg-green-500' :
                                strength.color === 'yellow' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${strength.percentage}%` }}
                            ></div>
                          </div>
                          <span className={`text-[10px] font-medium ${
                            strength.color === 'green' ? 'text-green-500' :
                            strength.color === 'yellow' ? 'text-yellow-500' :
                            'text-red-500'
                          }`}>
                            {strength.displayText}
                          </span>
                        </div>
                        {item.url && (
                          <button
                            onClick={() => window.open(item.url.startsWith('http') ? item.url : `https://${item.url}`, '_blank')}
                            className="text-xs font-semibold text-white hover:text-red-500 flex items-center gap-1 transition-colors"
                          >
                            Launch
                            <FaExternalLinkAlt size={12} />
                          </button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-stone-700">
                <p className="text-stone-400 text-sm">
                  Showing <span className="text-white font-medium">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredPasswords.length)}</span> of <span className="text-white font-medium">{filteredPasswords.length}</span> items
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-stone-900 border border-stone-700 text-stone-400 hover:text-white hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <FaChevronLeft size={14} />
                  </button>
                  
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`flex items-center justify-center w-9 h-9 rounded-lg font-medium transition-all ${
                          currentPage === pageNum
                            ? 'bg-red-500 text-white shadow-md'
                            : 'bg-stone-900 border border-stone-700 text-stone-400 hover:text-white hover:border-red-500'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-stone-900 border border-stone-700 text-stone-400 hover:text-white hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <FaChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
          )}
        </main>
      </div>

      {/* Add Password Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FaPlus className="text-red-500" />
                Add New Password
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={addNewPassword} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-stone-300">Title *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Netflix, Gmail, Bank Account"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                />
              </div>

              <div>
                <Label htmlFor="url" className="text-stone-300">Website URL</Label>
                <Input
                  id="url"
                  type="text"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-stone-300">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-stone-900/50 border border-stone-700 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                >
                  <option value="social">Social Media</option>
                  <option value="email">Email</option>
                  <option value="banking">Banking</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="password" className="text-stone-300">Password *</Label>
                  <button
                    type="button"
                    onClick={generateNewPassword}
                    className="text-xs text-red-500 hover:text-red-400 transition-colors"
                  >
                    Generate Strong Password
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showFormPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                    className="bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowFormPassword(!showFormPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-red-400 transition-colors"
                  >
                    {showFormPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    {(() => {
                      const strength = calculatePasswordStrength(formData.password);
                      return (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-stone-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all ${
                                strength.color === 'green' ? 'bg-green-500' :
                                strength.color === 'yellow' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${strength.percentage}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-medium ${
                            strength.color === 'green' ? 'text-green-500' :
                            strength.color === 'yellow' ? 'text-yellow-500' :
                            'text-red-500'
                          }`}>
                            {strength.displayText}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="notes" className="text-stone-300">Notes</Label>
                <textarea
                  id="notes"
                  placeholder="Add any additional notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900/50 border border-stone-700 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 rounded-full h-10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full h-10 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                  <FaCheck className="mr-2" />
                  Add Password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Password Details Modal */}
      {showDetailsModal && selectedPassword && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FaLock className="text-red-500" />
                Password Details
              </h2>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedPassword(null);
                }}
                className="text-stone-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <Label className="text-stone-500 text-xs uppercase">Title</Label>
                <p className="text-white text-lg font-semibold mt-1">{selectedPassword.title}</p>
              </div>

              {/* Category */}
              <div>
                <Label className="text-stone-500 text-xs uppercase">Category</Label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl">{getCategoryIcon(selectedPassword.category)}</span>
                  <p className="text-white capitalize">{selectedPassword.category}</p>
                </div>
              </div>

              {/* URL */}
              {selectedPassword.url && (
                <div>
                  <Label className="text-stone-500 text-xs uppercase">Website URL</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-white flex-1 truncate">{selectedPassword.url}</p>
                    <button
                      onClick={() => copyToClipboard(selectedPassword.url, 'URL')}
                      className="text-stone-400 hover:text-red-500 transition-colors p-2 rounded hover:bg-stone-800"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <Label className="text-stone-500 text-xs uppercase">Password</Label>
                <div className="flex items-center gap-2 mt-1 bg-stone-950/50 border border-stone-700 rounded-lg p-3">
                  <p className="text-white flex-1 font-mono tracking-wider">
                    {showPasswordValue[selectedPassword.$id] ? selectedPassword.password : '••••••••••••'}
                  </p>
                  <button
                    onClick={() => togglePasswordVisibility(selectedPassword.$id)}
                    className="text-stone-400 hover:text-white transition-colors p-2 rounded hover:bg-stone-800"
                  >
                    {showPasswordValue[selectedPassword.$id] ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(selectedPassword.password, 'Password')}
                    className="text-stone-400 hover:text-red-500 transition-colors p-2 rounded hover:bg-stone-800"
                  >
                    <FaCopy />
                  </button>
                </div>
                {/* Password Strength */}
                {(() => {
                  const strength = calculatePasswordStrength(selectedPassword.password);
                  return (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-2 bg-stone-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            strength.color === 'green' ? 'bg-green-500' :
                            strength.color === 'yellow' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${strength.percentage}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${
                        strength.color === 'green' ? 'text-green-500' :
                        strength.color === 'yellow' ? 'text-yellow-500' :
                        'text-red-500'
                      }`}>
                        {strength.displayText}
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* Notes */}
              {selectedPassword.notes && (
                <div>
                  <Label className="text-stone-500 text-xs uppercase">Notes</Label>
                  <p className="text-white mt-1 bg-stone-950/50 border border-stone-700 rounded-lg p-3 whitespace-pre-wrap">
                    {selectedPassword.notes}
                  </p>
                </div>
              )}

              {/* Created Date */}
              <div>
                <Label className="text-stone-500 text-xs uppercase">Created</Label>
                <p className="text-stone-400 text-sm mt-1">
                  {new Date(selectedPassword.$createdAt).toLocaleString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-stone-700">
                <Button
                  onClick={handleEditPassword}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full h-10"
                >
                  <FaKey className="mr-2" />
                  Edit Password
                </Button>
                <Button
                  onClick={handleDeleteConfirmation}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-full h-10"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Password Modal */}
      {showEditModal && selectedPassword && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FaKey className="text-blue-500" />
                Edit Password
              </h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedPassword(null);
                  setFormData({
                    url: '',
                    title: '',
                    password: '',
                    category: 'other',
                    notes: ''
                  });
                }}
                className="text-stone-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <Label htmlFor="edit-title" className="text-stone-300">Title *</Label>
                <Input
                  id="edit-title"
                  type="text"
                  placeholder="e.g., Netflix, Gmail, Bank Account"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div>
                <Label htmlFor="edit-url" className="text-stone-300">Website URL</Label>
                <Input
                  id="edit-url"
                  type="text"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div>
                <Label htmlFor="edit-category" className="text-stone-300">Category</Label>
                <select
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-stone-900/50 border border-stone-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="social">Social Media</option>
                  <option value="email">Email</option>
                  <option value="banking">Banking</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="edit-password" className="text-stone-300">Password *</Label>
                  <button
                    type="button"
                    onClick={generateNewPassword}
                    className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    Generate Strong Password
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="edit-password"
                    type={showFormPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                    className="bg-stone-900/50 border-stone-700 text-white placeholder:text-stone-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowFormPassword(!showFormPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-blue-400 transition-colors"
                  >
                    {showFormPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    {(() => {
                      const strength = calculatePasswordStrength(formData.password);
                      return (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-stone-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all ${
                                strength.color === 'green' ? 'bg-green-500' :
                                strength.color === 'yellow' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${strength.percentage}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-medium ${
                            strength.color === 'green' ? 'text-green-500' :
                            strength.color === 'yellow' ? 'text-yellow-500' :
                            'text-red-500'
                          }`}>
                            {strength.displayText}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="edit-notes" className="text-stone-300">Notes</Label>
                <textarea
                  id="edit-notes"
                  placeholder="Add any additional notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900/50 border border-stone-700 text-white placeholder:text-stone-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedPassword(null);
                    setFormData({
                      url: '',
                      title: '',
                      password: '',
                      category: 'other',
                      notes: ''
                    });
                  }}
                  className="flex-1 bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 rounded-full h-10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full h-10 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  <FaCheck className="mr-2" />
                  Update Password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPassword && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-linear-to-br from-stone-900/95 via-black/95 to-stone-900/95 border-stone-700 p-6">
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center">
                <FaTrash className="text-red-500 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Delete Password?</h2>
              <p className="text-stone-400">
                Are you sure you want to delete <span className="text-white font-semibold">"{selectedPassword.title}"</span>?
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowDeleteModal(false);
                  setShowDetailsModal(true);
                }}
                className="flex-1 bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 rounded-full h-10"
              >
                Cancel
              </Button>
              <Button
                onClick={() => deletePassword(selectedPassword.$id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-full h-10"
              >
                <FaTrash className="mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Vault;