window.addEventListener('load', windowLoad);
const header = document.querySelector('.header');
const html = document.documentElement;

function windowLoad() {
  document.addEventListener('click', documentActions);
  document.addEventListener('keydown', documentKeydown);
  html.classList.add('loaded');
  membershipSwitcher();
}
function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.closest('.icon-menu')) {
    html.classList.toggle('menu-open');
  } else if (html.classList.contains('menu-open') && !targetElement.closest('.navigation__menu')) {
    html.classList.remove('menu-open');
  }
}
function documentKeydown(e) {
  const keyElement = e.key;
  if (html.classList.contains('menu-open') && keyElement === 'Escape') {
    html.classList.remove('menu-open');
  }
}

function membershipSwitcher() {
  const membership = document.getElementById('asn-login-switch');

  if (!membership) return;

  membership.addEventListener('change', (e) => {
    if (!e.target.value) return;

    window.open(e.target.value, '_blank', 'noopener,noreferrer');
    e.target.selectedIndex = 0;
  });
}
if (document.querySelector('.swiper-benefits')) {
  const pagination = document.querySelector('.swiper-benefits__pagination');

  const swiper = new Swiper('.swiper-benefits', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 32,
    centeredSlides: false,
    rewind: true,
    speed: 700,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-benefits__arrow--next',
      prevEl: '.swiper-benefits__arrow--prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      501: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });

  function getSlidesPerView() {
    return Number(swiper.params.slidesPerView) || 1;
  }

  function updatePagination() {
    if (!pagination) return;

    pagination.innerHTML = '';

    const slidesPerView = getSlidesPerView();
    const totalDots = Math.ceil(swiper.slides.length / slidesPerView);

    for (let i = 0; i < totalDots; i++) {
      const bullet = document.createElement('span');

      bullet.classList.add('swiper-pagination-bullet');

      bullet.addEventListener('click', () => {
        swiper.slideTo(i * slidesPerView);
      });

      pagination.appendChild(bullet);
    }

    updateActiveBullet();
  }

  function updateActiveBullet() {
    if (!pagination) return;

    const slidesPerView = getSlidesPerView();
    const totalSlides = swiper.slides.length;
    const totalDots = Math.ceil(totalSlides / slidesPerView);

    let activeDot = Math.floor(swiper.activeIndex / slidesPerView);

    if (swiper.activeIndex >= totalSlides - slidesPerView) {
      activeDot = totalDots - 1;
    }

    pagination.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, index) => {
      bullet.classList.toggle('swiper-pagination-bullet-active', index === activeDot);
    });
  }

  updatePagination();

  swiper.on('slideChange', updateActiveBullet);
  swiper.on('breakpoint', updatePagination);
  window.addEventListener('resize', updatePagination);
}
if (document.querySelector('.accordion-collapse')) {
  function accordionMobileOnly() {
    const isMobile = window.innerWidth <= 767.98;

    document.querySelectorAll('.accordion-button').forEach((button) => {
      const target = button.getAttribute('data-bs-target');

      if (isMobile) {
        button.setAttribute('data-bs-toggle', 'collapse');
        button.classList.add('collapsed');
        button.setAttribute('aria-expanded', 'false');
      } else {
        button.removeAttribute('data-bs-toggle');
        button.classList.remove('collapsed');
        button.setAttribute('aria-expanded', 'true');
      }

      if (target) {
        const collapse = document.querySelector(target);

        if (collapse) {
          if (isMobile) {
            collapse.classList.add('collapse');
          } else {
            collapse.classList.remove('collapse');
            collapse.classList.add('show');
          }
        }
      }
    });
  }

  window.addEventListener('load', accordionMobileOnly);
  window.addEventListener('resize', accordionMobileOnly);
}
