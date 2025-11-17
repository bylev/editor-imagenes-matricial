# 📘 Fundamentos de Álgebra - Práctica 1

## 👨‍💻 Información del Estudiante

- **Nombre:** Michelle Cámara González
- **Matrícula:** SW2509008
- **Grupo:** [C]
- **Cuatrimestre:** Primer Cuatrimestre
- **Carrera:** TSU en Desarrollo e Innovación de Software
- **Profesor:** Jorge Javier Pedrozo Romero

---

## 📋 Descripción del Proyecto

Este repositorio contiene mi solución a la práctica de **Fundamentos de Álgebra**, donde implemento funciones para manipular imágenes representadas como matrices de píxeles en JavaScript. La práctica abarca desde operaciones básicas como ajuste de brillo e inversión de colores, hasta transformaciones geométricas y filtros avanzados como sepia y detección de bordes.

## 🎯 Objetivos Alcanzados

- ✅ Dominar variables y tipos de datos en JavaScript
- ✅ Implementar estructuras condicionales
- ✅ Utilizar bucles y funciones
- ✅ Manipular arrays unidimensionales
- ✅ Trabajar ccon imagenes y arrays (matrices)
- ✅ Aplicar control de versiones con Git y GitHub

---

## 📊 Progreso de Ejercicios

### Sección 1: Fundamentos - Conversión Imagen ↔ Matriz (20 pts)
- [x] 1.1 imagenAMatriz - Cargar imagen pequeña (5 pts) ✅
- [x] 1.2 matrizAImagen - Guardar matriz como PNG (5 pts) ✅
- [x] 1.3 obtenerCanal - Extraer canal rojo (5 pts) ✅
- [x] 1.4 obtenerDimensionesImagen - Leer dimensiones (5 pts) ✅

**Puntos obtenidos: 20/20**

### Sección 2: Operaciones Básicas (25 pts)
- [x] 2.1 ajustarBrillo - Aumentar brillo (8 pts) ✅
- [x] 2.2 invertirColores - Negativo de imagen (8 pts) ✅
- [x] 2.3 convertirEscalaGrises - Blanco y negro (9 pts) ✅

**Puntos obtenidos: 25/25**

### Sección 3: Transformaciones Geométricas (30 pts)
- [x] 3.1 voltearHorizontal - Efecto espejo (10 pts) ✅
- [x] 3.2 voltearVertical - Arriba-abajo (10 pts) ✅
- [x] 3.3 rotar90Grados - Rotación horaria (10 pts) ✅

**Puntos obtenidos: 30/30**

### Sección 4: Filtros Avanzados (25 pts)
- [x] 4.1 mezclarImagenes - Blend de dos imágenes (8 pts) ✅
- [x] 4.2 aplicarSepia - Efecto vintage (9 pts) ✅
- [x] 4.3 detectarBordes - Detección simple (8 pts) ✅

**Puntos obtenidos: 25/25**

---

## 📈 Calificación Final

```
┌────────────────────────────────────────┐
│  REPORTE DE CALIFICACIÓN               │
├────────────────────────────────────────┤
│  Puntos obtenidos: 100/100             │
│  Porcentaje: 100%                      │
│  🎓 Calificación: A - Excelente        │
└────────────────────────────────────────┘
```

