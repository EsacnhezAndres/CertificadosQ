document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de manera predeterminada

    const materialCode = document.getElementById('materialCode').value;

    console.log(`Buscando: Material - ${materialCode}`);

    // Verificar que el código de material comience con '71' y tenga exactamente 11 dígitos
    const materialCodePattern = /^71\d{9}$/;

    if (!materialCodePattern.test(materialCode)) {
        alert('El código de material debe comenzar con "71" y tener 11 dígitos.');
        return;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Buscando archivos para el material ${materialCode}...</p>`;

    // URL base de la carpeta en SharePoint
    const baseUrl = 'https://nealandmassyltd.sharepoint.com/sites/ProyectoEcopetrol/GOR/08_Certificados_de_Calidad/PDFS/';

    // Simulación de archivos disponibles en SharePoint
    const archivosDisponibles = [
        '71005068879_74860-09.pdf',
        '71500055363_369542.pdf',
        '71500055363_231738.pdf',
        '71005068879_C125.pdf',
        '71500161487_236532.pdf',
        // Agrega más ejemplos según sea necesario
    ];

    // Filtrar solo los archivos que coincidan exactamente con el código de material ingresado
    const archivosCoincidentes = archivosDisponibles.filter(archivo => archivo.startsWith(materialCode));

    if (archivosCoincidentes.length > 0) {
        resultDiv.innerHTML = `<p>Coladas disponibles para el material ${materialCode}:</p><ul>`;

        archivosCoincidentes.forEach(archivo => {
            // Extraer la parte que está después del guion bajo (la colada)
            const colada = archivo.split('_')[1].replace('.pdf', ''); // Extraer colada
            const pdfUrl = `${baseUrl}${archivo}`;
            resultDiv.innerHTML += `<li><a href="${pdfUrl}" target="_blank">Descargar Certificado PDF (Colada: ${colada})</a></li>`;
        });

        resultDiv.innerHTML += '</ul>';
    } else {
        resultDiv.innerHTML = `<p>No se encontraron coladas disponibles para el material ${materialCode}.</p>`;
    }
});
