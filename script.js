document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de manera predeterminada

    const materialCode = document.getElementById('materialCode').value;
    const batchNumber = document.getElementById('batchNumber').value;

    console.log(`Buscando: Material - ${materialCode}, Colada - ${batchNumber}`);

    if (materialCode.length !== 11) {
        alert('El código de material debe tener 11 dígitos.');
        return;
    }

    const resultDiv = document.getElementById('result');

    // Cargar el archivo JSON con las URLs de los PDF en SharePoint
    fetch('pdfs.json') // Reemplaza esta línea con la URL correcta si el JSON está alojado en otro lugar
        .then(response => response.json())
        .then(data => {
            // Buscar el PDF que coincida con el código de material y número de colada
            const foundPDF = data.find(pdf => pdf.material === materialCode && pdf.colada === batchNumber);
            
            if (foundPDF) {
                // Mostrar enlace al PDF encontrado en SharePoint
                resultDiv.innerHTML = `<a href="${foundPDF.url}" target="_blank">Descargar Certificado PDF (${foundPDF.colada})</a>`;
            } else {
                // Mostrar mensaje si no se encuentra el PDF
                resultDiv.innerHTML = `<p>No se encontró el certificado para el material ingresado: ${materialCode} y la colada: ${batchNumber}</p>`;
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            resultDiv.innerHTML = `<p>Ocurrió un error al buscar los certificados. Por favor, inténtalo de nuevo más tarde.</p>`;
        });
});

function fetchColadas(materialCode) {
    const resultDiv = document.getElementById('result');
    const jsonUrl = 'pdfs.json'; // URL correcta del archivo JSON con las URLs

    console.log(`Cargando datos desde JSON: ${jsonUrl}`);

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            // Filtrar todas las coladas para el código de material ingresado
            const coladasEncontradas = data.filter(pdf => pdf.material === materialCode);

            if (coladasEncontradas.length > 0) {
                resultDiv.innerHTML = '<p>Coladas disponibles para el material ' + materialCode + ':</p><ol>';
                coladasEncontradas.forEach((pdf, index) => {
                    const coladaName = pdf.colada;
                    resultDiv.innerHTML += `<li>${coladaName}</li>`;
                });
                resultDiv.innerHTML += '</ol>';
            } else {
                resultDiv.innerHTML = `<p>No se encontraron coladas para el código de material: ${materialCode}</p>`;
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            resultDiv.innerHTML = `<p>Ocurrió un error al buscar las coladas. Por favor, inténtalo de nuevo más tarde.</p>`;
        });
}
