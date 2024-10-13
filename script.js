const { jsPDF } = window.jspdf;

document.getElementById('eventPassForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('name').value;
    const classYear = document.getElementById('classYear').value;

    // Create a unique ID
    const uniqueID = Date.now().toString();

    // Function to encode data in Base64
    function encodeData(data) {
        return btoa(data);
    }

    // Create QR code data
    const qrData = `Name: ${name}\nClass: ${classYear}\nEvent: Freshers Party\nDate: 19/10/2025\nVenue: Baramati Club\nID: ${uniqueID}`;
    const encodedQrData = encodeData(qrData);

    // Generate QR Code using an API
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(encodedQrData)}&size=150x150`;

    // Create pass content
    const passContent = `
        <h3>Freshers Party</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Class:</strong> ${classYear}</p>
        <p><strong>Date:</strong> 19/10/2025</p>
        <p><strong>Venue:</strong> Baramati Club</p>
        <img src="${qrCodeURL}" alt="QR Code" id="qrImage">
    `;

    // Display the pass preview
    document.getElementById('passContent').innerHTML = passContent;
    document.getElementById('passPreview').style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'inline-block';
    document.getElementById('scanQrBtn').style.display = 'inline-block';

    // Add download functionality for PDF
    document.getElementById('downloadBtn').onclick = function() {
        const doc = new jsPDF();
        const imgElement = document.getElementById('qrImage');

        // Convert the QR code image to base64 and add it to the PDF
        const imgData = imgElement.src;

        // Add text to PDF
        doc.text("Freshers Party 2024", 20, 20);
        doc.text(`Name: ${name}`, 20, 30);
        doc.text(`Class: ${classYear}`, 20, 40);
        doc.text("Date: 19/10/2025", 20, 50);
        doc.text("Venue: Leela’s Restaurant & Banquets", 20, 60);
        
        // Add QR code image to PDF
        doc.addImage(imgData, 'PNG', 20, 70, 40, 40); // Adjust dimensions as needed

        // Save the PDF
        doc.save('event_pass.pdf');
    };
});

// Redirect to scanner page
document.getElementById('goToScannerBtn').onclick = function() {
    window.location.href = 'scan.html';
};
