// Function to filter videos based on the category
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category'); // Get the category from the button
        const allItems = document.querySelectorAll('.portfolio-item'); // Select all portfolio items
        
        // Remove the 'active' class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        
        // Add the 'active' class to the clicked button
        this.classList.add('active');

        // Show all items if 'all' is selected, otherwise filter by category
        allItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'inline-block'; // Show items that match the category
            } else {
                item.style.display = 'none'; // Hide other items
            }
        });
    });
});

// Play one video at a time (for both <video> and <iframe>)
const videos = document.querySelectorAll('video'); // Select all video elements
const iframes = document.querySelectorAll('iframe'); // Select all iframe elements

// Handle video elements
videos.forEach(video => {
    video.addEventListener('play', function() {
        // Pause all other videos when one starts playing
        videos.forEach(v => {
            if (v !== video) {
                v.pause();
            }
        });
        // Stop all iframe videos when a native video starts playing
        iframes.forEach(iframe => {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        });
    });
});

// Handle iframe elements (assuming they are YouTube or compatible with postMessage)
iframes.forEach(iframe => {
    iframe.addEventListener('mouseenter', function() {
        const iframeWindow = iframe.contentWindow;

        iframeWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*'); // Play the iframe video

        // Pause all other iframes when this one starts playing
        iframes.forEach(i => {
            if (i !== iframe) {
                i.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        });
        
        // Pause all native video elements when an iframe starts playing
        videos.forEach(v => {
            v.pause();
        });
    });
});
