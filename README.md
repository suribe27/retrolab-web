# RetroLab · Frontend

El sitio de **RetroLab** de la Entrega 1 (tienda de camisetas retro de fútbol), reconstruido en **Next.js (App Router) + TypeScript + Tailwind**. El catálogo, el formulario y las cuentas de usuario se conectan con la API propia.

- **Sitio en Vercel:** https://retrolab-web.vercel.app
- **API en producción:** https://retrolab-api.onrender.com
- **Repositorio del backend:** https://github.com/suribe27/retrolab-api

## Qué tiene

- Inicio con hero, Sobre RetroLab, testimonios y el formulario "¿No encontraste tu camiseta?", que ahora crea una **solicitud** en la API (requiere sesión).
- Catálogo cargado desde la API, con paginación por URL (`?page=2`), filtros combinados (categoría, texto y rango de precio) y estados de cargando, vacío y error.
- Registro e inicio de sesión con validación y errores junto a cada campo.
- Sesión persistente al refrescar; la barra de navegación cambia según la sesión y el rol.
- `/mis-solicitudes`: solo con sesión.
- `/admin`: solo rol admin. CRUD del catálogo (con confirmación antes de eliminar) y listado de todas las solicitudes.
- Página 404 propia.

## Estructura

```
app/                       rutas (page.tsx solo componen)
proxy.ts                   protección de rutas en el servidor (lee el token de la cookie)
src/features/
├── common/                config.ts · http.ts · session.ts · components/ (Navbar, Pagination, Button, Field…) · hooks/
├── auth/                  domain/ · services/ · hooks/useAuth · components/ (LoginForm, RegisterForm, RouteGuards)
├── camisetas/             domain/ · services/ · hooks/ · components/ (CamisetaCard, CatalogoView, CamisetaForm…)
├── solicitudes/           domain/ · services/ · hooks/ · components/ (SolicitudForm, SolicitudesList…)
├── home/                  secciones del inicio
└── admin/                 panel de administración
```

Ningún componente llama a `fetch`: los componentes usan hooks, los hooks usan services y los services usan `http.ts`.

## Correr en local

Requisitos: Node 20+ y la API corriendo (ver el repositorio del backend).

```bash
npm install
cp .env.example .env.local     # NEXT_PUBLIC_API_HOST=http://localhost:3000
npm run dev                    # http://localhost:3001
```

### Variables de entorno

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_API_HOST` | URL de la API, sin `/api` al final |

## Credenciales de prueba

Creadas por el seed del backend (solo para el ambiente de la entrega):

| Rol | Email | Contraseña |
|---|---|---|
| admin | `admin@retrolab.com` | `Admin123*` |
| user | `user@retrolab.com` | `User123*` |

## Decisiones técnicas

> ✍️ Esta sección la escribo con mis propias palabras.

### Flujo completo de un login

_(Desde que envías el formulario hasta que una ruta protegida responde.)_

### ¿Dónde guardo el token y qué riesgo tiene?

_(…)_

### ¿Cuándo responde la API 401 y cuándo 403?

_(Ejemplo real del proyecto.)_

### Uso de IA

_(Para qué la usé y qué tuve que corregir.)_

## Captura de Network

_(Captura de una petición protegida mostrando el header `Authorization: Bearer ...`)_
