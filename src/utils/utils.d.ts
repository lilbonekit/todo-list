declare module 'uuid' {
  export function v1(): string;
  export function v3(options?: any): string;
  export function v4(options?: any): string;
  export function v5(options?: any): string;
}

declare module 'react-transition-group';
