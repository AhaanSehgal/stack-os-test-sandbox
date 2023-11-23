import { HTMLAttributes } from 'react';

/* eslint-disable no-unused-vars */
interface Window {
  ethereum: any;
}
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}
