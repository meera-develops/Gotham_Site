document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('click', function() {
        card.classList.toggle('flipped');
    });
});
