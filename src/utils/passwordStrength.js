/**
 * Calculate password strength based on multiple criteria
 * @param {string} password - The password to evaluate
 * @returns {Object} - { score: 0-100, level: 'weak'|'medium'|'strong'|'very-strong', feedback: string }
 */
export function calculatePasswordStrength(password) {
  if (!password) {
    return { score: 0, level: 'weak', feedback: 'Password is empty', color: 'red' };
  }

  let score = 0;
  const feedback = [];

  // Length check (max 40 points)
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 15;
  if (password.length >= 16) score += 15;
  else if (password.length < 8) feedback.push('Use at least 8 characters');

  // Lowercase letters (10 points)
  if (/[a-z]/.test(password)) {
    score += 10;
  } else {
    feedback.push('Add lowercase letters');
  }

  // Uppercase letters (10 points)
  if (/[A-Z]/.test(password)) {
    score += 10;
  } else {
    feedback.push('Add uppercase letters');
  }

  // Numbers (10 points)
  if (/\d/.test(password)) {
    score += 10;
  } else {
    feedback.push('Add numbers');
  }

  // Special characters (20 points)
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 20;
  } else {
    feedback.push('Add special characters (!@#$%^&*)');
  }

  // No repeated characters (10 points)
  if (!/(.)\1{2,}/.test(password)) {
    score += 10;
  } else {
    feedback.push('Avoid repeated characters');
  }

  // No sequential characters (10 points)
  const hasSequential = /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789/i.test(password);
  if (!hasSequential) {
    score += 10;
  } else {
    feedback.push('Avoid sequential characters');
  }

  // Determine level and color
  let level, color, percentage;
  if (score >= 80) {
    level = 'very-strong';
    color = 'green';
    percentage = 100;
  } else if (score >= 60) {
    level = 'strong';
    color = 'green';
    percentage = 80;
  } else if (score >= 40) {
    level = 'medium';
    color = 'yellow';
    percentage = 50;
  } else {
    level = 'weak';
    color = 'red';
    percentage = 30;
  }

  return {
    score,
    level,
    color,
    percentage,
    feedback: feedback.join(', ') || 'Password looks good!',
    displayText: level === 'very-strong' ? 'Very Strong' : level.charAt(0).toUpperCase() + level.slice(1)
  };
}

/**
 * Check if a password is reused (you'll need to pass existing passwords)
 * @param {string} password - The password to check
 * @param {Array} existingPasswords - Array of existing passwords to compare against
 * @returns {boolean} - True if password is reused
 */
export function isPasswordReused(password, existingPasswords = []) {
  return existingPasswords.some(existing => existing === password);
}

/**
 * Generate a random strong password
 * @param {number} length - Length of the password (default 16)
 * @returns {string} - Generated password
 */
export function generatePassword(length = 16) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const allChars = lowercase + uppercase + numbers + special;

  let password = '';
  
  // Ensure at least one of each type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}
