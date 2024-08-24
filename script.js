const accessKey = 'yp065C2Lk8RAhyryHw7zplEV-4SsBM-SHrhrtx3f4Vo';  // Replace with your actual Unsplash Access Key

async function fetchImages() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}&per_page=6`);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const images = await response.json();

        const gallery = document.getElementById('image-gallery');
        gallery.innerHTML = '';  // Clear any existing content

        images.forEach(image => {
            const imageCard = document.createElement('div');
            imageCard.className = 'image-card';

            imageCard.innerHTML = `
                <img src="${image.urls.small}" alt="${image.alt_description}">
                <h2>${image.description || "Untitled"}</h2>
                <p>Photo by ${image.user.name}</p>
                <small>${new Date(image.created_at).toLocaleDateString()}</small>
            `;

            gallery.appendChild(imageCard);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
        const gallery = document.getElementById('image-gallery');
        gallery.innerHTML = '<p>Sorry, we couldn’t load the images. Please try again later.</p>';
    }
}

// Call the function to load images when the page loads
fetchImages();
