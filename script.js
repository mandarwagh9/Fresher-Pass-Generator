const { jsPDF } = window.jspdf;

document.getElementById('eventPassForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('name').value;
    const classYear = document.getElementById('classYear').value;
    const uniqueID = Date.now().toString();

    // Function to encode data in Base64 using UTF-8
    function encodeData(data) {
        return btoa(unescape(encodeURIComponent(data)));
    }

    // Create QR code data
    const qrData = `Name: ${name}\nClass: ${classYear}\nEvent: Freshers Party\nDate: 19/10/2025\nVenue: Leela’s Restaurant & Banquets\nID: ${uniqueID}`;
    const encodedQrData = encodeData(qrData);

    // Generate QR Code using an API
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(encodedQrData)}&size=150x150`;

    // Display pass content
    const passContent = `
        <h3>Freshers Party 2025</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Class:</strong> ${classYear}</p>
        <p><strong>Date:</strong> 19/10/2025</p>
        <p><strong>Venue:</strong> Leela’s Restaurant & Banquets</p>
        <img src="${qrCodeURL}" alt="QR Code" id="qrImage">
    `;
    document.getElementById('passContent').innerHTML = passContent;
    document.getElementById('passPreview').style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'block';

    // PDF download function
    document.getElementById('downloadBtn').onclick = function () {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [300, 500],
        });

        // Background and text formatting
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 300, 500, 'F');
        doc.setTextColor(51, 51, 51);
        doc.setFontSize(18);
        doc.text('Freshers Party 2025', 150, 40, { align: 'center' });

        doc.setFontSize(14);
        doc.text(`Name: ${name}`, 20, 80);
        doc.text(`Class: ${classYear}`, 20, 100);
        doc.text('Date: 19/10/2025', 20, 120);
        doc.text('Venue: Leela’s Restaurant & Banquets', 20, 140);

        // QR Code
        const imgElement = document.getElementById('qrImage');
        const imgData = imgElement.src;
        doc.addImage(imgData, 'PNG', 75, 160, 150, 150);

        doc.setFontSize(10);
        doc.text('Scan the QR code at the entrance', 150, 340, { align: 'center' });

        // Save the PDF
        doc.save(`${name}_Event_Pass.pdf`);
    };
});
