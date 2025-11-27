# Global Search Feature

## 📝 Descripción

Búsqueda global implementada con **MUI** y **Zustand** que permite buscar productos y usuarios en tiempo real desde cualquier parte de la aplicación.

## ✨ Características

- 🔍 **Búsqueda simultánea** en Products y Users
- ⌨️ **Keyboard shortcuts**: `Ctrl+K` (Windows/Linux) o `Cmd+K` (Mac) para abrir
- ⚡ **Performance optimizada** con React Query (cache de 30 segundos)
- 🎨 **Diseño profesional** con MUI components
- 📱 **Responsive**: Botón completo en desktop, ícono en mobile
- 🌓 **Dark mode compatible**
- ⏱️ **Debouncing automático** (mínimo 2 caracteres)

## 🎯 Uso

### Abrir búsqueda:

- Presiona `Ctrl+K` (o `Cmd+K` en Mac)
- O haz click en el botón "Search" en el header

### Buscar:

- Escribe al menos 2 caracteres
- Los resultados aparecen automáticamente
- Se muestran separados por sección (Products / Users)

### Navegar resultados:

- Haz click en cualquier resultado
- Te redirige a la página correspondiente (Products o Users)

### Cerrar:

- Presiona `ESC`
- O haz click fuera del modal

## 🏗️ Arquitectura

### Store (Zustand)

```typescript
// src/stores/globalSearchStore.ts
- isOpen: boolean          // Estado del modal
- searchQuery: string      // Texto de búsqueda
- openSearch()             // Abrir modal
- closeSearch()            // Cerrar y limpiar
- setSearchQuery(query)    // Actualizar búsqueda
```

### Componente Principal

```typescript
// src/components/GlobalSearch.tsx
- Dialog de MUI con TextField
- Lista de resultados con avatares y chips
- Estados: loading, empty, results
- Keyboard shortcuts integrados
```

### Integración

```typescript
// src/components/Header.tsx
- Botón trigger en navbar
- Ícono para mobile
- GlobalSearch dialog renderizado
```

## 🔄 Flujo de datos

1. Usuario abre búsqueda (`Ctrl+K` o click)
2. Zustand actualiza `isOpen = true`
3. Usuario escribe (mínimo 2 caracteres)
4. React Query hace fetch paralelo a:
    - `https://dummyjson.com/products/search?q=...`
    - `https://dummyjson.com/users/search?q=...`
5. Resultados se muestran agrupados
6. Click en resultado → navegación + cierre automático

## 🎨 Customización

### Cambiar límite de resultados:

```typescript
// En GlobalSearch.tsx, línea ~75
;`https://dummyjson.com/products/search?q=${searchQuery}&limit=5`
// Cambia &limit=5 por el número deseado
```

### Agregar más secciones:

```typescript
// En queryFn, agrega más endpoints:
const [productsRes, usersRes, newSectionRes] = await Promise.all([
    // ... existing fetches
    fetch(`https://api.example.com/section?q=${searchQuery}`).then((r) =>
        r.json()
    ),
])
```

### Modificar shortcuts:

```typescript
// En GlobalSearch.tsx, línea ~58
if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    // Cambia 'k' por otra tecla
}
```

## 📊 Performance

- **Cache**: 30 segundos (evita re-fetches innecesarios)
- **Limit**: 5 resultados por sección (rápido y relevante)
- **Lazy loading**: Solo busca cuando hay 2+ caracteres
- **Query cancelation**: Cancela requests anteriores automáticamente

## 🚀 Mejoras futuras

- [ ] Navegación con flechas del teclado
- [ ] Historial de búsquedas recientes
- [ ] Filtros adicionales (fecha, categoría, etc.)
- [ ] Highlight de términos buscados en resultados
- [ ] Analytics de búsquedas populares
- [ ] Búsqueda por voz
- [ ] Autocompletado inteligente

## 🐛 Troubleshooting

**La búsqueda no abre con Ctrl+K:**

- Verifica que no haya otro shortcut conflictivo en tu navegador
- Prueba con Cmd+K en Mac

**No aparecen resultados:**

- Verifica la conexión a internet
- Revisa la consola por errores de CORS
- Confirma que DummyJSON API esté funcionando

**El modal no cierra con ESC:**

- Verifica que el focus esté dentro del Dialog
- Revisa que no haya otros event listeners de ESC