![Tests](https://github.com/bylev/editor-imagenes-matricial/actions/workflows/test.yml/badge.svg)

---

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- Git

### Clonar el repositorio
```bash
git clone https://github.com/TU-USUARIO/fundamentos-programacion-practica-1.git
cd fundamentos-programacion-practica-1
```

### Instalar dependencias
```bash
npm install
```

### Ejecutar tests
```bash
npm test
```

### Ejecutar tests en modo watch
```bash
npm run test:watch
```

### Ver cobertura de código
```bash
npm run test:coverage
```

---

## 📁 Estructura del Proyecto

```
editor-imagenes-matriz/
├── src/
│   ├── ejercicios.js         # ⭐ Archivo principal con mis soluciones
│   ├── ejercicios.test.js    # Tests automatizados (no modificar)
│   ├── matriz.js             # Funciones para convertir imagen ↔ matriz de píxeles
│   └── utilidades.js         # Funciones auxiliares (helpers)
│
├── imagenes/                 # Imágenes de entrada/salida para las pruebas
│   └── ...                   # (archivos .png, etc.)
│
├── web/                      # Archivos para la versión web (si la piden)
│   └── ...                   
│
├── .github/
│   └── workflows/
│       └── test.yml          # Configuración de GitHub Actions para correr los tests
│
├── generar-imagenes-prueba.js # Script para generar imágenes de prueba
├── package.json              # Configuración del proyecto (dependencias, scripts)
├── package-lock.json         # Versión exacta de dependencias (generado por npm)
├── .gitignore                # Archivos/carpetas que Git debe ignorar
└── README.md                 # Descripción general de la práctica

```

---

## 💡 Aprendizajes Clave

### Lo que más me costó
- **Ejercicio 4.2(Filtro Sepia)**: Me costó entender cómo manipular los valores RGB para aplicar el filtro sepia correctamente. Tuve que investigar la fórmula adecuada y asegurarme de que los valores no excedieran el rango permitido (0-255). Además, implementar la lógica dentro de bucles anidados para recorrer la matriz de píxeles fue un desafío inicial.
- **Ejercicio 4.3(Detección de Bordes)**: La lógica para comparar los valores de los píxeles con sus vecinos y aplicar un umbral para detectar bordes fue compleja. Me llevó tiempo entender cómo manejar los bordes de la imagen y asegurarme de que no se produjeran errores al acceder a píxeles fuera de los límites de la matriz.

### Lo que más me gustó
- **Ejercicio 4.1 (Invertir Colores)**: Me gustó porque es una función que manipula matrices y colores, lo que es fundamental en el procesamiento de imágenes. Además, me permitió practicar el uso de bucles anidados y la creación de nuevos objetos dentro de una estructura de datos compleja.

### Técnicas aplicadas
- Uso de `for` loops para iteraciones
- Operador módulo `%` para determinar paridad
- Arrays dinámicos con `.push()`
- Bucles anidados para matrices.
- Uso de `if` para evaluaciones.
- Uso de método `.reverse()` para obtener el arreglo invertido.
- Uso de método `.map()` para obtener matriz transpuesta.

---

## 🔧 Ejemplos de Código

### Función favorita: Crear una matriz
```javascript 
function invertirColores(matriz) {
  // TODO: Implementar inversión de colores
  
  //Crea matriz vacía
  const matrizInvertida  = [];

  // Recorre cada fila de la matriz.
  for(let y = 0; y < matriz.length; y++){
    const filaOriginal = matriz[y];
    const filaInvertida =[];

    // Recorre cada pixel de la fila.
    for(let x=0; x< filaOriginal.length; x++){
      const pixel = filaOriginal[x];

      //Crea un nuevo pixel con los colores invertidos.
      const pixelInvertido = {
        r: 255 - pixel.r,
        g: 255 - pixel.g, 
        b: 255 - pixel.b,
        a: pixel.a
      };
      filaInvertida.push(pixelInvertido);
    }
    matrizInvertida.push(filaInvertida);
  }
  //Devuelve la matriz con los colores invertidos.
  return matrizInvertida; 
}

```

**Por qué me gusta:** Me gusta porque es una función que manipula matrices y colores, lo que es fundamental en el procesamiento de imágenes. Además, me permitió practicar el uso de bucles anidados y la creación de nuevos objetos dentro de una estructura de datos compleja.

---

## 📚 Recursos Utilizados

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [JavaScript.info](https://es.javascript.info/)
- [Stack Overflow](https://stackoverflow.com)
- [W3 Schools](https://www.w3schools.com/js/)
- [¿Qué es el map en JavaScript?](https://www.youtube.com/watch?v=33-JeJewSCc)
- Guía del estudiante incluida en el repositorio

---

## 🎯 Próximos Pasos

Este proyecto me prepara para:
-   ✨ Operaciones matriciales avanzadas (multiplicación, determinantes)
-   🖼️ Desarrollo de editores de imágenes
-   🔐 Implementación de algoritmos de encriptación
-   📊 Creación de calculadoras científicas

---

## 📝 Historial de Commits

```bash
# Ver mi historial completo
git log --oneline --graph --decorate
```

**Commits destacados:**
- feat: Ejercicio 4.3 resuelto
- feat: Ejercicio 4.2 resuelto
- feat: Ejercicio 4.1 resuelto
- feat: Ejercicio 3.3 resuelto
- feat: Ejercicio 3.2 resuelto
- feat: Ejercicio 3.1 resuelto
- feat: Ejercicio 3.1 resuelto
- feat: Ejercicio 2.3 resuelto
- feat: Ejercicio 2.2 resuelto
- feat: Ejercicio 2.1 resuelto
- feat: Ejercicio 1.4 resuelto
- feat: Ejercicio 1.3 resuelto
- feat: Ejercicio 1.2 resuelto
- feat: Ejercicio 1.1 resuelto

---

## 🤝 Agradecimientos

- **Profesor Jorge Javier Pedrozo Romero** por retarnos a nosotros mismos y ayudarnos con las herramientas que nos servirán para nuestro desarrollo laboral.
- **Compañeros del Grupo [C]** por ser un grupo que se destaca en hacer reír, por pedir ayuda cuando lo necesitan.
- **Tecnológico de Software** por los maestros y su plan de estudios que me ayuda a crecer.

---

## 📧 Contacto

- **Email Institucional:** [michelle.camara@tecdesoftware.edu.mx]
- **GitHub:** [@bylev](https://github.com/bylev)

---

## 📄 Licencia

Este proyecto es parte de las actividades académicas del **Tecnológico de Software** y está bajo la licencia MIT.

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella ⭐**

Hecho con 💙 por Michelle Cámara González - 2025

</div>
