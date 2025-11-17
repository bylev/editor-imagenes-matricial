// ============================================
// EDITOR DE IMÁGENES CON ÁLGEBRA MATRICIAL
// ============================================
// Nombre del estudiante: _________________
// Fecha: _________________
// Grupo: _________________

const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

// Importar funciones auxiliares (puedes usarlas)
const {
  crearMatrizVacia,
  validarMatriz,
  obtenerDimensiones,
  limitarValorColor,
  crearPixel,
  copiarMatriz,
  asegurarDirectorio
} = require('./utilidades');

// Importar operaciones matriciales (puedes usarlas)
const {
  sumarMatrices,
  restarMatrices,
  multiplicarPorEscalar,
  multiplicarMatrices,
  transponerMatriz
} = require('./matriz');

// ============================================
// SECCIÓN 1: FUNDAMENTOS (20 puntos)
// Conversión entre imágenes y matrices
// ============================================

/**
 * Ejercicio 1.1: Cargar imagen PNG y convertir a matriz de píxeles (5 puntos)
 * 
 * Una imagen es una matriz donde cada elemento es un pixel con valores RGBA.
 * Debes leer el archivo PNG y crear una matriz donde:
 * - Cada fila representa una fila de píxeles de la imagen
 * - Cada elemento es un objeto: {r: 0-255, g: 0-255, b: 0-255, a: 0-255}
 * 
 * @param {string} rutaImagen - Ruta del archivo PNG
 * @returns {Array<Array<Object>>} - Matriz de píxeles
 * 
 * Pistas:
 * - Usa PNG.sync.read() para leer la imagen
 * - png.width y png.height te dan las dimensiones
 * - png.data es un Buffer con formato [R,G,B,A, R,G,B,A, ...]
 * - El índice en el buffer para el pixel (x,y) es: idx = (width * y + x) * 4
 * 
 * @example
 * const matriz = imagenAMatriz('imagenes/entrada/test_pequeña.png');
 * // matriz[0][0] = {r: 0, g: 0, b: 128, a: 255}
 */
function imagenAMatriz(rutaImagen) {
  // TODO: Implementar la conversión de PNG a matriz
  
  // Lee la imagen PNG
  const buffer = fs.readFileSync(rutaImagen);
  const png = PNG.sync.read(buffer);
  
  // Crea la matriz vacía
  const matriz = [];
  
  // Recorre cada pixel y llena la matriz
  for (let y = 0; y < png.height; y++) {
    const fila = [];
    for (let x = 0; x < png.width; x++) {
      // Calcula el índice en el buffer
      const idx = (png.width * y + x) << 2; // equivalente a *4
      
      // Crea el objeto pixel {r,g,b,a}
      const pixel = {
        r: png.data[idx],
        g: png.data[idx + 1],
        b: png.data[idx + 2],
        a: png.data[idx + 3]
      };
      
      fila.push(pixel);
    }
    matriz.push(fila);
  }
  
  // Devuelve la matriz resultante
  return matriz;
}

/**
 * Ejercicio 1.2: Convertir matriz de píxeles a imagen PNG (5 puntos)
 * 
 * Proceso inverso: tomar una matriz de píxeles y guardarla como PNG.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles {r,g,b,a}
 * @param {string} rutaSalida - Ruta donde guardar el PNG
 * 
 * Pistas:
 * - Usa new PNG({width, height}) para crear la imagen
 * - Recorre la matriz y llena png.data con los valores
 * - Usa PNG.sync.write(png) para generar el buffer
 * - Usa fs.writeFileSync() para guardar el archivo
 * 
 * @example
 * const matriz = imagenAMatriz('entrada.png');
 * matrizAImagen(matriz, 'imagenes/salida/copia.png');
 */
