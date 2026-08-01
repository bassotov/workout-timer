// TypeScript 6+ requires side-effect imports to resolve (TS2882); plain-CSS imports need this declaration.
// Next.js >=16.2 ships it in next/types/global.d.ts — delete this file after upgrading Next.
declare module '*.css' {}
