(() => {
  const $ = (s, el = document) => el.querySelector(s);

  // Smooth scrolling for in-page anchors
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = $(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Close mobile menu if open
    const mobileMenu = $('#mobileMenu');
    if (mobileMenu) {
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });

  // Mobile nav toggle
  const menuBtn = $('.menu-btn');
  const mobileMenu = $('#mobileMenu');
  if (menuBtn && mobileMenu) {
    const setOpen = (open) => {
      menuBtn.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
    };

    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      setOpen(!expanded);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  const openWhatsApp = ({ number, message = '' }) => {
    const phone = String(number).replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Header / Hero WhatsApp buttons
  const bindWhatsAppButton = (selector) => {
    const btn = $(selector);
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const number = btn.dataset.waNumber;
      openWhatsApp({
        number,
        message: 'Hi EDUVERSE2F, I want to know more about your services.'
      });
    });
  };

  bindWhatsAppButton('#hero-wa');
  bindWhatsAppButton('#whatsapp-btn');
  bindWhatsAppButton('#whatsapp-btn-mobile');

  // Contact/Lead Form => WhatsApp (NO BACKEND)
  const form = $('#lead-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const phone = String(formData.get('phone') || '').trim();
      const institute = String(formData.get('institute') || '').trim();
      const message = String(formData.get('message') || '').trim();

      const number = '917488581141';
      const whatsappMessage = [
        '--------------------------------',
        'New Inquiry from EDUVERSE2F Website',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Institute: ${institute}`,
        `Message: ${message}`,
        '--------------------------------'
      ].join('\n');

      openWhatsApp({ number, message: whatsappMessage });
      alert('Redirecting to WhatsApp...');
      form.reset();
    });
  }
})();

