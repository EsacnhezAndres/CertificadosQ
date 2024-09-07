document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de manera predeterminada

    const materialCode = document.getElementById('materialCode').value;
    const batchNumber = document.getElementById('batchNumber').value;

    // Verifica que el código del material tenga 11 dígitos
    if (materialCode.length !== 11) {
        alert('El código de material debe tener 11 dígitos.');
        return;
    }

    const resultDiv = document.getElementById('result');

    // Si se ingresa el número de colada, buscar el archivo PDF específico
    if (batchNumber) {
        const pdfFileName = `pdfs/${materialCode}_${batchNumber}.pdf`;
        fetch(pdfFileName)
            .then(response => {
                if (response.ok) {
                    resultDiv.innerHTML = `<a href="${pdfFileName}" download>Descargar Certificado PDF (${pdfFileName})</a>`;
                } else {
                    resultDiv.innerHTML = `<p>No se encontró el certificado para el material ingresado: ${materialCode}_${batchNumber}</p>`;
                }
            })
            .catch(error => {
                console.error('Error al buscar el archivo:', error);
                resultDiv.innerHTML = `<p>Ocurrió un error al buscar el certificado. Por favor, inténtalo de nuevo más tarde.</p>`;
            });
    } else {
        // Si no se ingresa el número de colada, buscar todas las coladas disponibles para ese material
        fetchColadas(materialCode);
    }
});

// Función para buscar todas las coladas disponibles para un código de material
function fetchColadas(materialCode) {
    const resultDiv = document.getElementById('result');

    // Simulación: búsqueda de archivos PDF en la carpeta 'pdfs'
    fetch('pdfs/')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo acceder a la carpeta de PDFs');
            }
            return response.text();
        })
        .then(data => {
            // Suponiendo que la respuesta contiene una lista de archivos en la carpeta
            const regex = new RegExp(`${materialCode}_[^/]+\.pdf`, 'g');
            const coladasEncontradas = data.match(regex) || [];

            if (coladasEncontradas.length > 0) {
                resultDiv.innerHTML = '<p>Coladas disponibles para el material ' + materialCode + ':</p><ol>';
                coladasEncontradas.forEach((colada, index) => {
                    // Extrae solo el número de colada del nombre del archivo
                    const coladaName = colada.split('_')[1].replace('.pdf', '').replace(/\".*$/, ''); // Eliminar cualquier texto adicional no deseado
                    resultDiv.innerHTML += `<li>${coladaName}</li>`;
                });
                resultDiv.innerHTML += '</ol>';
            } else {
                resultDiv.innerHTML = `<p>No se encontraron coladas para el código de material: ${materialCode}</p>`;
            }
        })
        .catch(error => {
            console.error('Error al buscar coladas:', error);
            resultDiv.innerHTML = `<p>Ocurrió un error al buscar las coladas. Por favor, inténtalo de nuevo más tarde.</p>`;
        });
}
