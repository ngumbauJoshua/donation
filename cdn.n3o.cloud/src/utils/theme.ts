export type Theme = {
  name: string,
  borderRadius: number,
  fontFamily: string,
  headingFontFamily: string,
  colors: Record<string, string>
}

export const applyTheme = (theme: Theme) => {
  if (!theme) {
    return
  }

  if (!Object.keys(theme).length) {
    return
  }

  if (theme.borderRadius) {
    document.documentElement.style.setProperty('--radius', `${theme.borderRadius}`);
  }
  
  //TODO: need to circle back to it
  if (theme.fontFamily) {
    document.documentElement.style.setProperty('--font-sans', theme.fontFamily);
  }

  
  if (theme.headingFontFamily) {
    document.documentElement.style.setProperty('--font-heading', theme.headingFontFamily);
  }
  
  if (!theme.colors || Object.keys(theme.colors)) {
    Object.entries(theme.colors).forEach(([variable, value]) => {
      
      if (value.includes('#')) {
        const { h, s, l } = hexToHSL(value);
        document.documentElement.style.setProperty(`--${transformCamelToKebab(variable)}`, `${h} ${s}% ${l}%` );
      }

      if (value.includes('%')) {
        document.documentElement.style.setProperty(`--${transformCamelToKebab(variable)}`, value);
      }
    });  
  }  
}

export const  hexToHSL = (hex: string) => {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export const convertToHex = (color: string): string => {
  if (color.startsWith('#')) {
    return color;
  }

  const [h, s, l] = color.split(' ').map((value, index) => index === 0 ? parseInt(value) : parseFloat(value));
  return hslToHex(h, s, l);
}

const transformCamelToKebab = (variable: string): string => {
  return variable.replace(/([A-Z])/g, '-$1').toLowerCase();
};
