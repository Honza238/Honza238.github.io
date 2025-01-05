let scaleFactor = 0;

document.getElementById('calibrate-button').addEventListener('click', () => {
    const measuredWidthCm = parseFloat(document.getElementById('measured-width').value);
    if (measuredWidthCm <= 0) {
        alert('Please enter a valid measured width in centimeters.');
        return;
    }

    // The box is fixed at 100 pixels 
    const boxWidthPx = 100;
    scaleFactor = boxWidthPx / measuredWidthCm;

    alert(`Calibration complete! Scale factor is ${scaleFactor.toFixed(2)} pixels per cm.`);
});

document.getElementById('resize-button').addEventListener('click', () => {
    if (scaleFactor <= 0) {
        alert('Calibrate your screen first.');
        return;
    }

    const widthCm = parseFloat(document.getElementById('image-width').value);
    const heightCm = parseFloat(document.getElementById('image-height').value);
    const imageFile = document.getElementById('image-upload').files[0];

    if (!imageFile) {
        alert('Please upload an image!');
        return;
    }

    const imageSrc = URL.createObjectURL(imageFile);

    const widthPx = widthCm * scaleFactor;
    const heightPx = heightCm * scaleFactor;

    const imageContainer = document.getElementById('image-display');
    imageContainer.innerHTML = ''; // Clear previous 

    // Create a div with the image as a background
    const div = document.createElement('div');
    div.style.width = `${widthPx}px`;
    div.style.height = `${heightPx}px`;
    div.style.backgroundImage = `url(${imageSrc})`;
    div.style.backgroundSize = 'contain';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundPosition = 'center';

    imageContainer.appendChild(div);

    // Revoke the object URL to free memory when the user navigates away or refreshes
    div.onload = () => {
        URL.revokeObjectURL(imageSrc);
    };
});
