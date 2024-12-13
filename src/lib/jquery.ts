import $ from 'jquery';

// Enhanced Reader Navigation
export const initReaderNavigation = () => {
  $(document).on('keydown', (e) => {
    // Left arrow for previous page
    if (e.keyCode === 37) {
      $('.reader-prev-page').trigger('click');
    }
    // Right arrow for next page
    if (e.keyCode === 39) {
      $('.reader-next-page').trigger('click');
    }
  });

  // Smooth scrolling for scroll reader
  $('.chapter-navigation a').on('click', function(e) {
    e.preventDefault();
    const target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target as string).offset()?.top || 0
    }, 500);
  });
};

// Enhanced Image Loading
export const initLazyLoading = () => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  $('.lazy').each(function() {
    imageObserver.observe(this);
  });
};

// Enhanced UI Animations
export const initUIAnimations = () => {
  // Smooth fade-in for manga cards
  $('.manga-card').css('opacity', 0).each(function(i) {
    $(this).delay(i * 100).animate({ opacity: 1 }, 500);
  });

  // Hover effects for manga cards
  $('.manga-card').hover(
    function() {
      $(this).find('.manga-info').slideDown(200);
    },
    function() {
      $(this).find('.manga-info').slideUp(200);
    }
  );
};

// Enhanced Search Functionality
export const initSearchEnhancements = () => {
  let searchTimeout: NodeJS.Timeout;

  $('#search-input').on('input', function() {
    const query = $(this).val() as string;
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      if (query.length >= 2) {
        // Show loading indicator
        $('#search-loading').show();

        // Simulate API call (replace with actual API call)
        setTimeout(() => {
          $('#search-results').html(`
            <div class="search-results-container">
              <!-- Results will be populated here -->
            </div>
          `);
          $('#search-loading').hide();
        }, 500);
      }
    }, 300);
  });
};

// Initialize all jQuery enhancements
export const initJQueryEnhancements = () => {
  $(document).ready(() => {
    initReaderNavigation();
    initLazyLoading();
    initUIAnimations();
    initSearchEnhancements();
  });
};