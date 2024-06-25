"use client";

import GlobalStyles from "@/styles/GlobalStyles";
import { RecoilRoot } from "recoil";

import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { ToastProvider } from "@/hooks/useToast/useToast";
import { DialogProvider } from "./hooks/useDialog/useDialog";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <DialogProvider>
            <GlobalStyles />
            {children}
          </DialogProvider>
        </ToastProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}
