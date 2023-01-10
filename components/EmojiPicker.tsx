/** @jsx h */
import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";

import { Picker as _Picker } from "https://esm.sh/emoji-mart@5.4.0/";

// deno-lint-ignore no-explicit-any
const Picker: any = _Picker;

interface EmojiPickerProps extends h.JSX.HTMLAttributes<HTMLDivElement> {
  onEmojiSelect(agr: { unified: string }): void;
}

export function EmojiPicker({ onEmojiSelect, ...props }: EmojiPickerProps) {
  const pickerWrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const render = () => {
      if (pickerWrapper.current) {
        const picker = new Picker({
          onEmojiSelect,
          emojiSize: 20,
          previewPosition: "none",
          set: "twitter",
        });
        picker.style.margin = "auto";
        pickerWrapper.current.appendChild(picker);
      }
    };
    if (requestIdleCallback) {
      requestIdleCallback(render);
    } else {
      setTimeout(render, 2000);
    }
  }, []);
  return <div ref={pickerWrapper} {...props} />;
}
