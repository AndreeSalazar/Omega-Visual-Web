# Images Folder

Esta carpeta contiene las imágenes del proyecto Omega-Visual.

## Uso

Coloca tus imágenes aquí y referencia desde los componentes usando:

```typescript
import { getAssetPath } from '@/lib/utils'

// En tu componente
<img src={getAssetPath('images/tu-imagen.png')} alt="Descripción" />
```

O directamente:

```typescript
<img src="/images/tu-imagen.png" alt="Descripción" />
```

## Estructura recomendada

- `screenshots/` - Capturas de pantalla de la aplicación
- `icons/` - Iconos personalizados
- `logos/` - Logos y marcas
- `diagrams/` - Diagramas y gráficos

