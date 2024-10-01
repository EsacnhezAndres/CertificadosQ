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
        // Si no se ingresa un número de colada, buscar todas las coladas disponibles para el material
        resultDiv.innerHTML = `<p>Buscando todas las coladas para el material ${materialCode}...</p>`;

        // Aquí asumimos que la lista de archivos PDF en SharePoint sigue una estructura predecible
        fetch(baseUrl, { method: 'GET' }) // Intentamos obtener todos los archivos disponibles
            .then(response => response.text()) // Recuperamos el HTML de la página
            .then(data => {
                // Simulamos la búsqueda de coladas a partir de los archivos listados
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const links = doc.querySelectorAll('a');
                const coladasEncontradas = [];

                links.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href.includes(materialCode)) {
                        const colada = href.split('_')[1].replace('.pdf', '');
                        coladasEncontradas.push({ colada, href: `${baseUrl}${href}` });
                    }
                });

                if (coladasEncontradas.length > 0) {
                    resultDiv.innerHTML = `<p>Coladas disponibles para el material ${materialCode}:</p><ul>`;
                    coladasEncontradas.forEach(item => {
                        resultDiv.innerHTML += `<li><a href="${item.href}" target="_blank">Descargar Certificado PDF (Colada: ${item.colada})</a></li>`;
                    });
                    resultDiv.innerHTML += '</ul>';
                } else {
                    resultDiv.innerHTML = `<p>No se encontraron coladas disponibles para el material ${materialCode}.</p>`;
                }
            })
            .catch(error => {
                console.error('Error al buscar las coladas:', error);
                resultDiv.innerHTML = `<p>Ocurrió un error al buscar las coladas. Por favor, inténtalo de nuevo más tarde.</p>`;
            });
    }
});
