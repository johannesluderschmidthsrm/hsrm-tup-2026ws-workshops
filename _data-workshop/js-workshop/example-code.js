$('a[href*="#"]').click(function (e) {
    var href = $(this).attr('href'),
        $scrollAim = $(href);

    // Abbrechen wenn kein Sprungziel gefunden         
    if ($scrollAim.length == 0) return;

    // Automatisches Scrollen verhindern
    e.preventDefault();
    
    // Zum Sprungziel animieren
    $('html,body').animate({
        scrollTop: $scrollAim.offset().top
    }, 700);
});