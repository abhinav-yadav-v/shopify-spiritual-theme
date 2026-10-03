# Implementation Plan: Shopify 2.0 Spiritual Theme

This plan creates a production-ready Shopify Online Store 2.0 theme for a Hindu spiritual wearables shop (Rudraksha beads, Karungali bracelets, spiritual jewelry) inspired by divymukhi.in.

## Design Decisions

**Color Palette:**
- Primary: #FF6B00 (saffron/orange - spiritual significance)
- Secondary: #8B0000 (maroon - traditional)
- Accent: #D4AF37 (gold - auspicious)
- Background: #FFF8F0 (warm cream)
- Text: #333333 (dark brown/black)

**Architecture:** Shopify 2.0 with JSON templates, section schemas with blocks, section groups for header/footer.

**CSS Approach:** Single theme.css with CSS custom properties tied to theme settings via Liquid, mobile-first responsive design.

**JS Approach:** Vanilla JavaScript, no framework dependencies, progressive enhancement.

---

## Phase 1: Foundation (FEAT-001)

- [ ] 1. Create directory structure: assets/, config/, layout/, locales/, sections/, snippets/, templates/, templates/customers/
      Files: All 8 directories
      Verify: Directories exist

- [ ] 2. Create layout/theme.liquid with HTML5 structure, content_for_header, content_for_layout, section groups for header-group and footer-group, asset includes.
      Files: layout/theme.liquid
      Verify: File contains {{ content_for_layout }} and {% sections 'header-group' %}

- [ ] 3. Create config/settings_schema.json with theme_info and 5 setting groups: Colors (primary_color, secondary_color, accent_color, background_color, text_color), Typography (heading_font, body_font), Layout (max_content_width), Social Media (5 social URLs), Favicon.
      Files: config/settings_schema.json
      Verify: Valid JSON array with theme_info object

- [ ] 4. Create config/settings_data.json with current object containing all default values matching the spiritual color scheme.
      Files: config/settings_data.json
      Verify: Valid JSON with 'current' key

- [ ] 5. Create locales/en.default.json with translations for general, products, collections, cart, customer namespaces.
      Files: locales/en.default.json
      Verify: Valid JSON with nested translation keys

- [ ] 6. Create assets/theme.css with CSS custom properties, base resets, typography, grid system, utility classes, button/form styles.
      Files: assets/theme.css
      Verify: File exists and defines --color-primary variable

- [ ] 7. Create assets/theme.js with DOMContentLoaded pattern, mobile menu toggle, lazy loading, quantity selectors.
      Files: assets/theme.js
      Verify: File exists with no syntax errors

- [ ] 8. Create core snippets: icon.liquid (SVG icons by name), meta-tags.liquid (SEO tags), product-card.liquid, rating-stars.liquid, social-icons.liquid, payment-icons.liquid.
      Files: snippets/icon.liquid, snippets/meta-tags.liquid, snippets/product-card.liquid, snippets/rating-stars.liquid, snippets/social-icons.liquid, snippets/payment-icons.liquid
      Verify: All 6 snippet files exist

---

## Phase 2: Header & Footer (FEAT-002)

- [ ] 9. Create section groups: sections/header-group.json (announcement-bar, header), sections/footer-group.json (footer).
      Files: sections/header-group.json, sections/footer-group.json
      Verify: Valid JSON with type and sections object

- [ ] 10. Create sections/announcement-bar.liquid with scrolling marquee, badge blocks (Free Shipping, 24/7 Support, Secure Payments, Proud Indian Culture), color settings.
      Files: sections/announcement-bar.liquid
      Verify: Has {% schema %} with badge blocks

- [ ] 11. Create sections/header.liquid with logo, navigation menu, search/account/cart icons, mobile hamburger, sticky header option.
      Files: sections/header.liquid
      Verify: References linklists['main-menu'], has schema settings

- [ ] 12. Create sections/mobile-menu.liquid as drawer with navigation, search, account links.
      Files: sections/mobile-menu.liquid
      Verify: Has close button and navigation loop

- [ ] 13. Create sections/footer.liquid with 4-column grid, menu/text/newsletter blocks, social icons, payment icons, copyright.
      Files: sections/footer.liquid
      Verify: Has block types menu_column, text_column, newsletter

- [ ] 14. Add header/footer styles to theme.css: sticky header, marquee animation, navigation dropdowns, footer grid.
      Files: assets/theme.css (update)
      Verify: Contains .header--sticky and .announcement-bar classes

- [ ] 15. Add header/footer JS to theme.js: mobile menu toggle, sticky scroll behavior.
      Files: assets/theme.js (update)
      Verify: Contains mobileMenuToggle function

---

## Phase 3: Homepage Sections (FEAT-003)

