# Learn French with Vineet Bro — website

A plain static website: HTML, CSS and a little JavaScript. No database, no server, no build step.

```
index.html      Home
french.html     French course page
english.html    English course page
about.html      About / Meet Vineet Bro
thanks.html     Thank-you page shown after the contact form is sent
styles.css      All styles (colours are at the top)
main.js         Mobile menu, EN/FR switch, WhatsApp message
*.jpg / .svg    Photos, favicon and share image
```

All files sit side by side with **no subfolders**, so you can upload everything to GitHub in one go: select all the files and drag them onto the upload page.

## Put it online with GitHub Pages

1. Create a new repository on GitHub (for example `vineet-bro-site`).
2. Upload **all the files** in this folder to the repository (select them all and drag them onto GitHub's upload page).
3. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After a minute or two your site is live at `https://YOUR-USERNAME.github.io/vineet-bro-site/`.
5. Optional: to use your own domain, add it under **Settings → Pages → Custom domain**.

To preview on your computer, just double-click `index.html`.

## Things to fill in

Search the files for `[` to find every placeholder:

- `[60] min`, `[10 min]`: session length and timings
- `[Student name]` and the quotes: real student testimonials
- `[Your rescheduling and cancellation policy.]`
- **Video link:** replace `https://www.youtube.com/` in `index.html` with your video URL.

## Contact form and WhatsApp (no server needed)

The form gives visitors two buttons:

- **Send by email:** the message is emailed to **vineethkar555@gmail.com** through [FormSubmit](https://formsubmit.co), a free service that needs no account. The visitor then sees `thanks.html` on your site.
- **Send on WhatsApp:** opens WhatsApp (app or web) with their name, course, level, message and email already typed as a message to **+1 647 336 1486**. They just press send. Nothing goes through any server.

A WhatsApp link also appears in the contact details, and there's a round WhatsApp button in the bottom-right corner of every page.

**One-time step for email:** once the site is live, send yourself a test message with "Send by email". FormSubmit will email you an activation link. Click it, and every message after that arrives in your inbox. Check your spam folder if you don't see it. **Email sending only works when the site is online.** If you open `index.html` straight from your computer, "Send by email" shows a note instead, because FormSubmit rejects messages from local files. WhatsApp works either way.

To test the email form before publishing, start a small local web server from this folder (`python3 -m http.server 8000`), then open http://localhost:8000 in your browser.

**To change the email:** edit `action="https://formsubmit.co/…"` in `index.html`.
**To change the WhatsApp number:** edit `WHATSAPP_NUMBER` in `main.js`, and the `wa.me/…` links in the HTML pages (country code + number, digits only).

## EN / FR switch

Every piece of text on every page has a French version, so the **FR** button switches the whole page. That includes menus, buttons, form labels and placeholders, image descriptions, the browser tab title, and the labels read out by screen readers. The visitor's choice is remembered as they move between pages.

**When you edit text, edit both languages.** English is the normal text, and French sits right beside it in the same tag:

```html
<h2 data-fr="Choisissez votre table.">Pick your table.</h2>
<input placeholder="Your name" data-fr-placeholder="Votre nom">
<img alt="Café table" data-fr-alt="Table de café">
```

Prices, email and phone numbers are kept outside the translated text, so you only change them once. The one exception is the `[10]` in "Pack of [10]": it is also inside the French text, so change it in both places.

## Accessibility (built in)

- A "Skip to main content" link appears as soon as a keyboard user presses Tab.
- Every link, button and form field has a clear name, and icons are hidden from screen readers.
- One main heading per page, with headings in logical order. Menus, breadcrumbs and footer links are marked as navigation areas.
- Text colours meet WCAG AA contrast.
- A visible focus outline shows where you are when using the keyboard, including on dark sections.
- The phone menu reports whether it is open or closed, and the Esc key closes it.
- The page language switches to `fr` in French mode, so screen readers pronounce it correctly. Switching language is announced.
- French phrases shown in English mode (like "Le menu du jour") are marked as French.
- Animations are switched off for visitors whose device is set to reduce motion.
- Links that open a new tab say so to screen-reader users.

When you add your photo, keep the `alt="Vineet Bro"` text. If you add new images that are only decorative, use `alt=""`.

## Changing colours

Open `styles.css`. The brand colours are defined at the top:

```css
--navy: #0B2A6B;
--red:  #C8102E;
--cream:#FBF7F0;
```
