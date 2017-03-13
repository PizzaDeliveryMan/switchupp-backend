var el = document.querySelector('#homepageContent .col');

var homepageContent = anime({
    targets: el,
    translateY: -250,
    duration: 5000
});

var obj = { charged: '0%' };

var JSobject = anime({
  targets: obj,
  charged: '100%',
  round: 1,
  easing: 'linear',
  update: function() {
    var el = document.querySelector('#JSobject pre');
    el.innerHTML = JSON.stringify(obj);
  }
});
