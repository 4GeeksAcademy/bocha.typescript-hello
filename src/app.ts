import { crearSala, reservarAsiento, contarAsientos, buscarAsientosContiguos as buscarAsientosContiguosFn, FILAS, COLUMNAS } from '../main';

// Estado global
let sala = crearSala();

// Inicializar UI
export function inicializarUI(): void {
  renderizarSala();
  actualizarEstadisticas();
}

// Renderizar mapa visual de asientos
function renderizarSala(): void {
  const contenedor = document.getElementById('asientos-contenedor');
  if (!contenedor) return;
  
  contenedor.innerHTML = '';
  
  for (let fila = 0; fila < FILAS; fila++) {
    const filaDiv = document.createElement('div');
    filaDiv.className = 'flex gap-2 justify-center items-center';
    
    const etiquetaFila = document.createElement('span');
    etiquetaFila.className = 'w-8 text-center text-sm font-semibold text-slate-700';
    etiquetaFila.textContent = `${fila + 1}`;
    filaDiv.appendChild(etiquetaFila);
    
    const filaSientos = document.createElement('div');
    filaSientos.className = 'flex gap-2';
    
    for (let columna = 0; columna < COLUMNAS; columna++) {
      const btnAsiento = document.createElement('button');
      const ocupado = sala[fila][columna] === 1;
      
      btnAsiento.className = `
        w-10 h-10 rounded-lg font-semibold text-sm transition-all
        ${ocupado 
          ? 'bg-red-500 text-white cursor-not-allowed hover:bg-red-600' 
          : 'bg-green-500 text-white hover:bg-green-600 active:scale-95 cursor-pointer'
        }
      `;
      
      btnAsiento.textContent = ocupado ? '✕' : '✓';
      btnAsiento.disabled = ocupado;
      
      btnAsiento.addEventListener('click', () => {
        if (!ocupado) {
          reservarAsiento(sala, fila + 1, columna + 1);
          renderizarSala();
          actualizarEstadisticas();
        }
      });
      
      filaSientos.appendChild(btnAsiento);
    }
    
    filaDiv.appendChild(filaSientos);
    contenedor.appendChild(filaDiv);
  }
  
  // Agregar columnas numeradas
  const etiquetasColumnas = document.createElement('div');
  etiquetasColumnas.className = 'flex gap-2 justify-center items-start mt-4';
  etiquetasColumnas.style.marginLeft = '40px';
  
  const espacioVacio = document.createElement('span');
  espacioVacio.className = 'w-8';
  etiquetasColumnas.appendChild(espacioVacio);
  
  const columnasDiv = document.createElement('div');
  columnasDiv.className = 'flex gap-2';
  
  for (let columna = 0; columna < COLUMNAS; columna++) {
    const etiqueta = document.createElement('span');
    etiqueta.className = 'w-10 text-center text-sm font-semibold text-slate-700';
    etiqueta.textContent = `${columna + 1}`;
    columnasDiv.appendChild(etiqueta);
  }
  
  etiquetasColumnas.appendChild(columnasDiv);
  contenedor.appendChild(etiquetasColumnas);
}

// Actualizar estadísticas
function actualizarEstadisticas(): void {
  const { ocupados, libres } = contarAsientos(sala);
  const total = FILAS * COLUMNAS;
  
  const ocupadosEl = document.getElementById('ocupados');
  const libresEl = document.getElementById('libres');
  const totalEl = document.getElementById('total');
  const porcentajeEl = document.getElementById('porcentaje');
  
  if (ocupadosEl) ocupadosEl.textContent = ocupados.toString();
  if (libresEl) libresEl.textContent = libres.toString();
  if (totalEl) totalEl.textContent = total.toString();
  
  const porcentaje = ((ocupados / total) * 100).toFixed(1);
  if (porcentajeEl) porcentajeEl.textContent = `${porcentaje}%`;
}

// Buscar asientos contiguos
export function buscarAsientosContiguos(): void {
  const resultado = buscarAsientosContiguosFn(sala);
  const mensajeEl = document.getElementById('mensaje-contiguos');
  
  if (mensajeEl) {
    mensajeEl.textContent = resultado || '';
    mensajeEl.className = 'mt-4 p-4 rounded-lg bg-blue-100 text-blue-800 text-center font-semibold';
  }
}

// Resetear sala
export function resetearSala(): void {
  sala = crearSala();
  renderizarSala();
  actualizarEstadisticas();
  
  const mensajeEl = document.getElementById('mensaje-contiguos');
  if (mensajeEl) {
    mensajeEl.textContent = '';
    mensajeEl.className = '';
  }
}

// Exportar sala para acceso global si es necesario
export function obtenerSala() {
  return sala;
}