- [ ] 16. Create sections/hero-slideshow.liquid with image slider, slide blocks (image, heading, subheading, CTA), autoplay, navigation dots/arrows.
      Files: sections/hero-slideshow.liquid
      Verify: Has slide blocks and presets in schema

- [ ] 17. Create sections/featured-collections.liquid with collection cards grid, collection blocks, hover effects.
      Files: sections/featured-collections.liquid
      Verify: Has collection block with collection picker setting

- [ ] 18. Create sections/product-grid.liquid with products from collection, using product-card snippet.
      Files: sections/product-grid.liquid
      Verify: Contains {% render 'product-card' %}

- [ ] 19. Create sections/testimonials.liquid with review blocks (name, date, rating, text), carousel or grid layout.
      Files: sections/testimonials.liquid
      Verify: Has testimonial blocks with rating range setting

- [ ] 20. Create sections/trust-badges.liquid with badge blocks (icon, heading, description) for Authenticity, Free Delivery, Support, Secure Payment.
      Files: sections/trust-badges.liquid
      Verify: Has 4 default badge blocks in presets

- [ ] 21. Create sections/newsletter.liquid with email signup form, heading, description, background options.
      Files: sections/newsletter.liquid
      Verify: Contains form action for contact

- [ ] 22. Create templates/index.json referencing all homepage sections in order.
      Files: templates/index.json
      Verify: Valid JSON with sections and order array

- [ ] 23. Add homepage section styles to theme.css: slideshow, collection cards, testimonials, trust badges, newsletter.
      Files: assets/theme.css (update)
      Verify: Contains .hero-slideshow and .testimonial-card classes

- [ ] 24. Add homepage JS to theme.js: slideshow navigation, autoplay, testimonial carousel.
      Files: assets/theme.js (update)
      Verify: Contains slideshow initialization code

---

## Phase 4: Product, Collection & Cart (FEAT-004)

- [ ] 25. Create sections/main-product.liquid with image gallery, variant selector, quantity, add to cart form, price display, vendor, SKU.
      Files: sections/main-product.liquid
      Verify: Contains {% form 'product' %}

- [ ] 26. Create sections/product-tabs.liquid with tabbed Description/Specifications/Shipping/Reviews.
      Files: sections/product-tabs.liquid
      Verify: Has tab blocks in schema

- [ ] 27. Create sections/related-products.liquid with recommendations grid.
      Files: sections/related-products.liquid
      Verify: Uses recommendations or fallback collection

- [ ] 28. Create templates/product.json referencing main-product, product-tabs, related-products.
      Files: templates/product.json
      Verify: Valid JSON referencing 3 sections

- [ ] 29. Create sections/main-collection.liquid with product grid, filters, sort, pagination.
      Files: sections/main-collection.liquid
      Verify: Contains {% paginate %}

- [ ] 30. Create sections/collection-banner.liquid with collection image and title overlay.
      Files: sections/collection-banner.liquid
      Verify: Uses collection.image

- [ ] 31. Create templates/collection.json referencing collection-banner, main-collection.
      Files: templates/collection.json
      Verify: Valid JSON referencing 2 sections

- [ ] 32. Create sections/main-cart.liquid with cart items table, totals, checkout button.
      Files: sections/main-cart.liquid
      Verify: Contains {% for item in cart.items %}

- [ ] 33. Create templates/cart.json referencing main-cart.
      Files: templates/cart.json
      Verify: Valid JSON

- [ ] 34. Create all customer templates and sections: login, register, account, order, addresses, activate_account, reset_password.
      Files: templates/customers/login.json, templates/customers/register.json, templates/customers/account.json, templates/customers/order.json, templates/customers/addresses.json, templates/customers/activate_account.json, templates/customers/reset_password.json, sections/main-login.liquid, sections/main-register.liquid, sections/main-account.liquid, sections/main-order.liquid, sections/main-addresses.liquid, sections/main-activate-account.liquid, sections/main-reset-password.liquid
      Verify: All 7 customer templates exist

- [ ] 35. Add product/collection/cart styles to theme.css.
      Files: assets/theme.css (update)
      Verify: Contains .product-gallery and .cart-table classes

- [ ] 36. Add product/collection/cart JS to theme.js: gallery thumbnails, variant change, tabs, quantity update.
      Files: assets/theme.js (update)
      Verify: Contains variant selector code

---

## Phase 5: Remaining Pages & Finalization (FEAT-005)

- [ ] 37. Create sections/main-page.liquid and templates/page.json for static pages.
      Files: sections/main-page.liquid, templates/page.json
      Verify: Valid JSON and section

- [ ] 38. Create sections/main-blog.liquid and templates/blog.json for blog listing.
      Files: sections/main-blog.liquid, templates/blog.json
      Verify: Contains article loop

