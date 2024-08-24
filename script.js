const images = [
    {
        title: "AI Sunrise",
        description: "A breathtaking sunrise imagined by AI.",
        date: "2024-08-18",
        url: "https://via.placeholder.com/300x200.png?text=AI+Sunrise"
    },
    {
        title: "AI Ocean",
        description: "An AI's interpretation of a serene ocean.",
        date: "2024-08-19",
        url: "https://via.placeholder.com/300x200.png?text=AI+Ocean"
    },
    {
        title: "AI Forest",
        description: "A mystical forest created by artificial intelligence.",
        date: "2024-08-20",
        url: "https://via.placeholder.com/300x200.png?text=AI+Forest"
    }
];

const gallery = document.getElementById('image-gallery');

images.forEach(image => {
    const imageCard = document.createElement('div');
    imageCard.className = 'image-card';

    imageCard.innerHTML = `
        <img src="${image.url}" alt="${image.title}">
        <h2>${image.title}</h2>
        <p>${image.description}</p>
        <small>${image.date}</small>
    `;

    gallery.appendChild(imageCard);
});
