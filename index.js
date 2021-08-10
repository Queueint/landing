ScrollReveal().reveal('.revealRight',  { delay: '100', distance: '100%', opacity: 0, origin: 'right' });
ScrollReveal().reveal('.revealLeft',   { delay: '100', distance: '100%', opacity: 0, origin: 'left' });
ScrollReveal().reveal('.revealBottom', { delay: '100', distance: '100%', opacity: 0, origin: 'bottom' });
ScrollReveal().reveal('.iconContainer', {
  delay: '0',
  duration: '2000',
  rotate: {z: 180},
  scale: 0,
  reset: true,
});

window.addEventListener('load', () => {
  const nav = document.getElementsByClassName('nav')[0];
  const navBurgerButton = document.querySelector('.nav .burger');
  navBurgerButton.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
  const navCloseButton = document.querySelector('.nav .close');
  navCloseButton.addEventListener('click', () => {
    nav.classList.remove('active');
  });
  const navItems = document.querySelectorAll('.nav .nav-item');
  navItems.forEach(navItem => {
    if (!navItem.classList.contains('select')) {
      navItem.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    }
  });

  const allSelects = document.querySelectorAll('.select');
  allSelects.forEach(selectElement => {
    selectElement.addEventListener('click', () => {
      selectElement.classList.toggle('active');
    });
  });

  const handleScrollY = () => {
    const header = document.getElementsByClassName('header')[0];
    const body = document.getElementsByClassName('body')[0];
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
      body.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      body.classList.remove('scrolled');
    }

    const links = document.querySelectorAll('.nav a');
    let foundCurrent = false;
    links.forEach((link, i) => {
      const href = link.getAttribute('href');
      if (!href.startsWith('#')) {
        return;
      }
      const target = document.querySelector(href);
      const targetY = target.offsetTop - 1;
      if (window.scrollY > targetY) {
        link.classList.add('current');
        foundCurrent = true;
        if (i > 0) {
          links[i - 1].classList.remove('current');
        }
      } else {
        link.classList.remove('current');
      }
    });
    if (!foundCurrent) {
      links[0].classList.add('current');
    }
  };
  document.addEventListener('scroll', handleScrollY);
  handleScrollY();
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
