// Google Fonts import for Rubik
export const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';

// Font family configuration
export const FONT_FAMILY = {
  primary: "'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
};

// Function to inject Google Fonts into document head
export function loadGoogleFonts() {
  if (typeof document !== 'undefined' && !document.querySelector(`link[href*="fonts.googleapis.com"][href*="Rubik"]`)) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = GOOGLE_FONTS_URL;
    document.head.appendChild(fontLink);
  }
}

// Auto-load fonts when this module is imported
if (typeof window !== 'undefined') {
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    loadGoogleFonts();
  });
} 