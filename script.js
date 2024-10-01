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

    // Suponemos que el usuario no sabe las coladas específicas, generaremos enlaces con combinaciones amplias
    resultDiv.innerHTML = `<p>Archivos disponibles para el material ${materialCode}:</p><ul>`;

    // Generaremos dinámicamente algunos enlaces para ilustrar cómo sería si tuviéramos coladas infinitas
    for (let i = 1; i <= 10; i++) { // Por ejemplo, generamos 10 posibles coladas
        const colada = `Colada_${i}`; // Asumimos que cada colada tiene un nombre dinámico que podría ser cualquier cosa
        const pdfUrl = `${baseUrl}${materialCode}_${colada}.pdf`;
        resultDiv.innerHTML += `<li><a href="${pdfUrl}" target="_blank">Descargar Certificado PDF (${colada})</a></li>`;
    }

    resultDiv.innerHTML += '</ul>';
});