function matrizAImagen(matriz, rutaSalida) {
  // TODO: Implementar la conversión de matriz a PNG
  
  // Dimensiones de la matriz 
  const alto = matriz.length;
  const ancho = matriz[0].length;

// Crea la imagen PNG, rellena los datos y guarda el archivo
  const png = new PNG({ width: ancho, height: alto });
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const idx = (png.width * y + x) << 2; // equivalente a *4
      const pixel = matriz[y][x];
      png.data[idx] = pixel.r;
      png.data[idx + 1] = pixel.g;
      png.data[idx + 2] = pixel.b;
      png.data[idx + 3] = pixel.a;
    }
  }

  // Genera el buffer y guarda el archivo
  const buffer = PNG.sync.write(png);
  asegurarDirectorio(path.dirname(rutaSalida));
  fs.writeFileSync(rutaSalida, buffer);

}
/**
 * Ejercicio 1.3: Obtener un canal específico de color (5 puntos)
 * 
 * Extrae solo un canal (R, G, o B) de la imagen y crea una imagen en escala de grises
 * donde ese canal es el valor de gris.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @param {string} canal - 'r', 'g', o 'b'
 * @returns {Array<Array<Object>>} - Matriz con solo ese canal
 * 
 * @example
 * const matriz = imagenAMatriz('imagen.png');
 * const soloRojo = obtenerCanal(matriz, 'r');
 * // Si un pixel era {r:200, g:100, b:50, a:255}
 * // Ahora será {r:200, g:200, b:200, a:255} (gris)
 */
function obtenerCanal(matriz, canal) {
  // TODO: Implementar extracción de canal
  
 
// Crea una nueva matriz para el canal
  const resultado = crearMatrizVacia(matriz.length, matriz[0].length);

  // Recorre cada pixel y asigna el valor del canal a r,g,b
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      const valor = matriz[i][j][canal];
      resultado[i][j] = {
        r: valor,
        g: valor,
        b: valor,
        a: matriz[i][j].a // Mantiene el canal alpha igual
      };
    }
  }
  return resultado; // Devuelve la matriz resultante
}

/**
 * Ejercicio 1.4: Obtener dimensiones de una imagen (5 puntos)
 * 
 * @param {string} rutaImagen - Ruta del archivo PNG
 * @returns {Object} - {ancho, alto, totalPixeles}
 * 
 * @example
 * const dims = obtenerDimensionesImagen('test.png');
 * // {ancho: 100, alto: 100, totalPixeles: 10000}
 */
function obtenerDimensionesImagen(rutaImagen) {
  // TODO: Obtener dimensiones sin cargar toda la imagen en memoria
  
  // Pista: Puedes cargar la imagen y usar obtenerDimensiones()
  // o leer solo el header del PNG

  // Lee la imagen PNG, pero solo para obtener dimensiones
  const buffer = fs.readFileSync(rutaImagen);
  const png = PNG.sync.read(buffer);
  const ancho = png.width;
  const alto = png.height;
  const totalPixeles = ancho * alto;

  // Devuelve las dimensiones
  return { ancho, alto, totalPixeles };
}

// ============================================
// SECCIÓN 2: OPERACIONES BÁSICAS (25 puntos)
// Aplicar álgebra matricial a píxeles
// ============================================

/**
 * Ejercicio 2.1: Ajustar brillo (8 puntos)
 * 
 * El brillo se ajusta multiplicando cada canal RGB por un factor.
 * Esto es una MULTIPLICACIÓN ESCALAR aplicada a cada canal.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @param {number} factor - Factor de brillo (0.5 = más oscuro, 2.0 = más claro)
 * @returns {Array<Array<Object>>} - Matriz con brillo ajustado
 * 
 * Concepto matemático:
 * Si factor = 1.5, entonces:
 * R_nuevo = R_original * 1.5
 * G_nuevo = G_original * 1.5
 * B_nuevo = B_original * 1.5
 * 
 * @example
 * const brillante = ajustarBrillo(matriz, 1.5); // 50% más claro
 * const oscuro = ajustarBrillo(matriz, 0.5);    // 50% más oscuro
 */
