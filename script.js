// Placeholder for future interactivity (dropdowns, search, etc.)
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
        alert('This link is not functional in demo mode.');
      }
    });
  });