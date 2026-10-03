/**
 * Divya Mukhi Spiritual Theme - Core JavaScript
 * Vanilla JS for optimal performance
 */

(function() {
  'use strict';

  // ============================================
  // Utility Functions
  // ============================================

  /**
   * Debounce function execution
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @returns {Function}
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function execution
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in ms
   * @returns {Function}
   */
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Format money values
   * @param {number} cents - Amount in cents
   * @param {string} format - Money format string
   * @returns {string}
   */
  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    
    const value = (cents / 100).toFixed(2);
    const formatString = format || '₹{{amount}}';
    
    return formatString
      .replace('{{amount}}', value)
      .replace('{{amount_no_decimals}}', Math.floor(cents / 100))
      .replace('{{amount_with_comma_separator}}', value.replace('.', ','));
  }

  /**
   * Get element by selector with error handling
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element
   * @returns {Element|null}
   */
  function $(selector, context = document) {
    return context.querySelector(selector);
  }

  /**
   * Get all elements by selector
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element
   * @returns {NodeList}
   */
  function $$(selector, context = document) {
    return context.querySelectorAll(selector);
  }

  // ============================================
  // Mobile Menu
  // ============================================

  const MobileMenu = {
    selectors: {
      toggle: '[data-mobile-menu-toggle]',
      menu: '[data-mobile-menu]',
      close: '[data-mobile-menu-close]',
      overlay: '[data-mobile-overlay]',
      submenuToggle: '[data-mobile-submenu-toggle]'
    },

    init() {
      const toggleBtn = $(this.selectors.toggle);
      const menu = $(this.selectors.menu);
      
      if (!toggleBtn || !menu) return;

      toggleBtn.addEventListener('click', () => this.toggle());
      
      const closeBtn = $(this.selectors.close);
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }

      const overlay = $(this.selectors.overlay);
      if (overlay) {
        overlay.addEventListener('click', () => this.close());
      }

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        }
      });

      // Initialize submenu toggles
      this.initSubmenus();
    },

    initSubmenus() {
      $$(this.selectors.submenuToggle).forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
          const submenuId = toggle.getAttribute('aria-controls');
          const submenu = document.getElementById(submenuId);
          
          if (isExpanded) {
            toggle.setAttribute('aria-expanded', 'false');
            if (submenu) submenu.hidden = true;
          } else {
            toggle.setAttribute('aria-expanded', 'true');
            if (submenu) submenu.hidden = false;
          }
        });
      });
    },

    isOpen() {
      const menu = $(this.selectors.menu);
      return menu && menu.classList.contains('is-active');
    },

    toggle() {
      this.isOpen() ? this.close() : this.open();
    },

    open() {
      const menu = $(this.selectors.menu);
      const overlay = $(this.selectors.overlay);
      const toggle = $(this.selectors.toggle);
      
      if (menu) {
        menu.classList.add('is-active');
        menu.setAttribute('aria-hidden', 'false');
      }
      if (overlay) {
        overlay.classList.add('is-active');
      }
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'true');
      }
      
      document.body.style.overflow = 'hidden';
    },

    close() {
      const menu = $(this.selectors.menu);
      const overlay = $(this.selectors.overlay);
      const toggle = $(this.selectors.toggle);
      
      if (menu) {
        menu.classList.remove('is-active');
        menu.setAttribute('aria-hidden', 'true');
      }
      if (overlay) {
        overlay.classList.remove('is-active');
      }
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
      
      document.body.style.overflow = '';
    }
  };

  // ============================================
  // Sticky Header
  // ============================================

  const StickyHeader = {
    selectors: {
      header: '[data-sticky-header]'
    },
    
    lastScrollTop: 0,
    scrollThreshold: 100,
    
    init() {
      const header = $(this.selectors.header);
      if (!header || header.dataset.stickyHeader !== 'true') return;
      
      this.header = header;
      this.headerHeight = header.offsetHeight;
      
      window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
    },

    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add scrolled class when scrolled past threshold
      if (scrollTop > this.scrollThreshold) {
        this.header.classList.add('is-scrolled');
      } else {
        this.header.classList.remove('is-scrolled');
      }
      
      // Hide/show header on scroll direction
      if (scrollTop > this.lastScrollTop && scrollTop > this.headerHeight) {
        // Scrolling down
        this.header.classList.add('is-hidden');
      } else {
        // Scrolling up
        this.header.classList.remove('is-hidden');
      }
      
      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
  };

  // ============================================
  // Search Drawer
  // ============================================

  const SearchDrawer = {
    selectors: {
      toggle: '[data-search-toggle]',
      drawer: '[data-search-drawer]',
      close: '[data-search-close]',
      input: '[data-search-drawer] input[type="search"]'
    },

    init() {
      const toggleBtn = $(this.selectors.toggle);
      const drawer = $(this.selectors.drawer);
      
      if (!toggleBtn || !drawer) return;

      this.drawer = drawer;

      toggleBtn.addEventListener('click', () => this.toggle());
      
      const closeBtn = $(this.selectors.close);
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        }
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (this.isOpen() && !e.target.closest('[data-search-drawer]') && !e.target.closest('[data-search-toggle]')) {
          this.close();
        }
      });
    },

    isOpen() {
      return this.drawer && this.drawer.classList.contains('is-active');
    },

    toggle() {
      this.isOpen() ? this.close() : this.open();
    },

    open() {
      if (this.drawer) {
        this.drawer.classList.add('is-active');
        this.drawer.setAttribute('aria-hidden', 'false');
        
        // Focus input
        const input = $(this.selectors.input);
        if (input) {
          setTimeout(() => input.focus(), 100);
        }
      }
    },

    close() {
      if (this.drawer) {
        this.drawer.classList.remove('is-active');
        this.drawer.setAttribute('aria-hidden', 'true');
      }
    }
  };

  // ============================================
  // Mega Menu Interactions
  // ============================================

  const MegaMenu = {
    selectors: {
      navItem: '.site-header__nav-item.has-dropdown',
      navLink: '.site-header__nav-link--parent',
      dropdown: '.site-header__dropdown',
      megaMenu: '.site-header__mega-menu'
    },

    init() {
      const navItems = $$(this.selectors.navItem);
      
      navItems.forEach(item => {
        const button = $(this.selectors.navLink, item);
        const dropdown = $(this.selectors.dropdown, item) || $(this.selectors.megaMenu, item);
        
        if (!button || !dropdown) return;

        // Keyboard accessibility
        button.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleDropdown(button, dropdown);
          }
          if (e.key === 'Escape') {
            this.closeDropdown(button, dropdown);
            button.focus();
          }
        });

        // Mouse interactions - handled by CSS, but we set aria states
        item.addEventListener('mouseenter', () => {
          button.setAttribute('aria-expanded', 'true');
          dropdown.setAttribute('aria-hidden', 'false');
        });

        item.addEventListener('mouseleave', () => {
          button.setAttribute('aria-expanded', 'false');
          dropdown.setAttribute('aria-hidden', 'true');
        });
      });
    },

    toggleDropdown(button, dropdown) {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        this.closeDropdown(button, dropdown);
      } else {
        this.openDropdown(button, dropdown);
      }
    },

    openDropdown(button, dropdown) {
      button.setAttribute('aria-expanded', 'true');
      dropdown.setAttribute('aria-hidden', 'false');
    },

    closeDropdown(button, dropdown) {
      button.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
    }
  };

  // ============================================
  // Lazy Loading Images
  // ============================================

  const LazyImages = {
    init() {
      if ('IntersectionObserver' in window) {
        this.setupObserver();
      } else {
        this.loadAllImages();
      }
    },

    setupObserver() {
      const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, options);

      $$('[data-lazy-src], [loading="lazy"]').forEach(img => {
        observer.observe(img);
      });
    },

    loadImage(img) {
      const src = img.dataset.lazySrc || img.dataset.src;
      if (src) {
        img.src = src;
        img.removeAttribute('data-lazy-src');
        img.removeAttribute('data-src');
      }
      img.classList.add('is-loaded');
    },

    loadAllImages() {
      $$('[data-lazy-src]').forEach(img => this.loadImage(img));
    }
  };

  // ============================================
  // Smooth Scroll
  // ============================================

  const SmoothScroll = {
    init() {
      $$('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => this.handleClick(e, link));
      });
    },

    handleClick(e, link) {
      const href = link.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (href === '#' || href === '') return;
      
      const target = $(href);
      if (!target) return;
      
      e.preventDefault();
      
      const headerOffset = 80; // Adjust for sticky header
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus();
    }
  };

  // ============================================
  // Quantity Selector
  // ============================================

  const QuantitySelector = {
    selectors: {
      container: '.quantity-selector',
      input: '.quantity-selector__input',
      decrease: '[data-quantity-decrease]',
      increase: '[data-quantity-increase]'
    },

    init() {
      $$(this.selectors.container).forEach(container => {
        this.setupSelector(container);
      });
    },

    setupSelector(container) {
      const input = $(this.selectors.input, container);
      const decreaseBtn = $(this.selectors.decrease, container);
      const increaseBtn = $(this.selectors.increase, container);
      
      if (!input) return;
      
      const min = parseInt(input.getAttribute('min')) || 1;
      const max = parseInt(input.getAttribute('max')) || 999;
      
      if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
          const currentValue = parseInt(input.value) || min;
          const newValue = Math.max(min, currentValue - 1);
          this.updateValue(input, newValue, min, max);
        });
      }
      
      if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
          const currentValue = parseInt(input.value) || min;
          const newValue = Math.min(max, currentValue + 1);
          this.updateValue(input, newValue, min, max);
        });
      }
      
      input.addEventListener('change', () => {
        let value = parseInt(input.value) || min;
        value = Math.max(min, Math.min(max, value));
        this.updateValue(input, value, min, max);
      });
      
      input.addEventListener('blur', () => {
        if (!input.value || parseInt(input.value) < min) {
          this.updateValue(input, min, min, max);
        }
      });
    },

    updateValue(input, value, min, max) {
      input.value = value;
      
      // Dispatch change event for other scripts to listen
      input.dispatchEvent(new Event('change', { bubbles: true }));
      
      // Update button states
      const container = input.closest(this.selectors.container);
      const decreaseBtn = $(this.selectors.decrease, container);
      const increaseBtn = $(this.selectors.increase, container);
      
      if (decreaseBtn) {
        decreaseBtn.disabled = value <= min;
      }
      if (increaseBtn) {
        increaseBtn.disabled = value >= max;
      }
    }
  };

  // ============================================
  // Accordion
  // ============================================

  const Accordion = {
    selectors: {
      container: '[data-accordion]',
      trigger: '[data-accordion-trigger]',
      content: '[data-accordion-content]'
    },

    init() {
      $$(this.selectors.container).forEach(accordion => {
        this.setupAccordion(accordion);
      });
    },

    setupAccordion(accordion) {
      const triggers = $$(this.selectors.trigger, accordion);
      const allowMultiple = accordion.dataset.accordionMultiple === 'true';
      
      triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
          const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
          
          if (!allowMultiple) {
            // Close all other items
            triggers.forEach(t => {
              if (t !== trigger) {
                this.closeItem(t);
              }
            });
          }
          
          if (isExpanded) {
            this.closeItem(trigger);
          } else {
            this.openItem(trigger);
          }
        });
      });
    },

    openItem(trigger) {
      const contentId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(contentId);
      
      trigger.setAttribute('aria-expanded', 'true');
      if (content) {
        content.hidden = false;
      }
    },

    closeItem(trigger) {
      const contentId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(contentId);
      
      trigger.setAttribute('aria-expanded', 'false');
      if (content) {
        content.hidden = true;
      }
    }
  };

  // ============================================
  // Tabs
  // ============================================

  const Tabs = {
    selectors: {
      container: '[data-tabs]',
      list: '[role="tablist"]',
      tab: '[role="tab"]',
      panel: '[role="tabpanel"]'
    },

    init() {
      $$(this.selectors.container).forEach(tabContainer => {
        this.setupTabs(tabContainer);
      });
    },

    setupTabs(container) {
      const tabs = $$(this.selectors.tab, container);
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => this.selectTab(container, tab));
        
        tab.addEventListener('keydown', (e) => {
          this.handleKeydown(e, container, tabs);
        });
      });
    },

    selectTab(container, selectedTab) {
      const tabs = $$(this.selectors.tab, container);
      const panels = $$(this.selectors.panel, container);
      
      // Deselect all tabs
      tabs.forEach(tab => {
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('tabindex', '-1');
      });
      
      // Hide all panels
      panels.forEach(panel => {
        panel.hidden = true;
      });
      
      // Select clicked tab
      selectedTab.setAttribute('aria-selected', 'true');
      selectedTab.setAttribute('tabindex', '0');
      selectedTab.focus();
      
      // Show associated panel
      const panelId = selectedTab.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.hidden = false;
      }
    },

    handleKeydown(e, container, tabs) {
      const tabsArray = Array.from(tabs);
      const currentIndex = tabsArray.indexOf(e.target);
      let newIndex;
      
      switch (e.key) {
        case 'ArrowLeft':
          newIndex = currentIndex === 0 ? tabsArray.length - 1 : currentIndex - 1;
          break;
        case 'ArrowRight':
          newIndex = currentIndex === tabsArray.length - 1 ? 0 : currentIndex + 1;
          break;
        case 'Home':
          newIndex = 0;
          break;
        case 'End':
          newIndex = tabsArray.length - 1;
          break;
        default:
          return;
      }
      
      e.preventDefault();
      this.selectTab(container, tabsArray[newIndex]);
    }
  };

  // ============================================
  // Modal
  // ============================================

  const Modal = {
    selectors: {
      trigger: '[data-modal-trigger]',
      modal: '[data-modal]',
      close: '[data-modal-close]'
    },

    activeModal: null,

    init() {
      $$(this.selectors.trigger).forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const modalId = trigger.dataset.modalTrigger;
          this.open(modalId);
        });
      });

      $$(this.selectors.close).forEach(closeBtn => {
        closeBtn.addEventListener('click', () => this.close());
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.activeModal) {
          this.close();
        }
      });
    },

    open(modalId) {
      const modal = $(`[data-modal="${modalId}"]`);
      if (!modal) return;

      this.activeModal = modal;
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Focus first focusable element
      const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();
    },

    close() {
      if (!this.activeModal) return;

      this.activeModal.classList.remove('is-active');
      this.activeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      this.activeModal = null;
    }
  };

  // ============================================
  // Cart Functions (Stub for AJAX cart)
  // ============================================

  const Cart = {
    init() {
      // Initialize cart drawer or cart page functionality
      this.updateCartCount();
    },

    updateCartCount() {
      fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
          $$('[data-cart-count]').forEach(el => {
            el.textContent = cart.item_count;
            el.hidden = cart.item_count === 0;
          });
        })
        .catch(err => console.error('Error fetching cart:', err));
    },

    addItem(variantId, quantity = 1) {
      return fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: quantity
        })
      })
      .then(response => response.json())
      .then(item => {
        this.updateCartCount();
        return item;
      });
    },

    updateItem(key, quantity) {
      return fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: key,
          quantity: quantity
        })
      })
      .then(response => response.json())
      .then(cart => {
        this.updateCartCount();
        return cart;
      });
    },

    removeItem(key) {
      return this.updateItem(key, 0);
    }
  };

  // ============================================
  // Initialize All Modules
  // ============================================

  function init() {
    MobileMenu.init();
    StickyHeader.init();
    SearchDrawer.init();
    MegaMenu.init();
    LazyImages.init();
    SmoothScroll.init();
    QuantitySelector.init();
    Accordion.init();
    Tabs.init();
    Modal.init();
    Cart.init();
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose utilities globally for use in sections
  window.theme = {
    debounce,
    throttle,
    formatMoney,
    $,
    $$,
    Cart,
    Modal
  };

})();
