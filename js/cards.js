
const myCarousel = document.querySelector('#customerCommentsCarousel');
const carousel = new bootstrap.Carousel(myCarousel, {
  interval: 4000, // Tiempo en que cambia de tarjetas
  ride: 'carousel'
});
