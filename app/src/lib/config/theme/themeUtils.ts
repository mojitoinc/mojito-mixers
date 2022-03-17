export function darkenBackground(background: string, overlayColor = "rgba(0, 0, 0, 0.125)"): string {
  return `linear-gradient(0, ${ overlayColor } 0%, ${ overlayColor } 100%), ${ background }`;
}
