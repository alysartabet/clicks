
//Menu toggling
const menuIcon = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');

if (menuIcon && mobileMenu) {
  menuIcon.addEventListener('click', () => {
    mobileMenu.style.display =
      mobileMenu.style.display === 'flex' ? 'none' : 'flex';
  });
}


// Carousel setup for index.html
  function setupInfiniteCarousel(leftId, rightId, trackId) {
    const left = document.getElementById(leftId);
    const right = document.getElementById(rightId);
    const track = document.getElementById(trackId);
    if (!left || !right || !track) return;

    const wrapper = track.parentElement;
    const items = track.querySelectorAll('.product-box');
    if (items.length === 0) return;
  
    const itemWidth = items[0].offsetWidth;
    const visibleCount = 3;
    const scrollByAmount = itemWidth * visibleCount;
  
    right.addEventListener("click", () => {
      wrapper.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
    });
  
    left.addEventListener("click", () => {
      wrapper.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    setupInfiniteCarousel('left-garden', 'right-garden', 'garden-track');
    setupInfiniteCarousel('left-church', 'right-church', 'church-track');
  });
  

//Link blocker
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
        alert('For the Markov Chain project, click only Home and About pages.');
      }
    });
  });

  // Track page transitions
const currentPage = window.location.pathname; // "/index.html" or "/about.html"
const prevPage = localStorage.getItem('prevPage');

if (prevPage) {
  const key = `${prevPage}->${currentPage}`;
  const count = parseInt(localStorage.getItem(key) || "0");
  localStorage.setItem(key, count + 1);
}

localStorage.setItem('prevPage', currentPage);

//PageRank logic
function computeDynamicPageRank() {
  const aToB = parseInt(localStorage.getItem('/index.html->/about.html') || "0");
  const bToA = parseInt(localStorage.getItem('/about.html->/index.html') || "0");
  const aToA = parseInt(localStorage.getItem('/index.html->/index.html') || "0");
  const bToB = parseInt(localStorage.getItem('/about.html->/about.html') || "0");

  const smooth = 1; // Prevent divide-by-zero
  const totalFromHome = aToB + aToA + smooth;
  const totalFromAbout = bToA + bToB + smooth;

  const transitionMatrix = [
    [aToA / totalFromHome, aToB / totalFromHome],
    [bToA / totalFromAbout, bToB / totalFromAbout]
  ];

  // Approximate PageRank via power iteration
  let rank = [0.8, 0.2]; // Start at Home page more likely to be visited

  for (let i = 0; i < 20; i++) {
    rank = [
      rank[0] * transitionMatrix[0][0] + rank[1] * transitionMatrix[1][0],
      rank[0] * transitionMatrix[0][1] + rank[1] * transitionMatrix[1][1]
    ];
  }

  // Inject into DOM
  const matrixEl = document.getElementById("matrix");
const pagerankEl = document.getElementById("pagerank");

if (matrixEl && pagerankEl) {
  const m = transitionMatrix.map(row => 
    `| ${row.map(x => x.toFixed(3)).join("   ")} |`
  ).join("<br>");
  matrixEl.innerHTML = m;

  pagerankEl.innerHTML = `π = [ ${rank[0].toFixed(3)}, ${rank[1].toFixed(3)} ]`;
}
updateChart(rank);
}

//Live Updating Chart
let chart;

function updateChart(rank) {
  if (!chart) {
    const ctx = document.getElementById('rankChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Home', 'About'],
        datasets: [{
          label: 'Stationary Distribution (PageRank)',
          data: rank,
          backgroundColor: ['#7fb3d5', '#f1948a']
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 1
          }
        }
      }
    });
  } else {
    chart.data.datasets[0].data = rank;
    chart.update();
  }
}
