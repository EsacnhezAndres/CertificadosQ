document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de manera predeterminada

    const materialCode = document.getElementById('materialCode').value;
    const batchNumber = document.getElementById('batchNumber').value;

    console.log(`Buscando: Material - ${materialCode}, Colada - ${batchNumber}`);

    // Verificar que el código de material comience con '71' y tenga exactamente 11 dígitos
    const materialCodePattern = /^71\d{9}$/;

    if (!materialCodePattern.test(materialCode)) {
        alert('El código de material debe comenzar con "71" y tener 11 dígitos.');
        return;
    }

    const resultDiv = document.getElementById('result');

    // URL base de la carpeta en SharePoint
    const baseUrl = 'https://nealandmassyltd.sharepoint.com/sites/ProyectoEcopetrol/GOR/08_Certificados_de_Calidad/PDFS/';

    if (batchNumber) {
        // Si se ingresa un número de colada, construir el nombre del archivo
        const pdfUrl = `${baseUrl}${materialCode}_${batchNumber}.pdf`;

        // Mostrar el enlace al PDF
        resultDiv.innerHTML = `<a href="${pdfUrl}" target="_blank">Descargar Certificado PDF (${batchNumber})</a>`;
    } else {
        // Si no se ingresa un número de colada, buscar todas las coladas disponibles
        resultDiv.innerHTML = `<p>Buscando todas las coladas para el material ${materialCode}...</p>`;

        // Supongamos que la lista de archivos en SharePoint está disponible en un array simulado
        const archivosDisponibles = [
            '71005068879_74860-09.pdf',
            '71500055363_369542.pdf',
            '71500055363_231738.pdf',
            '71005068879_C125.pdf',
            '71500161487_236532.pdf',
            // Aquí puedes agregar más ejemplos si lo deseas
        ];

        // Filtrar los archivos que coincidan con el código de material
        const coladasEncontradas = archivosDisponibles.filter(archivo => archivo.startsWith(materialCode));

        if (coladasEncontradas.length > 0) {
            resultDiv.innerHTML = `<p>Coladas disponibles para el material ${materialCode}:</p><ul>`;

            coladasEncontradas.forEach(archivo => {
                const colada = archivo.split('_')[1].replace('.pdf', ''); // Extraer la colada
                const pdfUrl = `${baseUrl}${archivo}`;
                resultDiv.innerHTML += `<li><a href="${pdfUrl}" target="_blank">Descargar Certificado PDF (Colada: ${colada})</a></li>`;
            });

            resultDiv.innerHTML += '</ul>';
        } else {
            resultDiv.innerHTML = `<p>No se encontraron coladas disponibles para el material ${materialCode}.</p>`;
        }
    }
});
