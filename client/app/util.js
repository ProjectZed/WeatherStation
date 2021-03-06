let options = {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};


export function unixTimeToString(time) {
  return new Date(time).toLocaleString('en-us', options).replace(",", "");
}

/**
 * If shouldHide is true, returns a CSS class that hides the element.
 */
export function hideElement(shouldHide) {
  if (shouldHide) {
    return 'hidden';
  } else {
    return '';
  }
}
