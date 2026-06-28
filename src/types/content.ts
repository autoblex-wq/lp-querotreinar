// Content structures for the Quero Treinar site.

export interface Recurso {
  title: string;
  description: string;
  icon: string;
}

export interface Persona {
  name: string;
  tagline: string;
  bullets: string[];
  /** render the placeholder on the right (alternating layout) */
  imageRight?: boolean;
}

export interface Testimonial {
  /** position class used to stagger the CSS fade animation */
  position: "one" | "two" | "three" | "four";
  quote: string;
  author: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}
