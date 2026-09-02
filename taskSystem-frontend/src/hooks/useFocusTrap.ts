import { useEffect, useRef, useCallback } from "react";

interface UseFocusTrapProps {
    isOpen: boolean;
    onClose: () => void;
    initialFocusRef?: React.RefObject<HTMLElement | null>;
    returnFocusRef?: React.RefObject<HTMLElement | null>;
}

export function useFocusTrap({
    isOpen,
    onClose,
    initialFocusRef,
    returnFocusRef,
}: UseFocusTrapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const previousFocusedElement = useRef<HTMLElement | null>(null);

    // Get all focusable elements inside the container
    const getFocusableElements = useCallback(() => {
        if (!containerRef.current) return [];
        const focusableSelectors =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        return Array.from(
            containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
        ).filter((el) => !el.hasAttribute("disabled"));
    }, []);

    // Handle focus trap
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }

            if (e.key !== "Tab") return;

            const focusableElements = getFocusableElements();
            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        },
        [getFocusableElements, onClose]
    );

    // Set up focus trap when popup opens
    useEffect(() => {
        if (!isOpen) return;

        // Save the currently focused element
        previousFocusedElement.current = document.activeElement as HTMLElement | null;

        // Focus the initial element or first focusable element
        const focusTarget = initialFocusRef?.current ?? getFocusableElements()[0];
        if (focusTarget) {
            setTimeout(() => focusTarget.focus(), 50);
        }

        // Add event listeners
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, initialFocusRef, getFocusableElements, handleKeyDown]);

    // Restore focus when popup closes
    useEffect(() => {
        if (isOpen) return;

        // Return focus to the element that opened the popup
        const returnTarget = returnFocusRef?.current ?? previousFocusedElement.current;
        if (returnTarget && typeof returnTarget.focus === "function") {
            setTimeout(() => returnTarget.focus(), 50);
        }
    }, [isOpen, returnFocusRef]);

    return containerRef;
}