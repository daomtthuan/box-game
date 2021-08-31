import Color from 'color';

const style = getComputedStyle(document.body);

export const color = {
  primary: Color(style.getPropertyValue('--bs-primary').trim()),
  secondary: Color(style.getPropertyValue('--bs-secondary').trim()),
  success: Color(style.getPropertyValue('--bs-success').trim()),
  info: Color(style.getPropertyValue('--bs-info').trim()),
  warning: Color(style.getPropertyValue('--bs-warning').trim()),
  danger: Color(style.getPropertyValue('--bs-danger').trim()),
  light: Color(style.getPropertyValue('--bs-light').trim()),
  dark: Color(style.getPropertyValue('--bs-dark').trim()),
};
