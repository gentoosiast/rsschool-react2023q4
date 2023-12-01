import { useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent, RefObject } from 'react';

type UseAutoComplete = {
  onItemClick: (index: number) => void;
  registerInput: {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    ref: RefObject<HTMLInputElement>;
  };
  registerList: {
    ref: RefObject<HTMLUListElement>;
  };
  selectedIndex: number;
  suggestions: string[];
};

export const useAutoComplete = (completionSource: string[]): UseAutoComplete => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemHeight = listRef.current?.children[0].clientHeight ?? 0;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const scrollUp = (): void => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);

      if (listRef.current) {
        listRef.current.scrollTop = (selectedIndex - 1) * itemHeight;
      }
    }
  };

  const scrollDown = (): void => {
    if (selectedIndex < suggestions.length - 1) {
      setSelectedIndex(selectedIndex + 1);

      if (listRef.current) {
        listRef.current.scrollTop = selectedIndex * itemHeight;
      }
    }
  };

  const resetSuggestions = (): void => {
    setSelectedIndex(-1);
    setSuggestions([]);
  };

  const selectSuggestion = (index = selectedIndex): void => {
    if (inputRef.current) {
      inputRef.current.value = suggestions[index];
      resetSuggestions();
    }
  };

  const keyMap = new Map([
    ['ArrowDown', scrollDown],
    ['ArrowUp', scrollUp],
    ['Enter', selectSuggestion],
    ['Escape', resetSuggestions],
    ['ShiftTab', scrollUp],
    ['Tab', scrollDown],
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
    const key = `${event.shiftKey ? 'Shift' : ''}${event.key}`;

    if (keyMap.has(key)) {
      event.preventDefault();
      keyMap.get(key)?.();
    }
  };

  const onItemClick = (index: number): void => {
    setSelectedIndex(index);
    selectSuggestion(index);
  };

  return {
    onItemClick,
    registerInput: {
      onChange: handleInputChange,
      onKeyDown: handleInputKeyDown,
      ref: inputRef,
    },
    registerList: {
      ref: listRef,
    },
    selectedIndex,
    suggestions,
  };
};