- [ ] 39. Create sections/main-article.liquid and templates/article.json for blog posts.
      Files: sections/main-article.liquid, templates/article.json
      Verify: Uses article object

- [ ] 40. Create sections/main-search.liquid and templates/search.json for search results.
      Files: sections/main-search.liquid, templates/search.json
      Verify: Uses search.results

- [ ] 41. Create sections/main-404.liquid and templates/404.json for 404 page.
      Files: sections/main-404.liquid, templates/404.json
      Verify: Has continue shopping link

- [ ] 42. Create templates/gift_card.liquid (Liquid template) with gift card display.
      Files: templates/gift_card.liquid
      Verify: Contains {{ gift_card.code }}

- [ ] 43. Create layout/password.liquid and templates/password.json with sections/main-password.liquid.
      Files: layout/password.liquid, templates/password.json, sections/main-password.liquid
      Verify: All 3 files exist

- [ ] 44. Create snippets/breadcrumb.liquid and add to product/collection/article sections.
      Files: snippets/breadcrumb.liquid
      Verify: Renders breadcrumb trail

- [ ] 45. Finalize config/settings_data.json with complete current preset and sample index.json section data.
      Files: config/settings_data.json (update)
      Verify: All settings have values

- [ ] 46. Final CSS review: verify all components styled, add print styles, confirm responsive breakpoints.
      Files: assets/theme.css (update)
      Verify: No missing component styles

- [ ] 47. Final JS review: error handling, all interactions working.
      Files: assets/theme.js (update)
      Verify: No console errors expected

---

## File Summary

### Directories (8)
- assets/
- config/
- layout/
- locales/
- sections/
- snippets/
- templates/
- templates/customers/

### Layout Files (2)
- layout/theme.liquid
- layout/password.liquid

### Config Files (2)
- config/settings_schema.json
- config/settings_data.json

### Locale Files (1)
- locales/en.default.json

### Section Group Files (2)
- sections/header-group.json
- sections/footer-group.json

### Section Files (26)
- sections/announcement-bar.liquid
- sections/header.liquid
- sections/mobile-menu.liquid
- sections/footer.liquid
- sections/hero-slideshow.liquid
- sections/featured-collections.liquid
- sections/product-grid.liquid
- sections/testimonials.liquid
- sections/trust-badges.liquid
- sections/newsletter.liquid
- sections/main-product.liquid
- sections/product-tabs.liquid
- sections/related-products.liquid
- sections/main-collection.liquid
- sections/collection-banner.liquid
- sections/main-cart.liquid
- sections/main-page.liquid
- sections/main-blog.liquid
- sections/main-article.liquid
- sections/main-search.liquid
- sections/main-404.liquid
- sections/main-password.liquid
- sections/main-login.liquid
- sections/main-register.liquid
- sections/main-account.liquid
- sections/main-order.liquid
- sections/main-addresses.liquid
- sections/main-activate-account.liquid
- sections/main-reset-password.liquid

### Snippet Files (8)
- snippets/icon.liquid
- snippets/meta-tags.liquid
- snippets/product-card.liquid
- snippets/rating-stars.liquid
- snippets/social-icons.liquid
- snippets/payment-icons.liquid
- snippets/breadcrumb.liquid

### Asset Files (2)
- assets/theme.css
- assets/theme.js

### Template Files (13)
- templates/index.json
- templates/product.json
- templates/collection.json
- templates/cart.json
- templates/page.json
- templates/blog.json
- templates/article.json
- templates/search.json
- templates/404.json
- templates/password.json
- templates/gift_card.liquid

### Customer Template Files (7)
- templates/customers/login.json
- templates/customers/register.json
- templates/customers/account.json
- templates/customers/order.json
- templates/customers/addresses.json
- templates/customers/activate_account.json
- templates/customers/reset_password.json

---

## Settings Schema Groups

1. **theme_info** - Theme metadata (name, version, author, documentation URL, support)
2. **Colors** - primary_color, secondary_color, accent_color, background_color, text_color
3. **Typography** - heading_font (font_picker), body_font (font_picker)
4. **Layout** - max_content_width (range)
5. **Social Media** - social_facebook_link, social_instagram_link, social_twitter_link, social_youtube_link, social_pinterest_link (url)
6. **Favicon** - favicon (image_picker)

---

## Snippets Reference

| Snippet | Parameters | Purpose |
|---------|------------|---------|
| icon.liquid | name (string) | Renders SVG icon by name |
| meta-tags.liquid | none | SEO meta tags, OG tags |
| product-card.liquid | product (product object), show_vendor (bool) | Product card in grids |
| rating-stars.liquid | rating (number 0-5) | Star rating display |
| social-icons.liquid | none | Social media links from settings |
| payment-icons.liquid | none | Payment method icons |
| breadcrumb.liquid | none | Breadcrumb navigation |
