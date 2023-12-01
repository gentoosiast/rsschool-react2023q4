import { useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

type UseAutoComplete = {
  registerInput: {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    ref: React.RefObject<HTMLInputElement>;
  };
  selectedIndex: number;
  suggestions: string[];
};

export const useAutoComplete = (completionSource: string[]): UseAutoComplete => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const scrollUp = (): void => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const scrollDown = (): void => {
    if (selectedIndex < suggestions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const resetSuggestions = (): void => {
    setSelectedIndex(-1);
    setSuggestions([]);
  };

  const selectSuggestion = (): void => {
    if (inputRef.current) {
      inputRef.current.value = suggestions[selectedIndex];
      resetSuggestions();
    }
  };

  const keyMap = new Map([
    ['ArrowDown', scrollDown],
    ['ArrowUp', scrollUp],
    ['Enter', selectSuggestion],
  ]);

  const getSuggestions = (searchValue: string): string[] => {
    return completionSource.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchValue.toLowerCase()),
    );
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const suggestions = getSuggestions(event.target.value);

    setSuggestions(suggestions);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    console.log(event.code);

    if (keyMap.has(event.code)) {
      keyMap.get(event.code)?.();
    }
  };

  return {
    registerInput: {
      onChange: handleInputChange,
      onKeyDown: handleInputKeyDown,
      ref: inputRef,
    },
    selectedIndex,
    suggestions,
  };
};
