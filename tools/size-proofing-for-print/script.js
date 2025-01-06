let scaleFactor = 0;
let aspectRatio = 1; // Placeholder for the image aspect ratio

document.getElementById('calibrate-button').addEventListener('click', () => {
    const measuredWidthCm = parseFloat(document.getElementById('measured-width').value);
    if (measuredWidthCm <= 0) {
        alert('Please enter a valid measured width in centimeters.');
        return;
    }

    // The box is fixed at 100 pixels wide
    const boxWidthPx = 100;
    scaleFactor = boxWidthPx / measuredWidthCm;

    alert(`Calibration complete! Scale factor is ${scaleFactor.toFixed(2)} pixels per cm.`);
});

document.getElementById('image-upload').addEventListener('change', (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) {
        alert('Please upload an image!');
        return;
    }

    const imageSrc = URL.createObjectURL(imageFile);
    const img = new Image();

    img.onload = function () {
        aspectRatio = img.width / img.height;
        alert(`Image loaded! Aspect ratio: ${aspectRatio.toFixed(2)} (width/height).`);
        URL.revokeObjectURL(imageSrc);
    };

    img.src = imageSrc;
});

// Real-time update for width input
document.getElementById('image-width').addEventListener('input', () => {
    const widthCm = parseFloat(document.getElementById('image-width').value);
    if (widthCm > 0) {
        const heightCm = (widthCm / aspectRatio).toFixed(2);
        document.getElementById('image-height').value = heightCm;
    }
});

// Real-time update for height input
document.getElementById('image-height').addEventListener('input', () => {
    const heightCm = parseFloat(document.getElementById('image-height').value);
    if (heightCm > 0) {
        const widthCm = (heightCm * aspectRatio).toFixed(2);
        document.getElementById('image-width').value = widthCm;
    }
});

document.getElementById('resize-button').addEventListener('click', () => {
    if (scaleFactor <= 0) {
        alert('Please calibrate your screen first.');
        return;
    }

    const widthCm = parseFloat(document.getElementById('image-width').value);
    const heightCm = parseFloat(document.getElementById('image-height').value);
    const imageFile = document.getElementById('image-upload').files[0];

    if (!imageFile) {
        alert('Please upload an image!');
        return;
    }

    if (!widthCm || !heightCm) {
        alert('Please enter valid dimensions.');
        return;
    }

    const widthPx = widthCm * scaleFactor;
    const heightPx = heightCm * scaleFactor;

    const imageSrc = URL.createObjectURL(imageFile);
    const imageContainer = document.getElementById('image-display');
    imageContainer.innerHTML = ''; // Clear previous content

    // Create a div with the image as a background
    const div = document.createElement('div');
    div.style.width = `${widthPx}px`;
    div.style.height = `${heightPx}px`;
    div.style.backgroundImage = `url(${imageSrc})`;
    div.style.backgroundSize = 'contain';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundPosition = 'center';

    imageContainer.appendChild(div);

    // Revoke the object URL to free memory
    div.onload = () => {
        URL.revokeObjectURL(imageSrc);
    };
});
