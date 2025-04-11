document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentImageIndex = 0;
    let images = [];

    async function loadImages() {
        const fileNames = [
            'https://img.freepik.com/free-photo/amazing-view-green-cliff-near-sea-azores-archipelago-portugal_181624-48407.jpg',
            'https://img.freepik.com/free-photo/mountains-lake_1398-1033.jpg',
            'https://img.freepik.com/free-photo/spaghetti-with-chicken-cheese_140725-5476.jpg',
            'https://img.freepik.com/free-photo/mesmerizing-shot-famous-kirkjufellsfoss-mountain-barnafoss-river-iceland_181624-52987.jpg',
            'https://img.freepik.com/free-photo/ingredients-pasta_23-2147694275.jpg',
            'https://img.freepik.com/free-photo/breathtaking-view-green-landscape-with-trees-cloudy-sky-sunrise_181624-48807.jpg',
            'https://img.freepik.com/free-photo/plate-sausages-sauerkraut-wooden-table-traditional-oktoberfest-menu-flat-lay-top-view_2829-4161.jpg',
            'https://img.freepik.com/free-photo/aerial-shot-amazing-mountain-landscape-transylvania-romania_181624-29964.jpg',
            'https://img.freepik.com/free-photo/beautiful-lake-ritsa-caucasus-mountains-green-mountain-hills-blue-sky-with-clouds-spring-landscape_1217-1716.jpg',
            'https://img.freepik.com/premium-photo/high-angle-view-food-served-table_1048944-15460288.jpg',
            'https://img.freepik.com/premium-photo/ethiopian-traditional-famous-delicious-injera-flatbread_665346-19933.jpg',
            'https://img.freepik.com/free-photo/korean-food-kim-bap-steamed-rice-with-vegetables-seaweed_1150-42974.jpg',
        ];

        images = fileNames/*.map(file => `images/${file}`)*/;
        renderGallery();
    }
    
    function renderGallery() {
        gallery.innerHTML = '';
        images.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Фото ${index + 1}`;
            img.classList.add('thumbnail');
            img.addEventListener('click', () => openModal(index));
            gallery.appendChild(img);
        });
    }

    function openModal(index) {
        currentImageIndex = index;
        modalImg.src = images[index];
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }

    function navigate(direction) {
        currentImageIndex += direction;
        if (currentImageIndex >= images.length) currentImageIndex = 0;
        if (currentImageIndex < 0) currentImageIndex = images.length - 1;

        modalImg.classList.add('fade-out');

        setTimeout(() => {
            modalImg.src = images[currentImageIndex];

            modalImg.classList.remove('fade-out');
        }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.style.display || modal.style.display === 'none') return;

        switch (e.key) {
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
            case 'Escape':
                closeModal();
                break;
        }
    });

    loadImages();
})