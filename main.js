/* Learn French with Vineet Bro — small helpers (no dependencies)

   HOW TRANSLATION WORKS
   ---------------------
   English is written in the HTML as normal. French lives beside it:
     data-fr="…"              French content for the element (may include <em>, <strong>, <br>)
     data-fr-placeholder="…"  French placeholder (form fields)
     data-fr-aria-label="…"   French screen-reader label
     data-fr-alt="…"          French image description
     data-fr-content="…"      French <meta> content
   Clicking EN / FR swaps everything and remembers the choice on this device.
*/
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');

  // ---------- Language ----------
  var ATTRS = ['placeholder', 'aria-label', 'alt', 'title', 'content'];
  var textEls = document.querySelectorAll('[data-fr]');
  var attrEls = [];

  textEls.forEach(function (el) { el.setAttribute('data-en', el.innerHTML); });
  ATTRS.forEach(function (a) {
    document.querySelectorAll('[data-fr-' + a + ']').forEach(function (el) {
      if (el.hasAttribute(a)) el.setAttribute('data-en-' + a, el.getAttribute(a));
      attrEls.push([el, a]);
    });
  });

  var live = document.getElementById('lang-status');

  function setLang(lang, announce) {
    var fr = lang === 'fr';
    textEls.forEach(function (el) {
      el.innerHTML = fr ? el.getAttribute('data-fr') : el.getAttribute('data-en');
    });
    attrEls.forEach(function (pair) {
      var el = pair[0], a = pair[1];
      var v = fr ? el.getAttribute('data-fr-' + a) : el.getAttribute('data-en-' + a);
      if (v !== null) el.setAttribute(a, v);
    });
    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    root.lang = lang;
    if (nav) setMenu(nav.classList.contains('open'));
    if (announce && live) {
      live.textContent = fr ? 'Page affichée en français.' : 'Page now in English.';
    }
    try { localStorage.setItem('vb-lang', lang); } catch (e) {}
  }

  document.querySelectorAll('.lang-toggle button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); });
  });

  var saved = 'en';
  try { saved = localStorage.getItem('vb-lang') || 'en'; } catch (e) {}
  if (saved === 'fr') setLang('fr', false);

  // ---------- Mobile menu ----------
  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var fr = root.lang === 'fr';
    menuBtn.setAttribute('aria-label', open ? (fr ? 'Fermer le menu' : 'Close menu') : (fr ? 'Ouvrir le menu' : 'Open menu'));
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  // ---------- Contact form ----------
  var WHATSAPP_NUMBER = '16473361486'; // country code + number, digits only
  var form = document.querySelector('form.form');
  if (form) {
    // After emailing, come back to thanks.html on this site (only works once the site is online)
    var next = document.getElementById('form-next');
    if (next) {
      if (/^https?:/.test(location.protocol)) next.value = new URL('thanks.html', location.href).href;
      else next.parentNode.removeChild(next);
    }

    var waBtn = document.getElementById('send-wa');
    var waErr = document.getElementById('wa-error');

    // Email sending only works when the site is online (FormSubmit rejects local files).
    form.addEventListener('submit', function (e) {
      if (!/^https?:/.test(location.protocol)) {
        e.preventDefault();
        var fr = root.lang === 'fr';
        waErr.textContent = fr
          ? 'L’envoi par courriel fonctionnera une fois le site en ligne. Pour l’instant, utilisez WhatsApp ou écrivez à vineethkar555@gmail.com.'
          : 'Sending by email will work once the site is online. For now, use WhatsApp or write to vineethkar555@gmail.com.';
      }
    });
    if (waBtn) {
      waBtn.addEventListener('click', function () {
        var fr = root.lang === 'fr';
        var name = form.elements.name.value.trim();
        if (!name) {
          waErr.textContent = fr ? 'Merci d’indiquer votre nom avant d’envoyer.' : 'Please add your name before sending.';
          form.elements.name.focus();
          return;
        }
        waErr.textContent = '';
        var pick = function (sel) { return sel.options[sel.selectedIndex].text; };
        var email = form.elements.email.value.trim();
        var msg = form.elements.message.value.trim();
        var lines = fr ? [
          'Bonjour Vineet ! Je m’appelle ' + name + '.',
          'Je souhaite apprendre : ' + pick(form.elements.course) + '.',
          'Mon niveau : ' + pick(form.elements.level) + '.'
        ] : [
          'Hello Vineet! My name is ' + name + '.',
          'I’d like to learn: ' + pick(form.elements.course) + '.',
          'My level: ' + pick(form.elements.level) + '.'
        ];
        if (msg) lines.push('', msg);
        if (email) lines.push('', (fr ? 'Courriel : ' : 'Email: ') + email);
        var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
        window.open(url, '_blank', 'noopener');
      });
    }
  }

  // ---------- Footer year ----------
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
