export function shortAddress(address: string | null | undefined, start = 6, end = 4): string {
  try {
    if (!address) {
      return '';
    }
    if (address.startsWith('maven:')) {
      start = 10;
    }
    return `${address.substring(0, start)}...${address.substring(address.length - end, address.length)}`.toUpperCase();
  } catch (error) {
    return '';
  }
}
