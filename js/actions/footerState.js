export const CHANGE_FOOTER = 'CHANGE_FOOTER';

export function change_footer(footerState) {
  return {
    type: CHANGE_FOOTER,
    footerState
  };
}
