
function addNavi() {
    document.addEventListener("DOMContentLoaded", function () {

        function setNavi() {
            var location = window.location.pathname.replace(/^\//, '');
            console.log('location:', location);
            var $activeLink = document.querySelector("a[href='" + location + "']");
            console.log('location:', $activeLink);
            if ($activeLink) {
                $activeLink.classList.add("active");
            }
        }

        if (document.querySelector("#main-header")) {
            setNavi();
        } else {
            fetch("index.html")
                .then(response => response.text())
                .then(data => {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(data, "text/html");
                    var mainNav = doc.querySelector("#main-header");
                    var body = document.querySelector("body");
                    body.insertBefore(mainNav, body.firstChild);
                    setNavi();
                });
        }
    });
}

function addGroup(number){
    document.addEventListener("DOMContentLoaded", function () {
        fetch(number + "/index.html")
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");

            // Ändere alle Bildquellen (src) in img-Tags
            var images = doc.querySelectorAll("img");
            images.forEach(img => {
                if (img.src) {
                    img.src = modifyPath(img.src, number); // Verwende modifyPath für das src-Attribut
                }
            });

            // Ändere alle Link-Href-Attribute in a-Tags
            var links = doc.querySelectorAll("a");
            links.forEach(link => {
                if (link.href) {
                    link.href = modifyPath(link.href, number); // Verwende modifyPath für das href-Attribut
                }
            });

            // Ändere alle Bild-Links in anderen Tags (wie <link>, <area> etc.)
            var otherLinks = doc.querySelectorAll("link, area");
            otherLinks.forEach(element => {
                if (element.href) {
                    element.href = modifyPath(element.href, number); // Verwende modifyPath für das href-Attribut
                }
            });


            var userProfilesSource = doc.querySelector("#user-profiles");
            var divUserProfilesTarget = document.querySelector("#user-profiles");
            divUserProfilesTarget.appendChild(userProfilesSource);
        }).catch(error => console.error('Error loading HTML:', error));
    });
}

// Hilfsfunktion, um sicherzustellen, dass der Pfad korrekt modifiziert wird
// Hilfsfunktion, um den relativen Pfad korrekt zu modifizieren
function modifyPath(path, number) {
    // Extrahiere die Basis-URL (aktuellen Pfad) ohne die Domain
    const currentUrl = window.location.href; // Hol die aktuelle URL
    const basePath = currentUrl.substring(0, currentUrl.lastIndexOf('/')); // Entferne den aktuellen Dateinamen (z.B. "workshop4.html")

    // Wenn der Pfad mit der Base-URL übereinstimmt, entferne den Basis-Pfad
    if (path && path.startsWith(basePath)) {
        path = path.replace(basePath, number);
    }

    // Überprüfen, ob der Pfad mit ./ oder / beginnt, um den relativen Pfad zu bearbeiten
    if (path && (path.startsWith('./') || path.startsWith('/'))) {
        // Entferne ./ oder / und füge {number}/ hinzu
        return number + '/' + path.replace(/^\.?\//, ''); // Remove './' or '/' from the beginning
    }

    return path;
}
