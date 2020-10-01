/**
 * This is the set of recognized key presses across components in this
 * library. If you need to add/remove/modify them, feel free. Just ensure,
 * the definitions are inline with the names defined in this type
 */
export type AbcKeyboardEvent =
    "BACKSPACE" | "TAB" | "ENTER" | "SHIFT" | "ESCAPE" | "SPACE" | "PAGE_UP" |
    "PAGE_DOWN" | "END" | "HOME" | "LEFT" | "UP" | "RIGHT" | "DOWN" | "DELETE";

/**
 * This is the set of legacy event codes used for detecting the type of key press
 */
export const abcEventKeyCode = {
    BACKSPACE: [8],
	TAB: [9],
	ENTER: [13],
	SHIFT: [16],
	ESCAPE: [27],
	SPACE: [32],
	PAGE_UP: [33],
	PAGE_DOWN: [34],
	END: [35],
	HOME: [36],
	LEFT: [37],
	UP: [38],
	RIGHT: [39],
	DOWN: [40],
	DELETE: [46]
}

/**
 * This is the new method for detecting key presses as keyCode is expected to be deprecated
 * soon
 */
export const abcEventKey = {
    BACKSPACE: ["Backspace"],
	TAB: ["Tab"],
	ENTER: ["Enter"],
	SHIFT: ["Shift"],
	ESCAPE: ["Escape", "Esc"],
	SPACE: [" ", "Spacebar"],
	PAGE_UP: ["PageUp"],
	PAGE_DOWN: ["PageDown"],
	END: ["End"],
	HOME: ["Home"],
	LEFT: ["ArrowLeft"],
	UP: ["ArrowUp"],
	RIGHT: ["ArrowRight"],
	DOWN: ["ArrowDown"],
	DELETE: ["Delete"]
}