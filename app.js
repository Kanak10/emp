
document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');

    mobileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        mobileNav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-container') && !e.target.closest('.mobile-nav')) {
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    document.querySelectorAll('.mobile-nav-item.dropdown > .mobile-nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });

    // Slider functionality
    const sliderTrack = document.querySelector('.slider-track');
    const sliderFill = document.querySelector('.slider-fill');
    const sliderThumb = document.querySelector('.slider-thumb');
    const sliderValue = document.querySelector('.slider-value');

    let isDragging = false;
    let currentValue = 200;

    function updateSlider(percentage) {
        percentage = Math.max(0, Math.min(100, percentage));
        sliderFill.style.width = percentage + '%';
        sliderThumb.style.left = percentage + '%';

        if (percentage <= 10) {
            currentValue = Math.round(percentage);
        } else if (percentage <= 20) {
            currentValue = Math.round(10 + (percentage - 10));
        } else if (percentage <= 40) {
            currentValue = Math.round(20 + (percentage - 20) * 1.5);
        } else if (percentage <= 70) {
            currentValue = Math.round(50 + (percentage - 40) * 1.67);
        } else if (percentage <= 90) {
            currentValue = Math.round(100 + (percentage - 70) * 5);
        } else {
            currentValue = Math.round(200 + (percentage - 90) * 10);
        }

        sliderValue.textContent = currentValue >= 300 ? '300+' : currentValue;
    }

    sliderThumb.addEventListener('mousedown', function (e) {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        const rect = sliderTrack.getBoundingClientRect();
        const percentage = ((e.clientX - rect.left) / rect.width) * 100;
        updateSlider(percentage);
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });

    sliderTrack.addEventListener('click', function (e) {
        if (e.target === sliderThumb) return;
        const rect = sliderTrack.getBoundingClientRect();
        const percentage = ((e.clientX - rect.left) / rect.width) * 100;
        updateSlider(percentage);
    });

    sliderThumb.addEventListener('touchstart', function (e) {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('touchmove', function (e) {
        if (!isDragging) return;
        const touch = e.touches[0];
        const rect = sliderTrack.getBoundingClientRect();
        const percentage = ((touch.clientX - rect.left) / rect.width) * 100;
        updateSlider(percentage);
    });

    document.addEventListener('touchend', function () {
        isDragging = false;
    });

    updateSlider(90); // Initialize
});

