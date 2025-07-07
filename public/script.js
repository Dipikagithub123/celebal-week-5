class CRUDApp {
    constructor() {
        this.items = [];
        this.editingId = null;
        this.init();
    }

    init() {
        this.loadItems();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const form = document.getElementById('item-form');
        const cancelBtn = document.getElementById('cancel-btn');
        const modal = document.getElementById('modal');
        const confirmDeleteBtn = document.getElementById('confirm-delete');
        const cancelDeleteBtn = document.getElementById('cancel-delete');

        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        cancelBtn.addEventListener('click', () => this.cancelEdit());
        confirmDeleteBtn.addEventListener('click', () => this.confirmDelete());
        cancelDeleteBtn.addEventListener('click', () => this.closeModal());
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    async loadItems() {
        const loading = document.getElementById('loading');
        const itemsList = document.getElementById('items-list');

        try {
            loading.style.display = 'block';
            itemsList.style.display = 'none';

            const response = await fetch('/api/items');
            if (!response.ok) throw new Error('Failed to fetch items');
            
            this.items = await response.json();
            this.renderItems();
        } catch (error) {
            console.error('Error loading items:', error);
            this.showError('Failed to load items');
        } finally {
            loading.style.display = 'none';
            itemsList.style.display = 'grid';
        }
    }

    renderItems() {
        const itemsList = document.getElementById('items-list');
        
        if (this.items.length === 0) {
            itemsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <h3>No items found</h3>
                    <p>Add your first item using the form above!</p>
                </div>
            `;
            return;
        }

        itemsList.innerHTML = this.items.map(item => this.createItemCard(item)).join('');
    }

    createItemCard(item) {
        const date = new Date(item.createdAt).toLocaleDateString();
        return `
            <div class="item-card" data-id="${item._id}">
                <div class="item-actions">
                    <button class="action-btn edit-btn" onclick="app.editItem('${item._id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="app.showDeleteModal('${item._id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <h3>${this.escapeHtml(item.name)}</h3>
                <p>${this.escapeHtml(item.description)}</p>
                <p class="price">$${parseFloat(item.price).toFixed(2)}</p>
                <span class="category">${this.escapeHtml(item.category)}</span>
                <p class="date">Created: ${date}</p>
            </div>
        `;
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const itemData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            category: formData.get('category')
        };

        try {
            if (this.editingId) {
                await this.updateItem(this.editingId, itemData);
            } else {
                await this.createItem(itemData);
            }
            
            this.resetForm();
            this.loadItems();
        } catch (error) {
            console.error('Error saving item:', error);
            this.showError('Failed to save item');
        }
    }

    async createItem(itemData) {
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create item');
        }

        this.showSuccess('Item created successfully!');
    }

    async updateItem(id, itemData) {
        const response = await fetch(`/api/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update item');
        }

        this.showSuccess('Item updated successfully!');
    }

    editItem(id) {
        const item = this.items.find(item => item._id === id);
        if (!item) return;

        this.editingId = id;
        this.populateForm(item);
        this.updateFormUI();
    }

    populateForm(item) {
        document.getElementById('name').value = item.name;
        document.getElementById('description').value = item.description;
        document.getElementById('price').value = item.price;
        document.getElementById('category').value = item.category;
    }

    updateFormUI() {
        const formTitle = document.getElementById('form-title');
        const submitBtn = document.getElementById('submit-btn');
        const cancelBtn = document.getElementById('cancel-btn');

        formTitle.textContent = 'Edit Item';
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Item';
        cancelBtn.style.display = 'inline-flex';
    }

    cancelEdit() {
        this.editingId = null;
        this.resetForm();
    }

    resetForm() {
        document.getElementById('item-form').reset();
        document.getElementById('form-title').textContent = 'Add New Item';
        document.getElementById('submit-btn').innerHTML = '<i class="fas fa-plus"></i> Add Item';
        document.getElementById('cancel-btn').style.display = 'none';
    }

    showDeleteModal(id) {
        this.deleteId = id;
        document.getElementById('modal').style.display = 'block';
    }

    closeModal() {
        document.getElementById('modal').style.display = 'none';
        this.deleteId = null;
    }

    async confirmDelete() {
        if (!this.deleteId) return;

        try {
            const response = await fetch(`/api/items/${this.deleteId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to delete item');
            }

            this.showSuccess('Item deleted successfully!');
            this.closeModal();
            this.loadItems();
        } catch (error) {
            console.error('Error deleting item:', error);
            this.showError('Failed to delete item');
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CRUDApp();
}); 