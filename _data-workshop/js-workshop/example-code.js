document.querySelectorAll('a[href*="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        var scrollAim = document.querySelector(href);

        // Abbrechen wenn kein Sprungziel gefunden
        if (!scrollAim) return;

        // Automatisches Scrollen verhindern
        e.preventDefault();

        // Zum Sprungziel animiert scrollen
        scrollAim.scrollIntoView({ behavior: 'smooth' });
    });
});
