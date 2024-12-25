// Navbar behavier
export function navHandler() {
    const burger = document.getElementById('burger');
    const overlay = document.getElementById('overlay');

    if (burger) {
        burger.addEventListener('click', function (event: MouseEvent) {
            event.stopPropagation();
            if (overlay) {
                overlay.classList.toggle('active');
            }
        });
    }

    document.addEventListener('click', function () {
        if (overlay && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
        }
    });
}