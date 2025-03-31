/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the example
  const headerRow = ['Columns'];

  // Safely extract dynamic content from the element
  const regionSelector = document.querySelector('#regionSelector');
  const countrySelector = document.querySelector('#countryselector');
  const roleSelector = document.querySelector('#roleSelection');
  const termsAndConditionsText = document.querySelector('.site-switcher-update__content-terms')?.textContent?.trim() || 'Terms and conditions not available';

  const privacyLink = document.querySelector('.site-switcher-update__content-links--privacy');
  const cookieLink = document.querySelector('.site-switcher-update__content-links--cookie');
  const acceptButton = document.querySelector('.nuv-button__btn');

  // Extract values with proper fallbacks
  const regionContent = regionSelector?.querySelector('.site-switcher-update-select-trigger')?.textContent?.trim() || 'Region not specified';
  const locationContent = countrySelector?.querySelector('.site-switcher-update-select-trigger')?.textContent?.trim() || 'Location not specified';
  const roleContent = roleSelector?.querySelector('.site-switcher-update-select-trigger')?.textContent?.trim() || 'Role not specified';

  // Validate and create dynamic links
  const privacyNoticeLink = privacyLink ? document.createElement('a') : document.createTextNode('Privacy link not available');
  if (privacyLink) {
    privacyNoticeLink.href = privacyLink.href;
    privacyNoticeLink.textContent = 'Privacy notice';
  }

  const cookiePolicyLink = cookieLink ? document.createElement('a') : document.createTextNode('Cookie policy link not available');
  if (cookieLink) {
    cookiePolicyLink.href = cookieLink.href;
    cookiePolicyLink.textContent = 'Cookie policy, terms of use';
  }

  const acceptLink = acceptButton ? document.createElement('a') : document.createTextNode('Accept button not available');
  if (acceptButton) {
    acceptLink.href = '#';
    acceptLink.textContent = 'Accept to continue';
  }

  // Compile rows based on the example
  const rows = [
    [headerRow],
    [
      `Region: ${regionContent}`,
      `Location: ${locationContent}`,
      `Role: ${roleContent}`
    ],
    [
      termsAndConditionsText,
      privacyNoticeLink,
      cookiePolicyLink
    ],
    [acceptLink]
  ];

  // Use DOMUtils to create the table and replace the element
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
