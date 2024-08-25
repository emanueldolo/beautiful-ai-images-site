const accessKey = 'Yyp065C2Lk8RAhyryHw7zplEV-4SsBM-SHrhrtx3f4Vo';  // Replace with your actual Unsplash Access Key
const query = 'parkour';  // Replace with your desired category or keyword
const count = 10;  // Number of random images to fetch each time
let isLoading = false;  // To prevent multiple requests at once

async function fetchImages() {
    if (isLoading) return;
    isLoading = true;

    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${query}&count=${count}`);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const images = await response.json();
        console.log('Fetched random images:', images);  // Log the data to verify structure

        const gallery = document.getElementById('image-gallery');
        gallery.innerHTML = '';  // Clear the gallery to avoid duplicates

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
    } finally {
        isLoading = false;
    }
}

// Initial fetch to load random images when the page loads
fetchImages();
