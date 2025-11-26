# 🚀 Guía de Despliegue para GitHub Pages

## ✅ Configuración Completada

Este proyecto está completamente configurado para desplegarse automáticamente en GitHub Pages.

## Pasos para Desplegar

### 1. Preparar el Repositorio

1. **Asegúrate de que tu repositorio se llame:** `Omega-Visual-Web`
   - Si tiene otro nombre, actualiza `basePath` en `next.config.js`

2. **Haz push de todos los archivos a GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit - Omega Visual Landing Page"
   git push origin main
   ```

### 2. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Pages**
3. En **Source**, selecciona **"GitHub Actions"** (NO "Deploy from a branch")
4. Guarda los cambios

### 3. Verificar el Despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Deberías ver el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera a que termine (toma ~2-3 minutos)
4. Una vez completado, tu sitio estará disponible en:
   ```
   https://[tu-usuario].github.io/Omega-Visual-Web/
   ```

## 🔧 Configuración Técnica

### Variables de Entorno

El build detecta automáticamente si está en GitHub Pages usando:
- `NODE_ENV=production`
- `GITHUB_ACTIONS=true`

### Estructura de Archivos

- **Build output:** `out/` (configurado en `next.config.js`)
- **Base path:** `/Omega-Visual-Web` (para GitHub Pages)
- **Trailing slash:** Habilitado para mejor compatibilidad

## 🐛 Solución de Problemas

### Error: "Page not found" o rutas rotas

**Solución:** Verifica que el `basePath` en `next.config.js` coincida exactamente con el nombre de tu repositorio (case-sensitive).

### Error: "Build failed"

**Solución:**
1. Revisa los logs en Actions → Deploy to GitHub Pages
2. Verifica que todas las dependencias estén en `package.json`
3. Asegúrate de que no haya errores de TypeScript (`npm run build` localmente)

### Error: "Workflow not running"

**Solución:**
1. Verifica que el archivo `.github/workflows/deploy.yml` exista
2. Asegúrate de que la rama se llame `main` o `master`
3. Verifica que GitHub Pages esté habilitado en Settings → Pages

### Las imágenes no cargan

**Solución:** Las imágenes están configuradas como `unoptimized: true` para GitHub Pages. Esto es normal y necesario.

## 📝 Notas Importantes

- ✅ El proyecto usa `output: 'export'` para generar archivos estáticos
- ✅ Las imágenes están configuradas como `unoptimized: true` para GitHub Pages
- ✅ El workflow de GitHub Actions maneja el despliegue automático
- ✅ El idioma se guarda en `localStorage` del navegador
- ✅ El sitio se actualiza automáticamente en cada push a `main`

## 🔄 Actualizar el Sitio

Cada vez que hagas push a la rama `main`, el sitio se actualizará automáticamente:

```bash
git add .
git commit -m "Update content"
git push origin main
```

El workflow se ejecutará automáticamente y desplegará los cambios en ~2-3 minutos.

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs en GitHub Actions
2. Verifica la configuración en `next.config.js`
3. Prueba el build localmente: `npm run build`

---

**Autor:** Eddi Andreé Salazar Matos  
**Copyright:** © 2024-2025 Eddi Andreé Salazar Matos. All rights reserved.