function ajustarBrillo(matriz, factor) {
  // TODO: Implementar ajuste de brillo
  
  // Crea una nueva matriz para el resultado
  const resultado = crearMatrizVacia(matriz.length, matriz[0].length);

  // Recorre cada pixel y ajusta el brillo
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      const pixel = matriz[i][j];
      resultado[i][j] = {
        r: limitarValorColor(Math.round(pixel.r * factor)),
        g: limitarValorColor(Math.round(pixel.g * factor)),
        b: limitarValorColor(Math.round(pixel.b * factor)),
        a: pixel.a // Mantiene el canal alpha igual
      };
    }
  }
  return resultado; // Devuelve la matriz resultante
}

/**
 * Ejercicio 2.2: Invertir colores (8 puntos)
 * 
 * Invierte los colores usando la operación: nuevo = 255 - original
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz con colores invertidos
 * 
 * Concepto matemático:
 * R_nuevo = 255 - R_original
 * G_nuevo = 255 - G_original
 * B_nuevo = 255 - B_original
 * 
 * @example
 * const negativo = invertirColores(matriz);
 * // Blanco (255,255,255) → Negro (0,0,0)
 * // Rojo (255,0,0) → Cian (0,255,255)
 */
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

/**
 * Ejercicio 2.3: Convertir a escala de grises (9 puntos)
 * 
 * Convierte la imagen a escala de grises usando el promedio ponderado:
 * Gris = 0.299*R + 0.587*G + 0.114*B
 * 
 * Estos pesos reflejan la sensibilidad del ojo humano a cada color.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz en escala de grises
 * 
 * @example
 * const grises = convertirEscalaGrises(matriz);
 */
function convertirEscalaGrises(matriz) {
  // TODO: Implementar conversión a escala de grises
  
  // Crea una nueva matriz para el resultado
  const resultado = crearMatrizVacia(matriz.length, matriz[0].length);

  // Recorre cada pixel y convierte a gris
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      const pixel = matriz[i][j];
      const gris = Math.round(0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b);
      resultado[i][j] = {
        r: gris,
        g: gris,
        b: gris,
        a: pixel.a
      };
    }
  }
  // Devuelve la matriz resultante
  return resultado; 
}

// ============================================
// SECCIÓN 3: TRANSFORMACIONES GEOMÉTRICAS (30 puntos)
// Aplicar operaciones matriciales para transformar
// ============================================

/**
 * Ejercicio 3.1: Voltear horizontal (espejo) (10 puntos)
 * 
 * Voltea la imagen horizontalmente (efecto espejo).
 * Cada fila se invierte: [1,2,3] → [3,2,1]
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz volteada horizontalmente
 * 
 * Concepto matemático:
 * pixel[i][j] → pixel[i][ancho - 1 - j]
 * 
 * @example
 * const espejo = voltearHorizontal(matriz);
 */
function voltearHorizontal(matriz) {
  // TODO: Implementar volteo horizontal

  // Crea una matriz para el resultado y la llena invirtiendo cada fila
  const resultado = matriz.map(fila => fila.slice().reverse());
  
  return resultado; // Devuelve la matriz resultante
 
}

/**
 * Ejercicio 3.2: Voltear vertical (10 puntos)
 * 
 * Voltea la imagen verticalmente (de arriba hacia abajo).
 * El orden de las filas se invierte.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz volteada verticalmente
 * 
 * Concepto matemático:
 * pixel[i][j] → pixel[alto - 1 - i][j]
 * 
 * @example
 * const invertido = voltearVertical(matriz);
 */
function voltearVertical(matriz) {
  // TODO: Implementar volteo vertical
  
  // 
  const resultado = matriz.slice().reverse();
  
  return resultado; // Devuelve la matriz resultante
}

/**
 * Ejercicio 3.3: Rotar 90 grados en sentido horario (10 puntos)
 * 
 * Rota la imagen 90° en sentido horario.
 * Esto se logra con: TRANSPONER + VOLTEAR HORIZONTAL
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz rotada 90°
 * 
 * Concepto matemático:
 * 1. Transponer: pixel[i][j] → pixel[j][i]
 * 2. Voltear horizontal: invertir cada fila
 * 
 * Puedes usar transponerMatriz() de matriz.js (¡pero cuidado! trabaja con números, 
 * no con objetos pixel)
 * 
 * @example
 * const rotada = rotar90Grados(matriz);
 */
