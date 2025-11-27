# Modal CRUD System Implementation

## Overview

Full CRUD (Create, Read, Update, Delete) system for products using modals with optimistic UI updates.

## Architecture

### State Management

- **productModalStore** (`src/stores/productModalStore.ts`)
    - Controls product form modal (create/edit modes)
    - `openCreateModal()` - Opens empty form
    - `openEditModal(product)` - Opens form with product data
    - `closeModal()` - Closes form

- **deleteDialogStore** (exported from `productModalStore.ts`)
    - Controls delete confirmation dialog
    - `openDeleteDialog({id, title})` - Opens confirmation
    - `closeDialog()` - Closes confirmation

### Components

1. **ProductModal** (`src/components/ProductModal.tsx`)
    - Form modal for creating/editing products
    - Fields: title, price, category, stock
    - Validation: Required fields, min values
    - Emits `productSubmit` custom event with `{data, mode}`

2. **DeleteConfirmDialog** (`src/components/DeleteConfirmDialog.tsx`)
    - Confirmation dialog for deleting products
    - Shows warning alert with product title
    - Emits `productDelete` custom event with `{id}`

### Business Logic

- **useProductMutations** (`src/hooks/useProductMutations.ts`)
    - React Query mutations for create/update/delete
    - **Optimistic UI**: Immediate updates before API confirmation
    - **Rollback**: Reverts changes if API fails
    - **Notifications**: Shows success/error/info toasts via `notificationStore`
    - Pattern:
        - `onMutate`: Update cache optimistically
        - `onError`: Rollback cache, show error
        - `onSuccess`: Show success message
        - `onSettled`: Invalidate queries to refetch

## Integration Points

### Products Page (`src/pages/products/Products.tsx`)

- Renders `<ProductModal />` and `<DeleteConfirmDialog />`
- Listens to custom events:
    ```tsx
    useEffect(() => {
        const handleSubmit = (e: Event) => {
            const { data, mode } = (e as CustomEvent).detail
            if (mode === 'create') createMutation.mutate(data)
            else if (mode === 'edit') updateMutation.mutate(data)
        }
        window.addEventListener('productSubmit', handleSubmit)
        return () => window.removeEventListener('productSubmit', handleSubmit)
    }, [])
    ```

### Desktop Table (`src/pages/products/components/productsTable/TableDesktop.tsx`)

- Edit button: `onClick={() => openEditModal(product)}`
- Delete button: `onClick={() => openDeleteDialog({id, title})}`

### Mobile Cards (`src/pages/products/components/productsTable/ProductCard.tsx`)

- Edit button: `onClick={() => openEditModal(product)}`
- Delete button: `onClick={() => openDeleteDialog({id, title})}`

### Add Product Button (`src/pages/products/components/AddProductButton.tsx`)

- Opens create modal: `onClick={() => openCreateModal()}`

## User Flow

### Create Product

1. User clicks "Add Product" button
2. `openCreateModal()` called → `ProductModal` opens in create mode
3. User fills form and clicks "Create"
4. Form emits `productSubmit` event with data
5. `createMutation.mutate(data)` called
6. **Optimistic**: Product added to list immediately
7. API call to DummyJSON (simulated success)
8. Success notification shown
9. Modal closes automatically

### Edit Product

1. User clicks Edit icon on product
2. `openEditModal(product)` called → `ProductModal` opens with data
3. User modifies form and clicks "Update"
4. Form emits `productSubmit` event with updated data
5. `updateMutation.mutate(data)` called
6. **Optimistic**: Product updated in list immediately
7. API call to DummyJSON (simulated success)
8. Success notification shown
9. Modal closes automatically

### Delete Product

1. User clicks Delete icon on product
2. `openDeleteDialog({id, title})` called → Confirmation dialog opens
3. User clicks "Delete" to confirm
4. Dialog emits `productDelete` event with id
5. `deleteMutation.mutate(id)` called
6. **Optimistic**: Product removed from list immediately
7. API call to DummyJSON (simulated success)
8. Info notification shown ("Product removed (simulated)")
9. Dialog closes automatically

## Optimistic UI Pattern

```tsx
// 1. Save current state
onMutate: async (newProduct) => {
    await queryClient.cancelQueries({ queryKey: ['products'] })
    const previousProducts = queryClient.getQueryData(['products'])

    // 2. Update cache immediately
    queryClient.setQueryData(['products'], (old) => ({
        ...old,
        products: [...old.products, newProduct],
    }))

    return { previousProducts } // Save for rollback
}

// 3. Rollback on error
onError: (err, newProduct, context) => {
    queryClient.setQueryData(['products'], context.previousProducts)
    notificationStore.show('Error creating product', 'error')
}

// 4. Confirm success
onSuccess: () => {
    notificationStore.show('Product created successfully', 'success')
}

// 5. Always refetch to sync with server
onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
}
```

## Key Features

- ✅ Create new products with validation
- ✅ Edit existing products
- ✅ Delete products with confirmation
- ✅ Optimistic UI updates (instant feedback)
- ✅ Automatic rollback on errors
- ✅ Form validation (required fields, min values)
- ✅ Toast notifications (success/error/info)
- ✅ Works on desktop and mobile views
- ✅ Keyboard support (Escape to close)
- ✅ Accessible dialogs with proper ARIA labels

## Technical Notes

### DummyJSON API Behavior

- **POST/PUT/DELETE**: Return success but don't persist changes
- **Why optimistic UI**: Provides realistic UX even with non-persistent API
- **Info notification on delete**: Indicates simulated operation

### Event-Driven Communication

- **Why custom events**: Decouples modals from parent component
- **Alternative**: Could use callback props, but events provide more flexibility
- **Type safety**: TypeScript interfaces for event detail payloads

### React Query Configuration

- **Stale time**: 5 minutes (reduces refetches)
- **Cache time**: 10 minutes (keeps old data longer)
- **Retry**: 1 attempt on failure
- **Refetch on window focus**: Disabled (prevents unnecessary calls)

## Testing Checklist

- [ ] Create product → Shows in table/cards immediately
- [ ] Edit product → Updates reflect instantly
- [ ] Delete product → Removes from list instantly
- [ ] Form validation → Shows errors for invalid data
- [ ] Cancel buttons → Close modals without changes
- [ ] Escape key → Closes modals
- [ ] Mobile view → All actions work on cards
- [ ] Desktop view → All actions work in table
- [ ] Error handling → Shows error notification if API fails
- [ ] Notifications → Success/error/info toasts display correctly
