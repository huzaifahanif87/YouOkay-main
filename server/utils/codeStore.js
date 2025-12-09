// utils/codeStore.js

const phoneCodeStore = new Map();

export const saveCode = (phone, code) => {
  const now = Date.now();
  const entry = { code, verified: false, timestamp: now };
  phoneCodeStore.set(phone, entry);

  // Remove if not verified within 1 minute
  setTimeout(() => {
    const current = phoneCodeStore.get(phone);
    if (current && current.timestamp === now && !current.verified) {
      phoneCodeStore.delete(phone);
    }
  }, 60000); // 1 min

  // Remove completely after 5 minutes regardless
  setTimeout(() => {
    const current = phoneCodeStore.get(phone);
    if (current && current.timestamp === now) {
      phoneCodeStore.delete(phone);
    }
  }, 5 * 60 * 1000); // 5 min
};

/**
 * Verify the OTP and mark the phone number as verified
 */
export const verifyAndMark = (phone, code) => {
  const entry = phoneCodeStore.get(phone);
  if (!entry || entry.code !== code) return false;

  if (Date.now() - entry.timestamp > 60000) {
    phoneCodeStore.delete(phone);
    return false;
  }

  entry.verified = true;
  return true;
};

/**
 * Check if phone was verified within allowed 5 min
 */
export const isPhoneVerifiedInStore = (phone) => {
  const entry = phoneCodeStore.get(phone);
  return entry && entry.verified;
};

/**
 * Delete phone code manually (after registration complete or update)
 */
export const deleteCode = (phone) => {
  phoneCodeStore.delete(phone);
};

/**
 * Optional helper (if needed elsewhere)
 */
export const getCode = (phone) => {
  const entry = phoneCodeStore.get(phone);
  return entry?.code || null;
};
