const $btnOpenCloseMenu = $(".header-nav__open-close-menu-button");
const $asideMenu = $(".aside-menu");
const $asideMenuCloseButton = $c('.btn--menu', $asideMenu);

$btnOpenCloseMenu.addEventListener('click', e => {
    $asideMenu.classList.toggle('aside-menu--show');
}, false);

$asideMenuCloseButton.addEventListener('click', e => {
    $asideMenu.classList.toggle('aside-menu--show');
}, false);