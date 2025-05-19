export const LAYOUT_CONFIG = {
  notification: {
    height: 30, // ارتفاع نوار اعلان به پیکسل
  },
  menu: {
    height: 40, // ارتفاع منو به پیکسل
  },
  slider: {
    getHeight: () => `calc(100vh - ${LAYOUT_CONFIG.notification.height + LAYOUT_CONFIG.menu.height}px)`,
  }
} as const; 