function rotar90Grados(matriz) {
  // TODO: Implementar rotación de 90 grados
  
  // Copia la matriz original
  const transpuesta = crearMatrizVacia(matriz[0].length, matriz.length);
  // Transpone la matriz usando un bucle anidado
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      transpuesta[j][i] = matriz[i][j];
    }
  }

  // Voltea horizontalmente la matriz transpuesta
  const resultado = transpuesta.map(fila => fila.slice().reverse());
  return resultado; // Devuelve la matriz resultante

}

// ============================================
// SECCIÓN 4: FILTROS AVANZADOS (25 puntos)
// Operaciones más complejas
// ============================================

/**
 * Ejercicio 4.1: Mezclar dos imágenes (8 puntos)
 * 
 * Mezcla dos imágenes usando un factor de mezcla.
 * resultado = imagen1 * (1 - factor) + imagen2 * factor
 * 
 * Esto es una COMBINACIÓN LINEAL de matrices.
 * 
 * @param {Array<Array<Object>>} matriz1 - Primera imagen
 * @param {Array<Array<Object>>} matriz2 - Segunda imagen
 * @param {number} factor - Factor de mezcla (0.0 a 1.0)
 *                          0.0 = solo imagen1
 *                          0.5 = 50% de cada una
 *                          1.0 = solo imagen2
 * @returns {Array<Array<Object>>} - Imagen mezclada
 * 
 * @example
 * const mezcla = mezclarImagenes(imagen1, imagen2, 0.5); // 50/50
 */
function mezclarImagenes(matriz1, matriz2, factor) {
  // TODO: Implementar mezcla de imágenes
  
  // Crea una nueva matriz para el resultado
  const resultado = crearMatrizVacia(matriz1.length, matriz1[0].length);

  // Recorre cada pixel y mezcla los colores
  for (let i = 0; i < matriz1.length; i++) {
    // Recorre cada columna
    for (let j = 0; j < matriz1[i].length; j++) {
      const pixel1 = matriz1[i][j];
      const pixel2 = matriz2[i][j];
      // Mezcla cada canal usando el factor 
      resultado[i][j] = {
        r: limitarValorColor(Math.round(pixel1.r * (1 - factor) + pixel2.r * factor)),
        g: limitarValorColor(Math.round(pixel1.g * (1 - factor) + pixel2.g * factor)),
        b: limitarValorColor(Math.round(pixel1.b * (1 - factor) + pixel2.b * factor)),
        a: limitarValorColor(Math.round(pixel1.a * (1 - factor) + pixel2.a * factor))
      };
    }
  }
  return resultado; // Devuelve la matriz resultante
}

/**
 * Ejercicio 4.2: Filtro Sepia (9 puntos)
 * 
 * Aplica el efecto sepia (tono vintage/antiguo).
 * Usa la siguiente transformación matricial:
 * 
 * R_nuevo = 0.393*R + 0.769*G + 0.189*B
 * G_nuevo = 0.349*R + 0.686*G + 0.168*B
 * B_nuevo = 0.272*R + 0.534*G + 0.131*B
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Imagen con efecto sepia
 * 
 * @example
 * const vintage = aplicarSepia(matriz);
 */
function aplicarSepia(matriz) {
  // TODO: Implementar filtro sepia

  // Crea una nueva matriz para el resultado
  const resultado = crearMatrizVacia(matriz.length, matriz[0].length);

  // Recorre cada pixel y aplica la transformación sepia
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      const pixel = matriz[i][j];

      // Calcula los nuevos valores con la fórmula sepia
      const rNuevo = limitarValorColor(Math.round(0.393 * pixel.r + 0.769 * pixel.g + 0.189 * pixel.b));
      const gNuevo = limitarValorColor(Math.round(0.349 * pixel.r + 0.686 * pixel.g + 0.168 * pixel.b));
      const bNuevo = limitarValorColor(Math.round(0.272 * pixel.r + 0.534 * pixel.g + 0.131 * pixel.b));

      // Asigna el nuevo pixel sepia
      resultado[i][j] = {
        r: rNuevo,
        g: gNuevo,
        b: bNuevo,
        a: pixel.a
      };
    }
  }
  return resultado; // Devuelve la matriz resultante
}

