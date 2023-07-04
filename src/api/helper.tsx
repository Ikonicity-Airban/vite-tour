export const tiltOptions = {
  reverse: false, // reverse the tilt direction
  max: 45, // max tilt rotation (degrees)
  perspective: 3000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 0.9, // 2 = 200%, 1.5 = 150%, etc..
  speed: 5000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

export function truncateString(str: string, maxLength: number): string {
  return str?.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}
