const accessKey = 'yp065C2Lk8RAhyryHw7zplEV-4SsBM-SHrhrtx3f4Vo';  // Replace with your Unsplash Access Key
const query = 'parkour';  // Replace with your desired category or keyword
const perPage = 10;  // Number of images per request
let page = 1;  // Current page number
let isLoading = false;  // To prevent multiple requests at once

async function fetchImages() {
    if (isLoading) return;
    isLoading = true;

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${query}&per_page=${perPage}&page=${page}`);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        const images = data.results;

        const gallery = document.getElementById('image-gallery');
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

        // Update page number for the next fetch
        page += 1;
    } catch (error) {
        console.error('Error fetching images:', error);
    } finally {
        isLoading = false;
    }
}

function handleScroll() {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (nearBottom && !isLoading) {
        fetchImages();
    }
}

// Initial fetch to load images when the page loads
fetchImages();

// Add scroll event listener
window.addEventListener('scroll', handleScroll);
