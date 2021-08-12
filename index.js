window.addEventListener('load', () => {
  const nav = document.getElementsByClassName('nav')[0];
  const navBurgerButton = document.querySelector('.nav .burger');
  navBurgerButton.addEventListener('click', () => {
    nav.classList.add('active');
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

  const handleViewportChange = () => {
    const desktopHeaderY = 40;
    const mobileHeaderY = 10;
    const mobileWidth = 1117;
    const isMobile = window.innerWidth <= mobileWidth;
    const requiredScrollY = isMobile ? mobileHeaderY : desktopHeaderY;

    const handleHeader = () => {
      const header = document.getElementsByClassName('header')[0];
      if (window.scrollY > requiredScrollY) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    const handleBody = () => {
      const body = document.getElementsByClassName('body')[0];
      if (window.scrollY > requiredScrollY) {
        body.classList.add('scrolled');
      } else {
        body.classList.remove('scrolled');
      }
    };

    const handleLinks = () => {
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

    const handleCarousel = () => {
      const isRtl = document.dir === 'rtl';
      const chevronNext = isRtl ? '<i class="fas fa-chevron-left"></i>' : '<i class="fas fa-chevron-right"></i>';
      const chevronPrev = isRtl ? '<i class="fas fa-chevron-right"></i>' : '<i class="fas fa-chevron-left"></i>';
      const makeButton = (icon, direction) => `<button type="button" class="slick-${direction}">${icon}</button>`;
      const element = $('.advantages-screen .snake');
      const isSlicked = element[0].classList.contains('slick-initialized');
      if (isMobile) {
        if (!isSlicked) {
          element.slick({
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            pauseOnFocus: true,
            pauseOnDotsHover: true,
            rtl: isRtl,
            nextArrow: makeButton(chevronNext, 'next'),
            prevArrow: makeButton(chevronPrev, 'prev'),
          });
        }
      } else {
        if (isSlicked) {
          element.slick('unslick');
        }
      }
    };

    handleHeader();
    handleBody();
    handleLinks();
    handleCarousel();
  };
  document.addEventListener('scroll', handleViewportChange);
  window.addEventListener('resize', handleViewportChange);
  handleViewportChange();

  const firstNameElement = document.getElementById('contact-form-first-name');
  const lastNameElement = document.getElementById('contact-form-last-name');
  const emailElement = document.getElementById('contact-form-email');
  const messageElement = document.getElementById('contact-form-message');
  const formFields = [firstNameElement, lastNameElement, emailElement, messageElement];
  const statusMessageElement = document.getElementById('contact-form-status-message');
  const submitButton = document.getElementById('contact-form-submit');
  
  const validationErrors = {
    firstName: false,
    lastName: false,
    email: false,
    message: false,
  };

  const formIsInvalid = () => Object.values(validationErrors).reduce((prev, cur) => prev || cur);
  const makeInputErrored = element => element.closest('.input-container').classList.add('errored');

  const handleSubmitButton = () => {
    const requiredFormFields = formFields.filter(field => field !== messageElement);
    const formLacksRequired = () => requiredFormFields
      .map(field => field.value.trim())
      .reduce((prev, cur) => prev || cur === '', false);
    
    if (formIsInvalid() || formLacksRequired()) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  };
  handleSubmitButton();

  const handleValidation = () => {
    const isString = (s) => typeof s === 'string' || s instanceof String;
    const isEmail = (s) => isString(s) && /^.+@.+\..+$/u.test(s);
    const makeInputNotErrored = element => element.closest('.input-container').classList.remove('errored');
  
    const updateErrorMessage = () => {
      const setMessage = (text) => statusMessageElement.innerText = text;
      const setErrorMessage = (errorKey) => setMessage(statusMessageElement.getAttribute(errorKey));
  
      let errored = false;
      if (validationErrors.firstName || validationErrors.lastName) {
        setErrorMessage('data-name-validation-text');
        errored = true;
      }
      if (validationErrors.email) {
        setErrorMessage('data-email-validation-text');
        errored = true;
      }
      if (validationErrors.message) {
        setErrorMessage('data-message-validation-text');
        errored = true;
      }
      if (errored) {
        statusMessageElement.classList.add('error');
      } else {
        statusMessageElement.classList.remove('error');
        setMessage('');
      }
      handleSubmitButton();
    };
  
    firstNameElement.addEventListener('input', () => {
      const value = firstNameElement.value.trim();
      const isInvalid = !value || !isString(value) || !/^[a-zA-Zא-ת ]+$/u.test(value);
      if (isInvalid) {
        makeInputErrored(firstNameElement)
        validationErrors.firstName = true;
      } else {
        makeInputNotErrored(firstNameElement)
        validationErrors.firstName = false;
      }
      updateErrorMessage();
    });
  
    lastNameElement.addEventListener('input', () => {
      const value = lastNameElement.value.trim();
      const isInvalid = !value || !isString(value) || !/^[א-תa-zA-Z ]+$/u.test(value);
      if (isInvalid) {
        makeInputErrored(lastNameElement)
        validationErrors.lastName = true;
      } else {
        makeInputNotErrored(lastNameElement)
        validationErrors.lastName = false;
      }
      updateErrorMessage();
    });
  
    emailElement.addEventListener('input', () => {
      const value = emailElement.value.trim();
      const isInvalid = !value || !isEmail(value);
      if (isInvalid) {
        makeInputErrored(emailElement)
        validationErrors.email = true;
      } else {
        makeInputNotErrored(emailElement)
        validationErrors.email = false;
      }
      updateErrorMessage();
    });
  
    messageElement.addEventListener('input', () => {
      const value = messageElement.value.trim();
      const isInvalid = value && (!isString(value) || !/^[א-תa-zA-Z0-9 \n\r,.!?@#$%^&*():\\/\[\]'"=+_`~\-]+$/u.test(value));
      if (isInvalid) {
        makeInputErrored(messageElement)
        validationErrors.message = true;
      } else {
        makeInputNotErrored(messageElement)
        validationErrors.message = false;
      }
      updateErrorMessage();
    });
  };
  handleValidation();

  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', e => {
    const formTargetUrl = 'https://api.q-int.com/contact';

    e.preventDefault();

    if (formIsInvalid()) {
      return;
    }

    const getValues = () => {
      const [firstName, lastName, email, message] = formFields;
      return {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        emailAddress: email.value.trim(),
        message: message.value.trim(),
      };
    };
    const { firstName, lastName, emailAddress, message } = getValues();
    const request = new Request(formTargetUrl, {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, emailAddress, message }),
      headers: { 'Content-Type': 'application/json' },
    });

    const setFormDisable = (disabled) => {
      submitButton.disabled = disabled;
      formFields.forEach(field => field.disabled = disabled);
    };
    const disableForm = () => setFormDisable(true);
    const enableForm = () => setFormDisable(false);

    statusMessageElement.innerText = '';
    statusMessageElement.classList.remove('error');
    disableForm();
    fetch(request)
      .then(response => {
        if (response.ok) {
          contactForm.reset();
          submitButton.innerText = submitButton.getAttribute('data-success-text');
          submitButton.classList.add('success');

        } else {
          enableForm();
          statusMessageElement.classList.add('error');
          let figuredOutError = false;

          if (response.status === 400) {
            response.text()
              .then(errorMessage => {
                const parts = errorMessage.split('/');
                if (parts.length === 2 && parts[0] === 'validation') {
                  const erroredField = parts[1];
                  switch (erroredField) {
                    case 'firstName':
                    case 'lastName': {
                      statusMessageElement.innerText = statusMessageElement.getAttribute('data-name-validation-text');
                      makeInputErrored(firstNameElement);
                      makeInputErrored(lastNameElement);
                      figuredOutError = true;
                      break;
                    }
                    case 'emailAddress': {
                      statusMessageElement.innerText = statusMessageElement.getAttribute('data-email-validation-text');
                      makeInputErrored(emailElement);
                      figuredOutError = true;
                      break;
                    }
                    case 'message': {
                      statusMessageElement.innerText = statusMessageElement.getAttribute('data-message-validation-text');
                      makeInputErrored(messageElement);
                      figuredOutError = true;
                      break;
                    }
                  }
                }
              })
              .catch(err => console.error(err))
              .finally(() => {
                if (!figuredOutError) {
                  statusMessageElement.innerText = statusMessageElement.getAttribute('data-generic-error-text');
                }
              });
          }
        }
      })
      .catch(err => {
        enableForm();
        statusMessageElement.classList.add('error');
        statusMessageElement.innerText = statusMessageElement.getAttribute('data-generic-error-text');
        console.error(err);
      });
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
  }
}
