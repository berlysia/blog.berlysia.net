"use client";

import {
  faArrowsUpDown,
  faArrowsLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useWritingMode } from "./useWritingMode";

export default function WritingModeSwitcher() {
  const { isVertical, setVertical, setHorizontal } = useWritingMode();

  return (
    <div className="writing-mode-switcher">
      <button
        type="button"
        className="tw-h-8 tw-w-8 tw-text-lg"
        onClick={isVertical ? setHorizontal : setVertical}
        title={
          isVertical
            ? "switch to vertical writing mode"
            : "switch to horizontal writing mode"
        }
      >
        {isVertical ? (
          <FontAwesomeIcon icon={faArrowsLeftRight} />
        ) : (
          <FontAwesomeIcon icon={faArrowsUpDown} />
        )}
      </button>
    </div>
  );
}
