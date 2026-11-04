import type { KeyboardEvent } from "react";

// Keep modal keyboard navigation within its visible controls, including when
// a native dialog would otherwise hand focus back to browser chrome.
export function trapModalFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab" || event.altKey || event.ctrlKey || event.metaKey) return;
  const controls = [...event.currentTarget.querySelectorAll<HTMLElement>(
    'button:not([disabled]):not([tabindex="-1"]), a[href], summary, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )].filter(element => element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls.at(-1);
  if (!first || !last) return;
  if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
