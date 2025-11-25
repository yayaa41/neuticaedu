<template>
  <div class="admin-users">
    <!-- Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1>👥 Management Pengguna</h1>
          <p>Kelola data pengguna dan akses sistem</p>
        </div>
        <div class="header-actions">
          <button @click="exportUsers" class="btn-secondary">
            📊 Export Data
          </button>
          <button @click="showAddUser = true" class="btn-primary">
            ➕ Tambah Pengguna
          </button>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="filters-section">
      <div class="filters-content">
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari pengguna..." 
            class="search-input"
          >
          <span class="search-icon">🔍</span>
        </div>
        
        <div class="filter-controls">
          <select v-model="statusFilter" class="filter-select">
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Non-Aktif</option>
          </select>
          
          <select v-model="roleFilter" class="filter-select">
            <option value="">Semua Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          
          <button @click="clearFilters" class="btn-clear">
            🗑️ Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="table-section">
      <div class="table-container">
        <div class="table-header">
          <div class="table-info">
            Menampilkan {{ filteredUsers.length }} dari {{ users.length }} pengguna
          </div>
          <div class="table-actions">
            <button @click="refreshUsers" class="btn-refresh" :disabled="loading">
              {{ loading ? '🔄...' : '🔄 Refresh' }}
            </button>
          </div>
        </div>

        <div class="table-wrapper">
          <table class="users-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    v-model="selectAll"
                    @change="toggleSelectAll"
                  >
                </th>
                <th @click="sortUsers('name')" class="sortable">
                  Nama 
                  <span v-if="sortBy === 'name'" class="sort-icon">
                    {{ sortOrder === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th @click="sortUsers('email')" class="sortable">
                  Email
                  <span v-if="sortBy === 'email'" class="sort-icon">
                    {{ sortOrder === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th @click="sortUsers('role')" class="sortable">
                  Role
                  <span v-if="sortBy === 'role'" class="sort-icon">
                    {{ sortOrder === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th @click="sortUsers('status')" class="sortable">
                  Status
                  <span v-if="sortBy === 'status'" class="sort-icon">
                    {{ sortOrder === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th @click="sortUsers('joined')" class="sortable">
                  Bergabung
                  <span v-if="sortBy === 'joined'" class="sort-icon">
                    {{ sortOrder === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.id" 
                  :class="{ selected: selectedUsers.includes(user.id) }">
                <td>
                  <input 
                    type="checkbox" 
                    :value="user.id"
                    v-model="selectedUsers"
                  >
                </td>
                <td>
                  <div class="user-info">
                    <div class="user-avatar">
                      {{ getUserInitials(user.name) }}
                    </div>
                    <div class="user-details">
                      <div class="user-name">{{ user.name }}</div>
                      <div class="user-username">@{{ user.username }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="role-badge" :class="user.role">
                    {{ user.role === 'admin' ? 'Administrator' : 'Pengguna' }}
                  </span>
                </td>
                <td>
                  <span class="status-badge" :class="user.status">
                    {{ user.status === 'active' ? 'Aktif' : 'Non-Aktif' }}
                  </span>
                </td>
                <td>{{ formatDate(user.joined) }}</td>
                <td>
                  <div class="action-buttons">
                    <button @click="editUser(user)" class="btn-action edit" title="Edit">
                      ✏️
                    </button>
                    <button @click="viewUser(user)" class="btn-action info" title="Detail">
                      ℹ️
                    </button>
                    <button 
                      @click="toggleUserStatus(user)" 
                      :class="['btn-action', user.status === 'active' ? 'deactivate' : 'activate']"
                      :title="user.status === 'active' ? 'Non-aktifkan' : 'Aktifkan'"
                    >
                      {{ user.status === 'active' ? '⏸️' : '▶️' }}
                    </button>
                    <button 
                      @click="deleteUser(user)" 
                      class="btn-action delete" 
                      title="Hapus"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Empty State -->
          <div v-if="filteredUsers.length === 0" class="empty-state">
            <div class="empty-icon">👥</div>
            <h3>Tidak ada pengguna ditemukan</h3>
            <p>Coba ubah filter pencarian atau tambah pengguna baru</p>
            <button @click="clearFilters" class="btn-primary">
              🔄 Reset Filter
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredUsers.length > 0" class="pagination">
          <div class="pagination-info">
            Menampilkan {{ startIndex + 1 }}-{{ endIndex }} dari {{ filteredUsers.length }} pengguna
          </div>
          <div class="pagination-controls">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1"
              class="pagination-btn"
            >
              ← Prev
            </button>
            
            <div class="page-numbers">
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="goToPage(page)"
                :class="{ active: currentPage === page }"
                class="page-btn"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="pagination-btn"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Actions -->
    <div v-if="selectedUsers.length > 0" class="bulk-actions">
      <div class="bulk-content">
        <span class="bulk-info">
          {{ selectedUsers.length }} pengguna terpilih
        </span>
        <div class="bulk-buttons">
          <button @click="bulkActivate" class="btn-bulk activate">
            ▶️ Aktifkan
          </button>
          <button @click="bulkDeactivate" class="btn-bulk deactivate">
            ⏸️ Non-aktifkan
          </button>
          <button @click="bulkDelete" class="btn-bulk delete">
            🗑️ Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddUser" class="modal-backdrop" @click="showAddUser = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>➕ Tambah Pengguna Baru</h3>
          <button @click="showAddUser = false" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Nama Lengkap *</label>
            <input v-model="newUser.name" type="text" class="form-input">
          </div>
          <div class="form-group">
            <label>Username *</label>
            <input v-model="newUser.username" type="text" class="form-input">
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input v-model="newUser.email" type="email" class="form-input">
          </div>
          <div class="form-group">
            <label>Role *</label>
            <select v-model="newUser.role" class="form-select">
              <option value="user">Pengguna</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div class="form-group">
            <label>Password *</label>
            <input v-model="newUser.password" type="password" class="form-input">
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showAddUser = false" class="btn-secondary">
            Batal
          </button>
          <button @click="addUser" class="btn-primary" :disabled="!isValidNewUser">
            Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="editingUser" class="modal-backdrop" @click="cancelEdit">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>✏️ Edit Pengguna</h3>
          <button @click="cancelEdit" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Nama Lengkap</label>
            <input v-model="editingUser.name" type="text" class="form-input">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="editingUser.email" type="email" class="form-input">
          </div>
          <div class="form-group">
            <label>Role</label>
            <select v-model="editingUser.role" class="form-select">
              <option value="user">Pengguna</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="editingUser.status" class="form-select">
              <option value="active">Aktif</option>
              <option value="inactive">Non-Aktif</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="cancelEdit" class="btn-secondary">
            Batal
          </button>
          <button @click="saveUser" class="btn-primary">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'AdminUsers',
  setup() {
    // Data
    const users = ref([])
    const loading = ref(false)
    const showAddUser = ref(false)
    const editingUser = ref(null)
    
    // Filters & Search
    const searchQuery = ref('')
    const statusFilter = ref('')
    const roleFilter = ref('')
    
    // Sorting
    const sortBy = ref('joined')
    const sortOrder = ref('desc')
    
    // Selection & Pagination
    const selectedUsers = ref([])
    const selectAll = ref(false)
    const currentPage = ref(1)
    const itemsPerPage = 10

    // New User Form
    const newUser = ref({
      name: '',
      username: '',
      email: '',
      role: 'user',
      password: ''
    })

    // Computed
    const filteredUsers = computed(() => {
      let filtered = users.value

      // Search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(user => 
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query)
        )
      }

      // Status filter
      if (statusFilter.value) {
        filtered = filtered.filter(user => user.status === statusFilter.value)
      }

      // Role filter
      if (roleFilter.value) {
        filtered = filtered.filter(user => user.role === roleFilter.value)
      }

      // Sorting
      filtered.sort((a, b) => {
        let aValue = a[sortBy.value]
        let bValue = b[sortBy.value]

        if (sortBy.value === 'joined') {
          aValue = new Date(aValue)
          bValue = new Date(bValue)
        }

        if (sortOrder.value === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })

      return filtered
    })

    const paginatedUsers = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filteredUsers.value.slice(start, end)
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredUsers.value.length / itemsPerPage)
    })

    const startIndex = computed(() => {
      return (currentPage.value - 1) * itemsPerPage
    })

    const endIndex = computed(() => {
      return Math.min(startIndex.value + itemsPerPage, filteredUsers.value.length)
    })

    const isValidNewUser = computed(() => {
      return newUser.value.name && 
             newUser.value.username && 
             newUser.value.email && 
             newUser.value.password
    })

    // Methods
    const fetchUsers = async () => {
      loading.value = true
      try {
        // Simulasi API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data - hanya user dan admin
        users.value = [
          {
            id: 1,
            name: 'Tyas Cantik',
            username: 'tyascantik',
            email: 'tyascantik@gmail.com',
            role: 'user',
            status: 'active',
            joined: '2024-01-15'
          },
          {
            id: 2,
            name: 'Zalsa Cantik',
            username: 'zalsacantik',
            email: 'zalsacantik@gmail.com',
            role: 'user',
            status: 'active',
            joined: '2024-01-20'
          },
          {
            id: 3,
            name: 'Tiara Beautiful',
            username: 'tiara',
            email: 'tiara@gmail.com',
            role: 'admin',
            status: 'active',
            joined: '2024-02-01'
          },
          {
            id: 4,
            name: 'Chelsea Amazing',
            username: 'chelsea',
            email: 'chelsea@gmail.com',
            role: 'admin',
            status: 'active',
            joined: '2024-02-05'
          },
          {
            id: 5,
            name: 'User Nonaktif',
            username: 'nonaktif',
            email: 'nonaktif@gmail.com',
            role: 'user',
            status: 'inactive',
            joined: '2024-02-10'
          }
        ]
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        loading.value = false
      }
    }

    const refreshUsers = () => {
      currentPage.value = 1
      fetchUsers()
    }

    const sortUsers = (column) => {
      if (sortBy.value === column) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortBy.value = column
        sortOrder.value = 'asc'
      }
    }

    const toggleSelectAll = () => {
      if (selectAll.value) {
        selectedUsers.value = paginatedUsers.value.map(user => user.id)
      } else {
        selectedUsers.value = []
      }
    }

    const clearFilters = () => {
      searchQuery.value = ''
      statusFilter.value = ''
      roleFilter.value = ''
      currentPage.value = 1
    }

    const getUserInitials = (name) => {
      return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }

    // Pagination methods
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const goToPage = (page) => {
      currentPage.value = page
    }

    // User actions
    const addUser = () => {
      const user = {
        id: Date.now(),
        ...newUser.value,
        status: 'active',
        joined: new Date().toISOString().split('T')[0]
      }
      users.value.unshift(user)
      showAddUser.value = false
      resetNewUser()
    }

    const editUser = (user) => {
      editingUser.value = { ...user }
    }

    const saveUser = () => {
      const index = users.value.findIndex(u => u.id === editingUser.value.id)
      if (index !== -1) {
        users.value[index] = { ...editingUser.value }
      }
      editingUser.value = null
    }

    const cancelEdit = () => {
      editingUser.value = null
    }

    const viewUser = (user) => {
      alert(`Detail User:\n\nNama: ${user.name}\nUsername: @${user.username}\nEmail: ${user.email}\nRole: ${user.role === 'admin' ? 'Administrator' : 'Pengguna'}\nStatus: ${user.status === 'active' ? 'Aktif' : 'Non-Aktif'}\nBergabung: ${formatDate(user.joined)}`)
    }

    const toggleUserStatus = (user) => {
      user.status = user.status === 'active' ? 'inactive' : 'active'
    }

    const deleteUser = (user) => {
      if (confirm(`Hapus user ${user.name}?`)) {
        users.value = users.value.filter(u => u.id !== user.id)
        selectedUsers.value = selectedUsers.value.filter(id => id !== user.id)
      }
    }

    // Bulk actions
    const bulkActivate = () => {
      users.value.forEach(user => {
        if (selectedUsers.value.includes(user.id)) {
          user.status = 'active'
        }
      })
      selectedUsers.value = []
    }

    const bulkDeactivate = () => {
      users.value.forEach(user => {
        if (selectedUsers.value.includes(user.id)) {
          user.status = 'inactive'
        }
      })
      selectedUsers.value = []
    }

    const bulkDelete = () => {
      if (confirm(`Hapus ${selectedUsers.value.length} user?`)) {
        users.value = users.value.filter(user => !selectedUsers.value.includes(user.id))
        selectedUsers.value = []
      }
    }

    const exportUsers = () => {
      alert('Fitur export data akan segera hadir!')
    }

    const resetNewUser = () => {
      newUser.value = {
        name: '',
        username: '',
        email: '',
        role: 'user',
        password: ''
      }
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      // Data
      users,
      loading,
      showAddUser,
      editingUser,
      
      // Filters & Search
      searchQuery,
      statusFilter,
      roleFilter,
      
      // Sorting
      sortBy,
      sortOrder,
      
      // Selection & Pagination
      selectedUsers,
      selectAll,
      currentPage,
      
      // Forms
      newUser,
      
      // Computed
      filteredUsers,
      paginatedUsers,
      totalPages,
      startIndex,
      endIndex,
      isValidNewUser,
      
      // Methods
      fetchUsers,
      refreshUsers,
      sortUsers,
      toggleSelectAll,
      clearFilters,
      getUserInitials,
      formatDate,
      nextPage,
      prevPage,
      goToPage,
      addUser,
      editUser,
      saveUser,
      cancelEdit,
      viewUser,
      toggleUserStatus,
      deleteUser,
      bulkActivate,
      bulkDeactivate,
      bulkDelete,
      exportUsers
    }
  }
}
</script>

<style scoped>
/* Previous CSS tetap sama, hanya ubah bagian yang berhubungan dengan role badge dan action buttons */

/* Role badges - hanya 2 role */
.role-badge {
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.role-badge.user {
  background: #e3f2fd;
  color: #1976d2;
}

.role-badge.admin {
  background: #e8f5e8;
  color: #388e3c;
}

/* Action buttons - update class untuk info button */
.btn-action.info:hover {
  background: #9b59b6;
  color: white;
}

/* Sisanya CSS sama seperti sebelumnya */
.admin-users {
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 20px;
  font-family: karla, serif;
}

/* Header */
.page-header {
  background: white;
  padding: 24px 30px;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.header-text h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  color: #2c3e50;
  font-weight: 700;
}

.header-text p {
  margin: 0;
  color: #6c757d;
  font-size: 16px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* Buttons */
.btn-primary {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #2980b9;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

/* Filters */
.filters-section {
  background: white;
  padding: 20px 30px;
  border-bottom: 1px solid #e9ecef;
}

.filters-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
  position: relative;
  z-index: 2;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

.filter-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.filter-select {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
}

.btn-clear {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-clear:hover {
  background: #c0392b;
}

/* Table */
.table-section {
  padding: 20px 30px;
}

.table-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border: 1px solid #e9ecef;
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e9ecef;
}

.table-info {
  color: #6c757d;
  font-size: 14px;
}

.btn-refresh {
  background: #27ae60;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-refresh:hover:not(:disabled) {
  background: #219a52;
}

.btn-refresh:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.table-wrapper {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #ecf0f1;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.users-table td {
  font-size: 14px;
  color: #2c3e50;
}

.users-table tr:hover {
  background: #f8f9fa;
}

.users-table tr.selected {
  background: #e3f2fd;
}

/* Sortable headers */
.sortable {
  cursor: pointer;
  user-select: none;
}

.sort-icon {
  margin-left: 4px;
  font-weight: bold;
}

/* User info */
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.user-name {
  font-weight: 600;
  margin-bottom: 2px;
}

.user-username {
  font-size: 12px;
  color: #6c757d;
}

/* Status badges */
.status-badge {
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.active {
  background: #e8f5e8;
  color: #27ae60;
}

.status-badge.inactive {
  background: #fde8e8;
  color: #e74c3c;
}

/* Action buttons */
.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-action {
  background: none;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-action.edit:hover {
  background: #3498db;
  color: white;
}

.btn-action.info:hover {
  background: #9b59b6;
  color: white;
}

.btn-action.activate:hover {
  background: #27ae60;
  color: white;
}

.btn-action.deactivate:hover {
  background: #f39c12;
  color: white;
}

.btn-action.delete:hover {
  background: #e74c3c;
  color: white;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state h3 {
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.empty-state p {
  margin: 0 0 20px 0;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-top: 1px solid #ecf0f1;
}

.pagination-info {
  color: #6c757d;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn {
  background: white;
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.pagination-btn:disabled {
  background: #f8f9fa;
  color: #bdc3c7;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.page-btn {
  background: white;
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  min-width: 40px;
}

.page-btn:hover {
  background: #f8f9fa;
}

.page-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

/* Bulk actions */
.bulk-actions {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #2c3e50;
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  z-index: 100;
}

.bulk-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.bulk-info {
  font-weight: 600;
}

.bulk-buttons {
  display: flex;
  gap: 8px;
}

.btn-bulk {
  background: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-bulk:hover {
  background: rgba(255,255,255,0.2);
}

.btn-bulk.activate:hover {
  background: #27ae60;
}

.btn-bulk.deactivate:hover {
  background: #f39c12;
}

.btn-bulk.delete:hover {
  background: #e74c3c;
}

/* Modals */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e9ecef;
}

/* Form styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.form-input,
.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    padding: 20px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .filters-section {
    padding: 20px;
  }
  
  .filters-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
  }
  
  .table-section {
    padding: 20px;
  }
  
  .table-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .users-table {
    font-size: 12px;
  }
  
  .users-table th,
  .users-table td {
    padding: 12px 8px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }
  
  .pagination {
    flex-direction: column;
    gap: 16px;
  }
  
  .bulk-actions {
    left: 20px;
    right: 20px;
    transform: none;
  }
  
  .bulk-content {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .header-text h1 {
    font-size: 24px;
  }
  
  .modal {
    width: 95%;
    margin: 20px;
  }
}
</style>