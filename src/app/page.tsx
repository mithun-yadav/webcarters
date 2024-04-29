"use client"

import Image from "next/image";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const theme = createTheme({
  // You can customize your theme here
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

export default function Home() {
  
  useRouter().push("/products")

  return (
    <ThemeProvider theme={theme}>
      
    </ThemeProvider>
  );
}
