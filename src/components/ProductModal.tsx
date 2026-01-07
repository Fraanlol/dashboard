import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    Box,
    IconButton,
    Typography,
    InputAdornment,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {
    useProductModalStore,
    ProductFormData,
} from '@stores/productModalStore'

export default function ProductModal() {
    const isOpen = useProductModalStore((state) => state.isOpen)
    const mode = useProductModalStore((state) => state.mode)
    const selectedProduct = useProductModalStore(
        (state) => state.selectedProduct
    )
    const closeModal = useProductModalStore((state) => state.closeModal)

    const [formData, setFormData] = useState<ProductFormData>({
        title: '',
        description: '',
        price: 0,
        category: '',
        brand: '',
        stock: 0,
        thumbnail: '',
    })

    const [errors, setErrors] = useState<
        Partial<Record<keyof ProductFormData, string>>
    >({})

    useEffect(() => {
        if (mode === 'edit' && selectedProduct) {
            setFormData(selectedProduct)
        } else if (mode === 'create') {
            setFormData({
                title: '',
                description: '',
                price: 0,
                category: '',
                brand: '',
                stock: 0,
                thumbnail: '',
            })
        }
        setErrors({})
    }, [mode, selectedProduct, isOpen])

    const handleChange =
        (field: keyof ProductFormData) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setFormData((prev) => ({
                ...prev,
                [field]:
                    field === 'price' || field === 'stock'
                        ? parseFloat(value) || 0
                        : value,
            }))
            if (errors[field]) {
                setErrors((prev) => ({ ...prev, [field]: undefined }))
            }
        }

    const onSubmit = useProductModalStore((state) => state.onSubmit)

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof ProductFormData, string>> = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required'
        }
        if (formData.price <= 0) {
            newErrors.price = 'Price must be greater than 0'
        }
        if (!formData.category.trim()) {
            newErrors.category = 'Category is required'
        }
        if (formData.stock < 0) {
            newErrors.stock = 'Stock cannot be negative'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validate()) return

        if (onSubmit && mode) {
            onSubmit(formData, mode)
        }
        closeModal()
    }

    const handleClose = () => {
        closeModal()
        setErrors({})
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                    },
                },
            }}
        >
            <DialogTitle>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6" fontWeight={600}>
                        {mode === 'create' ? 'Add New Product' : 'Edit Product'}
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        sx={{
                            color: 'text.secondary',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2}>
                    {/* Title */}
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Product Title"
                            value={formData.title}
                            onChange={handleChange('title')}
                            error={!!errors.title}
                            helperText={errors.title}
                            required
                            autoFocus
                        />
                    </Grid>

                    {/* Description */}
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            value={formData.description}
                            onChange={handleChange('description')}
                            multiline
                            rows={3}
                        />
                    </Grid>

                    {/* Price & Stock */}
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange('price')}
                            error={!!errors.price}
                            helperText={errors.price}
                            required
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            fullWidth
                            label="Stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange('stock')}
                            error={!!errors.stock}
                            helperText={errors.stock}
                            required
                        />
                    </Grid>

                    {/* Category & Brand */}
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            label="Category"
                            value={formData.category}
                            onChange={handleChange('category')}
                            error={!!errors.category}
                            helperText={errors.category}
                            required
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            fullWidth
                            label="Brand"
                            value={formData.brand}
                            onChange={handleChange('brand')}
                        />
                    </Grid>

                    {/* Thumbnail URL */}
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Image URL"
                            value={formData.thumbnail}
                            onChange={handleChange('thumbnail')}
                            placeholder="https://example.com/image.jpg"
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={handleClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    {mode === 'create' ? 'Create Product' : 'Save Changes'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
