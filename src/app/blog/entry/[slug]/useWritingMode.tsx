import type { ReactNode } from "react";
import {
  useMemo,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const WritingModeContext = createContext({
  isVertical: false,
  setVertical: () => {},
  setHorizontal: () => {},
});

export function WritingModeProvider({
  preferVertical,
  children,
}: {
  readonly preferVertical: boolean;
  readonly children: ReactNode;
}) {
  const [isVertical, setIsVertical] = useState(preferVertical);
  const setVertical = useCallback(() => setIsVertical(true), []);
  const setHorizontal = useCallback(() => setIsVertical(false), []);
  const value = useMemo(
    () => ({ isVertical, setVertical, setHorizontal }),
    [isVertical, setVertical, setHorizontal]
  );

  return (
    <WritingModeContext.Provider value={value}>
      {children}
    </WritingModeContext.Provider>
  );
}

export function useWritingMode() {
  return useContext(WritingModeContext);
}
