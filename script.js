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

    if (batchNumber) {
        const pdfFileName = `https://esacnhezandres.github.io/CertificadosQ/PDFS/${materialCode}_${batchNumber}.pdf`;
        console.log(`Buscando archivo específico: ${pdfFileName}`);
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
        fetchColadas(materialCode);
    }
});

function fetchColadas(materialCode) {
    const resultDiv = document.getElementById('result');
    const jsonUrl = 'https://esacnhezandres.github.io/CertificadosQ/PDFS/pdfs.json'; // URL correcta del archivo JSON

    console.log(`Cargando datos desde JSON: ${jsonUrl}`);

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Datos cargados:', data);
            const regex = new RegExp(`${materialCode}_[^/]+\.pdf`, 'g');
            const coladasEncontradas = data.filter(file => file.match(regex));

            if (coladasEncontradas.length > 0) {
                resultDiv.innerHTML = '<p>Coladas disponibles para el material ' + materialCode + ':</p><ol>';
                coladasEncontradas.forEach((colada, index) => {
                    const coladaName = colada.split('_')[1].replace('.pdf', '');
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
