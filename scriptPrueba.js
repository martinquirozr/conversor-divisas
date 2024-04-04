function renderizarTabla(datos) {
    let tabla = document.createElement('table');
    let tbody = document.createElement('tbody');
    
    for (let i = 0; i < datos.length; i += 3) {
        let fila = document.createElement('tr');
        
        for (let j = i; j < i + 3 && j < datos.length; j++) {
            let celda = document.createElement('td');
            celda.textContent = datos[j];
            fila.appendChild(celda);
        }
        
        tbody.appendChild(fila);
    }
    
    tabla.appendChild(tbody);
    
    let contenedor = document.getElementById('contenedor_tabla');
    contenedor.appendChild(tabla);
}



// Ejemplo de uso:
let datos = ['Dato 1', 'Dato 2', 'Dato 3', 'Dato 4', 'Dato 5', 'Dato 6', 'Dato 7', 'Dato 8', 'Dato 9'];
renderizarTabla(datos);