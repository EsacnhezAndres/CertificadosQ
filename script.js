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
        // Si no se ingresa un número de colada, generar una lista de posibles coladas
        resultDiv.innerHTML = `<p>Buscando posibles coladas para el material ${materialCode}...</p>`;

        // Supongamos que las coladas tienen diferentes patrones (números, letras, guiones, etc.)
        const patronesColada = [
            'C125',  // Ejemplo con solo letras y números
            'C123-09',  // Ejemplo con guión
            'ABC_123',  // Ejemplo con guión bajo
            'XYZ_456-789',  // Ejemplo más complejo
            '123_ABC-DEF',  // Otro ejemplo
            // Puedes agregar más ejemplos aquí según los patrones que observes
        ];

        resultDiv.innerHTML = `<p>Posibles coladas para el material ${materialCode}:</p><ul>`;
        patronesColada.forEach(colada => {
            const pdfUrl = `${baseUrl}${materialCode}_${colada}.pdf`;
            resultDiv.innerHTML += `<li><a href="${pdfUrl}" target="_blank">Descargar Certificado PDF (Colada: ${colada})</a></li>`;
        });
        resultDiv.innerHTML += '</ul>';
    }
});
