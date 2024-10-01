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

    // Simulación de archivos disponibles en SharePoint
    const archivosDisponibles = [
        '71005068879_74860-09.pdf',
        '71500055363_369542.pdf',
        '71500055363_231738.pdf',
        '71005068879_C125.pdf',
        '71500161487_236532.pdf',
        // Agrega más ejemplos según sea necesario
    ];

    // Si el usuario ingresa un comodín "*"
    if (batchNumber === '*') {
        const archivosCoincidentes = archivosDisponibles.filter(archivo => archivo.startsWith(materialCode));

        if (archivosCoincidentes.length > 0) {
            resultDiv.innerHTML = `<p>Archivos disponibles para el material ${materialCode}:</p><ul>`;

            archivosCoincidentes.forEach(archivo => {
                const colada = archivo.substring(11).replace('.pdf', ''); // Extraer colada
                const pdfUrl = `${baseUrl}${archivo}`;
                resultDiv.innerHTML += `<li><a href="${pdfUrl}" target="_blank">Descargar Certificado PDF (Colada: ${colada})</a></li>`;
            });

            resultDiv.innerHTML += '</ul>';
        } else {
            resultDiv.innerHTML = `<p>No se encontraron archivos disponibles para el material ${materialCode}.</p>`;
        }
    } else if (batchNumber) {
        // Si el usuario ingresa un número de colada específico
        const pdfUrl = `${baseUrl}${materialCode}_${batchNumber}.pdf`;

        // Mostrar el enlace al PDF
        resultDiv.innerHTML = `<a href="${pdfUrl}" target="_blank">Descargar Certificado PDF (${batchNumber})</a>`;
    } else {
        resultDiv.innerHTML = `<p>Por favor, ingresa un número de colada o utiliza el comodín "*".</p>`;
    }
});
