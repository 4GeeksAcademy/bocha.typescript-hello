
export type Asiento = 0 | 1; //•	Representa los asientos ocupados con 1 y los disponibles con 0.
export type Sala = Asiento[][]; // array de arrays de asientos
// Medidas de la sala
export const FILAS = 8;
export const COLUMNAS = 10;

//////////////////////////////////
// 1. Crear sala vacía
//////////////////////////////////

export function crearSala(): Sala {
    const sala: Sala = [];
    for (let fila = 0; fila < FILAS; fila++) {

        const filaActual: Asiento[] = [];

        for (let columna = 0; columna < COLUMNAS; columna++) {
            filaActual.push(0);                              
        }

        sala.push(filaActual);

    }

    return sala;
}

//////////////////////////////////
// 2. Mostrar sala
//////////////////////////////////

export function mostrarSala(sala: Sala): void {
    console.log("\nEstado actual de la sala:\n");

    for (let fila = 0; fila < sala.length; fila++) {
        let linea = `Fila ${fila + 1}: `;

        for (let columna = 0; columna < sala[fila].length; columna++) {

            linea += sala[fila][columna] === 1 ? " X" : " L"; // En sala se guarda 0 y 1 de acuerdo a lo solicitado, aqui dependiendo del valor agrega X o L para mostrar.
        }

        console.log(linea);
    }

}
//////////////////////////////////
// 3. Reservar asiento
//////////////////////////////////

export function reservarAsiento(sala: Sala, fila: number, columna: number): void {

    const indiceFila = fila - 1;
    const indiceColumna = columna - 1;
    //Verifico existencia.
    if (
        indiceFila < 0 ||
        indiceFila >= sala.length ||
        indiceColumna < 0 ||
        indiceColumna >= sala[0].length
    ) {
        console.log(`El asiento Fila ${fila}, Columna ${columna} no existe.`);
        return;
    }

    //Verifico que el asiento no esté ocupado.
    if (sala[indiceFila][indiceColumna] === 1) {
        console.log(`El asiento Fila ${fila}, Columna ${columna} ya está ocupado.`);
        return;
    }
    //Finalmente, reservo el asiento al existir y estar libre.
    sala[indiceFila][indiceColumna] = 1;
    console.log(`Reserva confirmada: Fila ${fila}, Columna ${columna}.`);
}

//////////////////////////////////
// 4. Contar asientos ocupados y libres
//////////////////////////////////

export function contarAsientos(sala: Sala): { ocupados: number; libres: number } {
    let libres = 0;
    let ocupados = 0;
    for (let fila = 0; fila < sala.length; fila++) {
        for (let columna = 0; columna < sala[fila].length; columna++) {
            if (sala[fila][columna] === 1) ocupados++;   //Incrementa el contador de asientos ocupados.
        };
    };

    const totalAsientos = FILAS * COLUMNAS; 
    libres = totalAsientos - ocupados;  //Calcula los asientos libres por diferencia entre el total y los ocupados

    return { ocupados, libres };
}

//////////////////////////////////
// 5. Buscar asientos contiguos
//////////////////////////////////

export function buscarAsientosContiguos(sala: Sala): string {
    for (let fila = 0; fila < sala.length; fila++) {
        for (let columna = 0; columna < sala[fila].length - 1; columna++) { // -1 para evitar desbordamiento al verificar el siguiente asiento
            if ((sala[fila][columna] === 0) && (sala[fila][columna + 1] === 0)) { // Verifica si el asiento actual y el siguiente están libres
                let libreFila: number = fila + 1;
                let libreColumna: number = columna + 1;
                let mensaje: string = `Primer par de asientos contiguos disponibles en: Fila ${libreFila}, Asientos ${libreColumna} y ${libreColumna + 1} .`;
                return (mensaje);
            }
        };
    };
    return "No hay par de asientos contiguos disponibles en la sala.";
}



//////////////////////////////////
// 6. Simulacion de pruebas y uso de funciones
//////////////////////////////////

//Creo la sala.
const sala = crearSala();
//Muestro en el terminal la sala recién creada, con todos los asientos libres.
console.log("\n--- Sala recién creada ---");
mostrarSala(sala);

//Probamos reserva de asientos
console.log("\n--- Reservamos algunos asientos ---");
reservarAsiento(sala, 1, 1);
reservarAsiento(sala, 1, 1); // Intento reservar el mismo asiento para verificar que no se permita la doble reserva
reservarAsiento(sala, 1, 11);
reservarAsiento(sala, 0, 0);// Intento reservar un asiento fuera de los límites para verificar la validación
reservarAsiento(sala, 2, 3);
reservarAsiento(sala, 4, 6);
reservarAsiento(sala, 8, 10);
reservarAsiento(sala, 1, 2);
reservarAsiento(sala, 3, 5);
reservarAsiento(sala, 0, 10);// Intento reservar un asiento fuera de los límites para verificar la validación
reservarAsiento(sala, 5, 11);// Intento reservar un asiento fuera de los límites para verificar la validación

//Muestro la sala después de las reservas para verificar los cambios.
console.log("\n--- Sala después de las reservas ---");
mostrarSala(sala);

//Contamos los asientos ocupados y libres, y mostramos el resumen en el terminal.
const { ocupados, libres } = contarAsientos(sala);
console.log("  RESUMEN DE OCUPACIÓN");
console.log(`   Total de asientos : ${FILAS * COLUMNAS}`);
console.log(`   Ocupados          : ${ocupados}`);
console.log(`   Disponibles       : ${libres}`);
//Buscamos el primer par de asientos contiguos disponibles y mostramos el resultado en el terminal.
console.log("\n--- Buscando asientos contiguos ---");
const resultadoContiguos = buscarAsientosContiguos(sala);
console.log(resultadoContiguos);