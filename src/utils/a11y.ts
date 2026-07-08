// src/utils/a11y.ts

let uniqueIdCounter = 0;

/**
 * Generates a unique ID for accessibility purposes.
 * Useful for associating labels with input fields or for ARIA attributes.
 * @param prefix - An optional prefix for the ID.
 * @returns A unique string ID.
 */
export function generateUniqueId(prefix: string = 'a11y-id'): string {
  uniqueIdCounter += 1;
  return `${prefix}-${uniqueIdCounter}`;
}

/**
 * Provides a recommended accessible label for interactive elements.
 * Prioritizes `aria-label`, then `aria-labelledby`, then content.
 * @param content - The visible text content of the element.
 * @param ariaLabel - The value of the `aria-label` attribute.
 * @param ariaLabelledBy - The ID of the element that labels the current element.
 * @returns The most appropriate accessible label string.
 */
export function getAccessibleLabel(
  content: string | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined
): string | undefined {
  if (ariaLabel) {
    return ariaLabel;
  }
  // For ariaLabelledBy, we typically don't return the ID, but rather expect
  // the screen reader to find the element by that ID. This helper is more
  // for *determining* if an element *has* an effective label.
  // If no ariaLabel, content can act as a fallback, especially if it's an icon-only button without an explicit aria-label.
  if (!ariaLabel && !ariaLabelledBy && content) {
    return content;
  }
  return undefined;
}

/**
 * Checks if an element should be considered "accessible" in terms of having a label.
 * @param content - The visible text content of the element.
 * @param ariaLabel - The value of the `aria-label` attribute.
 * @param ariaLabelledBy - The ID of the element that labels the current element.
 * @returns True if the element has an explicit or implicit accessible label.
 */
export function hasAccessibleLabel(
  content: string | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined
): boolean {
  return !!(content || ariaLabel || ariaLabelledBy);
}
