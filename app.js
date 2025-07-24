document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');

    mobileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        mobileNav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-container') && !e.target.closest('.mobile-nav')) {
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    // Slider functionality
    const sliderContainer = document.querySelector('.slider-container');
    const sliderTrack = document.querySelector('.slider-track');
    const sliderFill = document.querySelector('.slider-fill');
    const sliderThumb = document.querySelector('.slider-thumb');
    const sliderValue = document.querySelector('.slider-value');

    let isDragging = false;
    let currentValue = 200; // Starting value

    // Update slider position and value
    function updateSlider(percentage) {
        percentage = Math.max(0, Math.min(100, percentage));
        
        sliderFill.style.width = percentage + '%';
        sliderThumb.style.left = percentage + '%';
        
        // Calculate employee count based on percentage
        if (percentage <= 10) {
            currentValue = Math.round(percentage * 10 / 10);
        } else if (percentage <= 20) {
            currentValue = Math.round(10 + (percentage - 10) * 10 / 10);
        } else if (percentage <= 40) {
            currentValue = Math.round(20 + (percentage - 20) * 30 / 20);
        } else if (percentage <= 70) {
            currentValue = Math.round(50 + (percentage - 40) * 50 / 30);
        } else if (percentage <= 90) {
            currentValue = Math.round(100 + (percentage - 70) * 100 / 20);
        } else {
            currentValue = Math.round(200 + (percentage - 90) * 100 / 10);
        }
        
        // Update display
        if (currentValue >= 300) {
            sliderValue.textContent = '300+';
        } else {
            sliderValue.textContent = currentValue;
        }
        
        // Price remains unchanged - keeping original price display
    }

    // Mouse events for slider
    sliderThumb.addEventListener('mousedown', function(e) {
        isDragging = true;
        e.preventDefault();
    });

    // Click on track to move slider
    sliderTrack.addEventListener('click', function(e) {
        if (e.target === sliderThumb) return;
        
        const rect = sliderTrack.getBoundingClientRect();
        const percentage = ((e.clientX - rect.left) / rect.width) * 100;
        updateSlider(percentage);
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const rect = sliderTrack.getBoundingClientRect();
        const percentage = ((e.clientX - rect.left) / rect.width) * 100;
        updateSlider(percentage);
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Touch events for mobile
    sliderThumb.addEventListener('touchstart', function(e) {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const rect = sliderTrack.getBoundingClientRect();
        const percentage = ((touch.clientX - rect.left) / rect.width) * 100;
        updateSlider(percentage);
        e.preventDefault();
    });

    document.addEventListener('touchend', function() {
        isDragging = false;
    });

    // Initialize slider at 200 employees (around 90% position)
    updateSlider(90);
});
