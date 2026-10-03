# Divya Mukhi - Spiritual Store Theme

A Shopify 2.0 theme inspired by [divymukhi.in](https://divymukhi.in/), designed for spiritual, religious, and wellness stores.

## Theme Features

- **Shopify 2.0 compatible** with JSON templates and section everywhere support
- **Spiritual/Religious aesthetic** with traditional Indian design elements
- **Responsive design** optimized for all devices
- **Performance optimized** with lazy loading and efficient CSS/JS
- **Full e-commerce functionality** including cart, checkout, and customer accounts

## Installation

1. **Zip the theme folder**: Compress the entire theme directory into a ZIP file
2. **Upload to Shopify**:
   - Go to your Shopify Admin
   - Navigate to **Online Store → Themes**
   - Click **Add theme** → **Upload ZIP file**
   - Select your theme ZIP file
3. **Customize**: Click **Customize** to configure your theme settings

## Color Scheme

The theme uses a warm, spiritual color palette:

| Color | Hex Code | Usage |
|-------|----------|-------|
| Saffron Orange | `#FF6B35` | Primary accent, buttons, highlights |
| Deep Maroon | `#8B1538` | Secondary accent, links |
| Gold | `#D4AF37` | Premium elements, decorative accents |
| Cream | `#FFF8E7` | Background |
| Light Cream | `#FFFAF0` | Secondary background |
| Dark Brown | `#3D2914` | Text |

### Customization Options

Access theme settings through **Customize → Theme settings**:

- **Colors**: Modify all color values to match your brand
- **Typography**: Choose from spiritual-inspired font combinations
- **Social Media**: Add links to your social profiles
- **Logo**: Upload your store logo (recommended: 200x60px)
- **Favicon**: Upload a favicon for browser tabs

## Sections Available

### Homepage Sections
- **Hero Slideshow**: Full-width image slider with text overlays
- **Featured Collections**: Grid display of product collections
- **Product Grid**: Customizable product showcase
- **Trust Badges**: Build customer confidence with guarantee icons
- **Testimonials**: Customer review carousel
- **Newsletter**: Email signup with promotional messaging

### Global Sections
- **Announcement Bar**: Promotional messages at the top
- **Header**: Navigation with mega menu and search
- **Footer**: Links, newsletter, and payment icons

### Product Sections
- **Product Tabs**: Description, shipping info, reviews tabs
- **Related Products**: Complementary product suggestions

## Required Shopify Features

For full functionality, ensure these features are enabled:

- **Customer accounts** (for account pages)
- **Gift cards** (if selling digital gifts)
- **Product reviews app** (optional, for testimonials)
- **At least one collection** with products

## File Structure

```
shopify/
├── assets/
│   ├── theme.css          # Main stylesheet
│   └── theme.js           # JavaScript functionality
├── config/
│   ├── settings_data.json # Theme setting values
│   └── settings_schema.json # Theme settings schema
├── layout/
│   ├── theme.liquid       # Main layout template
│   └── password.liquid    # Password page layout
├── locales/
│   └── en.default.json    # English translations
├── sections/              # All section files
├── snippets/              # Reusable components
└── templates/             # JSON page templates
    └── customers/         # Customer account templates
```

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome for Android)

## Performance Features

- Lazy loading for images
- Minimal JavaScript dependencies
- CSS custom properties for efficient theming
- Responsive images with srcset support
- Efficient DOM structure

## Customization Tips

1. **Product Images**: Use square images (1000x1000px) for best display
2. **Logo**: SVG format recommended for crisp display at any size
3. **Collections**: Create collections like "Puja Items", "Spiritual Books", "Gemstones"
4. **Slideshow**: Use high-quality images (1920x800px) for hero slides

## Support

This theme was created based on the divymukhi.in store design. For custom modifications or support, consult a Shopify theme developer.

## License

This theme is provided as-is for use with Shopify stores.
