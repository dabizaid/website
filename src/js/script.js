(function () {
    var body = document.querySelector('body');
    // Add loaded class after 6 seconds
    setTimeout(function () {
        body.classList.toggle('loaded');
        window.scrollTo(0, 0);
        setTimeout(function () {
            document.querySelector('#skyline-section').classList.toggle('loaded');
        }, 2000)
    }, 6000);

    // Add click listener to do smooth scroll
    document.getElementById('scrollButton').onclick = scrollToAbout;
    function scrollToAbout() {
        document.querySelector('#about__section').scrollIntoView({
            behavior: 'smooth'
        });
    }
})();