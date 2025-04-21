// This file contains TypeScript declarations for modules that don't have type definitions

// Declare modules for image files
declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';
  
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  
  const src: string;
  export default src;
}

// Declare modules for mapbox-gl
declare module 'mapbox-gl' {
  export default any;
}

// Declare modules for three.js
declare module 'three' {
  export default any;
}

// Declare modules for d3.js
declare module 'd3' {
  export default any;
}
