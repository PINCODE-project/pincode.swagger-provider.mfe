import * as React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiSelect = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input"> & {
        handleChange: (value: string) => void;
        open: boolean;
        setOpen: (open: boolean) => void;
        isError?: boolean;
    }
>(({ className, type, handleChange, open, setOpen, isError, ...props }, ref) => {
    return (
        <div style={{ position: "relative" }}>
            <input
                type={type}
                className={
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-base " +
                    className
                }
                style={isError ? { borderColor: "red" } : undefined}
                ref={ref}
                {...props}
                onFocus={(event) => {
                    setOpen(true);
                    props.onFocus?.(event);
                }}
                onChange={() => {}}
                readOnly
            />
            {open && (
                <div style={{ position: "absolute", top: "40px" }}>
                    <Picker
                        theme={document.body.classList.contains("dark") ? "dark" : "light"}
                        data={data}
                        disabled={props.disabled}
                        onEmojiSelect={(emoji: { native: string }) => handleChange(emoji.native)}
                    />
                </div>
            )}
        </div>
    );
});
EmojiSelect.displayName = "EmojiSelect";

export { EmojiSelect };
