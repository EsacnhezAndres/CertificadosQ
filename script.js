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

    // URL base de la carpeta en SharePoint
    const baseUrl = 'https://nealandmassyltd.sharepoint.com/sites/ProyectoEcopetrol/GOR/08_Certificados_de_Calidad/PDFS/';

    if (batchNumber) {
        // Si se ingresa un número de colada, construir el nombre del archivo
        const pdfUrl = `${baseUrl}${materialCode}_${batchNumber}.pdf`;

        // Verificar si el archivo existe y mostrar el enlace
        fetch(pdfUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    resultDiv.innerHTML = `<a href="${pdfUrl}" target="_blank">Descargar Certificado PDF (${batchNumber})</a>`;
                } else {
                    resultDiv.innerHTML = `<p>No se encontró el certificado para el material ingresado: ${materialCode} y la colada: ${batchNumber}</p>`;
                }
            })
            .catch(error => {
                console.error('Error al buscar el archivo PDF:', error);
                resultDiv.innerHTML = `<p>Ocurrió un error al buscar el certificado. Por favor, inténtalo de nuevo más tarde.</p>`;
            });
    } else {
        // Si no se ingresa un número de colada, buscar todos los PDFs para el material
        resultDiv.innerHTML = `<p>No se encontró un archivo JSON y no se puede generar la lista de coladas automáticamente.</p>`;
    }
});
