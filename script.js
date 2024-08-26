const accessKey = 'yp065C2Lk8RAhyryHw7zplEV-4SsBM-SHrhrtx3f4Vo';  // Replace with your Unsplash Access Key
const query = 'parkour';  // Replace with your desired category or keyword
const count = 10;  // Number of random images to fetch per request
let isLoading = false;  // To prevent multiple requests at once

async function fetchImages() {
    if (isLoading) return;
    isLoading = true;

    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}&query=${query}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch images: ${response.statusText}`);
        }
        const images = await response.json();

        const gallery = document.getElementById('image-gallery');

        images.forEach(image => {
            // Create image card for each image from Unsplash
            const imageCard = document.createElement('div');
            imageCard.className = 'image-card';
            imageCard.innerHTML = `
                <img src="${image.urls.small}" alt="${image.alt_description || 'No description'}">
                <h2>${image.description || "Untitled"}</h2>
                <p>Photo by ${image.user.name}</p>
            `;
            gallery.appendChild(imageCard);

            // Trigger fade-in effect
            setTimeout(() => {
                imageCard.classList.add('visible');
            }, 100); // Small delay to ensure card is added to DOM before animation starts

            // Add click event listener to open lightbox
            imageCard.addEventListener('click', () => {
                openLightbox(image.urls.full);
            });
        });

    } catch (error) {
        console.error('Error fetching images:', error);
        const gallery = document.getElementById('image-gallery');
        gallery.innerHTML = '<p>Sorry, we couldn’t load the images. Please try again later.</p>';
    } finally {
        isLoading = false;
    }
}

function handleScroll() {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (nearBottom && !isLoading) {
        fetchImages();  // Fetch more images when near the bottom of the page
    }
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex'; // Show lightbox
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none'; // Hide lightbox
}

// Add event listener to close the lightbox
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeLightbox();
    }
});

// Initial fetch
fetchImages();

// Add event listener for scrolling
window.addEventListener('scroll', handleScroll);