/**
 * Ejercicio 4.3: Detectar bordes (simplificado) (8 puntos)
 * 
 * Detecta bordes comparando cada pixel con sus vecinos.
 * Si la diferencia es grande, hay un borde.
 * 
 * Este es un operador Sobel simplificado.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @param {number} umbral - Umbral de detección (0-255), default: 50
 * @returns {Array<Array<Object>>} - Imagen de bordes (blanco y negro)
 * 
 * Algoritmo simplificado:
 * 1. Convertir a escala de grises
 * 2. Para cada pixel, calcular diferencia con vecinos
 * 3. Si diferencia > umbral, es borde (blanco), sino negro
 * 
 * @example
 * const bordes = detectarBordes(matriz, 50);
 */
function detectarBordes(matriz, umbral = 50) {
  // TODO: Implementar detección de bordes
  
  // Obtener dimensiones de la imagen
  const alto = matriz.length;
  const ancho = matriz[0]?.length || 0;

  // 1. Convertir a escala de grises para simplificar el cálculo
  const grises = []
  
  for (let y = 0; y < alto; y++) {
    const filaGris = [];
    for (let x = 0; x < ancho; x++) {
      const p = matriz[y][x];
      // Aplicar fórmula estándar para conversión a gris
      const valorGris = Math.round(
        0.299 * p.r +
        0.587 * p.g +
        0.114 * p.b
      );
      filaGris.push(valorGris);
    }
    grises.push(filaGris);
  }

  // Crea la matriz resultado para almacenar los bordes detectados
  const resultado = [];

  // Recorre cada píxel y compara con vecinos para detectar cambios bruscos
  for (let y = 0; y < alto; y++) {
    const filaResultado = [];

    for (let x = 0; x < ancho; x++) {
      // Obtiene el valor del pixel central
      const centro = grises[y][x];

      // Para la última fila / última columna no hay derecha o abajo:
      // los dejamos como negro (sin borde) para evitar errores de índice
      if (x === ancho - 1 || y === alto - 1) {
        filaResultado.push({ r: 0, g: 0, b: 0, a: 255 });
        continue;
      }

      // Obtener valores de los píxeles vecinos (derecha y abajo)
      const derecha = grises[y][x + 1];
      const abajo   = grises[y + 1][x];

      // Calcular diferencia máxima con sus vecinos derecha y abajo
      const difDerecha = Math.abs(centro - derecha);
      const difAbajo   = Math.abs(centro - abajo);
      const diferencia = Math.max(difDerecha, difAbajo);

      // Aplica umbral: si la diferencia es mayor al umbral, hay un borde
      const valor = diferencia > umbral ? 255 : 0;

      //Guarda píxel en blanco (borde) o negro (no borde)
      filaResultado.push({
        r: valor,
        g: valor,
        b: valor,
        a: 255 
      });
    }

    resultado.push(filaResultado);
  }

  // Devuelve la imagen con bordes detectados
  return resultado;
}

// ============================================
// NO MODIFICAR - Exportación de funciones
// ============================================
module.exports = {
  // Sección 1: Fundamentos
  imagenAMatriz,
  matrizAImagen,
  obtenerCanal,
  obtenerDimensionesImagen,
  
  // Sección 2: Operaciones Básicas
  ajustarBrillo,
  invertirColores,
  convertirEscalaGrises,
  
  // Sección 3: Transformaciones
  voltearHorizontal,
  voltearVertical,
  rotar90Grados,
  
  // Sección 4: Filtros Avanzados
  mezclarImagenes,
  aplicarSepia,
  detectarBordes
};
