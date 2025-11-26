# 🚀 Guía de Despliegue para GitHub Pages

## Configuración para GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages usando GitHub Actions.

### Pasos para Desplegar

1. **Habilita GitHub Pages en tu repositorio:**
   - Ve a Settings → Pages
   - En "Source", selecciona "GitHub Actions"

2. **El workflow se ejecutará automáticamente:**
   - Cada push a `main` desplegará automáticamente
   - El workflow está en `.github/workflows/deploy.yml`

3. **URL de tu sitio:**
   - `https://[tu-usuario].github.io/Omega-Visual-Web/`

### Configuración Manual (si es necesario)

Si necesitas cambiar el nombre del repositorio, actualiza `next.config.js`:

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/NUEVO-NOMBRE' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/NUEVO-NOMBRE' : '',
```

### Build Local

Para probar el build localmente:

```bash
npm run build
```

Los archivos estáticos se generarán en la carpeta `out/`.

### Notas Importantes

- ✅ El proyecto usa `output: 'export'` para generar archivos estáticos
- ✅ Las imágenes están configuradas como `unoptimized: true` para GitHub Pages
- ✅ El workflow de GitHub Actions maneja el despliegue automático
- ✅ El idioma se guarda en `localStorage` del navegador

### Troubleshooting

**Problema: Las rutas no funcionan**
- Asegúrate de que `basePath` en `next.config.js` coincida con el nombre de tu repositorio

**Problema: Las imágenes no cargan**
- Verifica que `assetPrefix` esté configurado correctamente

**Problema: El workflow falla**
- Revisa los logs en Actions → Deploy to GitHub Pages
- Asegúrate de que GitHub Pages esté habilitado en Settings

---

**Autor:** Eddi Andreé Salazar Matos  
**Copyright:** © 2024-2025 Eddi Andreé Salazar Matos. All rights reserved.

