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

        // Redirigir directamente al archivo PDF en SharePoint
        resultDiv.innerHTML = `<a href="${pdfUrl}" target="_blank">Descargar Certificado PDF (${batchNumber})</a>`;
    } else {
        resultDiv.innerHTML = `<p>Por favor, ingresa un número de colada para obtener el certificado.</p>`;
    }
});
