/**
 * Hardware Store Configuration & Ordering Controls
 *
 * To re-enable online hardware purchasing and direct checkout in the future:
 * Simply switch IS_HARDWARE_ORDERING_ENABLED to true.
 *
 * To reveal prices in the catalog in the future:
 * Simply switch SHOW_HARDWARE_PRICES to true.
 *
 * To reveal Navbar Cart and Sign In buttons in the future:
 * Simply switch SHOW_NAVBAR_CART_BUTTON or SHOW_NAVBAR_SIGNIN_BUTTON to true.
 */

export const IS_HARDWARE_ORDERING_ENABLED = false;
export const SHOW_HARDWARE_PRICES = false;

export const SHOW_NAVBAR_CART_BUTTON = false;
export const SHOW_NAVBAR_SIGNIN_BUTTON = false;

export const HARDWARE_STORE_NOTICE = {
  badge: "Catalog Preview Active",
  heroBannerTitle: "Online Hardware Purchasing Opening Soon",
  heroBannerDescription:
    "Direct online ordering for commercial BESS units, SaralaChip™ modules, and lab robotics kits is temporarily disabled while fulfillment calibration is underway. All technical datasheets, pinouts, and test parameters remain openly accessible for engineering review.",
  productBadge: "Catalog Preview Only",
  orderButtonDisabledText: "Online Ordering Opening Soon",
  pricePlaceholderText: "Price on Request",
  inquiryButtonText: "Inquire / Request Commercial Quote",
  inquiryHref: "/contact?subject=Hardware%20Inquiry%20%26%20Catalog%20Specs",
};
