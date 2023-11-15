// Basic encryption and decryption functions
const key = process.env.KEY_HASH || 'KEY_HASH';

export function encrypt(input: string) {
  let result = '';
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}

export function decrypt(encrypted: string) {
  return encrypt(encrypted); // Encryption and decryption are symmetric
}
