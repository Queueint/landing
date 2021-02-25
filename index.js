ScrollReveal().reveal('.revealRight',  { delay: '100', distance: '100%', opacity: 0, origin: 'right' });
ScrollReveal().reveal('.revealLeft',   { delay: '100', distance: '100%', opacity: 0, origin: 'left' });
ScrollReveal().reveal('.revealBottom', { delay: '100', distance: '100%', opacity: 0, origin: 'bottom' });

window.addEventListener('load', () => {
  const nav = document.getElementsByClassName('nav')[0];
  const navButton = document.querySelector('.nav .btn');
  navButton.addEventListener('click', clickInsideEvent => {
    nav.classList.toggle('active');

    const onClickOutside = clickOutsideEvent => {
      if (clickInsideEvent !== clickOutsideEvent) {
        nav.classList.remove('active');
        document.removeEventListener('click', onClickOutside);
      }
    };
    document.addEventListener('click', onClickOutside);
  });
});

function emitEvent(event) {
  switch (event) {
    case 'loginHeader': {
      gtag('event', 'sign_up', { event_category: 'engagement', value: 'header' });
      break;
    }
    case 'loginFreeQueues': {
      gtag('event', 'sign_up', { event_category: 'engagement', value: 'freeQueues' });
      break;
    }
    case 'loginBottom': {
      gtag('event', 'sign_up', { event_category: 'engagement', value: 'bottom' });
      break;
    }
    case 'contactAdvertise': {
      gtag('event', 'contact', { event_category: 'engagement', value: 'advertise' });
      break;
    }
    case 'contactPhone': {
      gtag('event', 'contact', { event_category: 'engagement', value: 'phone' });
      break;
    }
    case 'contactEmail': {
      gtag('event', 'contact', { event_category: 'engagement', value: 'email' });
      break;
    }
  }
}
