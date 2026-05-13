# Palvi Metrics Dashboard - Technical Challenge

Dashboard ejecutivo diseñado para el Jefe de Ventas de Palvi, enfocado en la toma de decisiones rápida (regla de los 5 minutos).

## 🚀 Decisiones Técnicas

- **Next.js 15 (App Router):** Elegido por su manejo eficiente de rutas y optimización de renderizado (SSR para la carga inicial de datos).
- **Ant Design (v5):** Implementado para lograr una interfaz consistente, profesional y "Enterprise-ready" en tiempo récord. Se utilizaron componentes como `Statistic` con lógica semántica de colores basada en la propiedad `direction` del JSON.
- **Recharts:** Seleccionada por su capacidad de manejar datos temporales y renderizado fluido, permitiendo visualizar la tendencia de los últimos 30 días para dar contexto histórico a la métrica diaria.
- **Custom Hook `useMetrics`:** Centralicé la lógica de negocio (cálculo de variaciones diarias, manejo de `nulls` y asignación de estados de éxito/error) fuera de los componentes. Esto facilita el testeo y mantiene la UI "limpia".
- **Arquitectura Defensiva:** El sistema maneja estados de carga y previene errores de ejecución si los datos (`metrics.json`) vienen incompletos o nulos.

## 🛠️ Segunda Iteración (Próximos Pasos)

Si tuviera más tiempo, implementaría:
1. **Filtros Temporales Dinámicos:** Permitir al usuario cambiar entre vista semanal, mensual o trimestral, en lugar de solo comparar contra el día anterior.
2. **Sistema de Alertas Inteligente:** Un motor que resalte automáticamente las 3 métricas que más requieren atención (foco) basándose en desviaciones estándar o metas (KPIs).
3. **Persistencia de Preferencias:** Guardar el dataset seleccionado (A, B, C o D) en `localStorage` o URL params para que el usuario mantenga su contexto al refrescar.
4. **Unit Testing:** Implementar Jest/React Testing Library especialmente para la lógica del hook `useMetrics`, asegurando que los cálculos de tendencia sean siempre exactos.

## 📦 Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Ejecutar en desarrollo: `npm run dev`
4. Abrir [http://localhost:3000](http://localhost:3000)