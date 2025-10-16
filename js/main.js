(function ($) {
    "use strict";
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Modal Video para video local
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
            $("#localVideo source").attr('src', $videoSrc);
            $("#localVideo")[0].load();
        });
        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#localVideo")[0].pause();
            $("#localVideo source").attr('src', '');
            $("#localVideo")[0].load();
        });
    });


    // Service and team carousel
    $(".service-carousel, .team-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

<script>
document.addEventListener("DOMContentLoaded", function () {
  const gridSize = 12;
  const words = [
    "CELULA", "ADN", "MEMBRANA", "RIBOSOMA",
    "NUCLEO", "MITOCONDRIA", "CLOROFILA",
    "VACUOLA", "CITOPLASMA", "ENZIMA"
  ];

  const wordsearch = document.getElementById("wordsearch");
  const status = document.getElementById("status-sopa");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let grid = [];

  function createEmptyGrid() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
  }

  function placeWords() {
    for (let word of words) {
      let placed = false;
      let tries = 0;

      while (!placed && tries < 100) {
        tries++;
        const dir = Math.random() < 0.5 ? "H" : "V";
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);

        if (dir === "H" && col + word.length <= gridSize) {
          if (grid[row].slice(col, col + word.length).every(l => l === "")) {
            for (let i = 0; i < word.length; i++) grid[row][col + i] = word[i];
            placed = true;
          }
        } else if (dir === "V" && row + word.length <= gridSize) {
          let fits = true;
          for (let i = 0; i < word.length; i++) {
            if (grid[row + i][col] !== "") fits = false;
          }
          if (fits) {
            for (let i = 0; i < word.length; i++) grid[row + i][col] = word[i];
            placed = true;
          }
        }
      }
    }
  }

  function fillRandomLetters() {
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (grid[r][c] === "") {
          grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
  }

  function renderGrid() {
    wordsearch.innerHTML = "";
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.textContent = grid[r][c];
        div.dataset.row = r;
        div.dataset.col = c;
        div.addEventListener("click", () => toggleSelect(div));
        wordsearch.appendChild(div);
      }
    }
  }

  let selected = [];

  function toggleSelect(cell) {
    cell.classList.toggle("selected");
    const key = cell.dataset.row + "-" + cell.dataset.col;
    if (selected.includes(key)) selected = selected.filter(k => k !== key);
    else selected.push(key);
    checkWord();
  }

  function checkWord() {
    const lettersSelected = selected.map(k => {
      const [r, c] = k.split("-").map(Number);
      return grid[r][c];
    }).join("");

    for (let word of words) {
      if (lettersSelected === word) {
        document.querySelectorAll(".cell.selected").forEach(c => {
          c.classList.add("found");
          c.classList.remove("selected");
        });
        selected = [];
        status.textContent = `¡Encontraste ${word}! 🎉`;
      }
    }
  }

  document.getElementById("reset-sopa").addEventListener("click", () => {
    init();
    status.textContent = "";
  });

  function init() {
    createEmptyGrid();
    placeWords();
    fillRandomLetters();
    renderGrid();
  }

  init();
});
</script>
