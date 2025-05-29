
// Security utility functions for input validation and sanitization

export const validateEmail = (email: string): boolean => {
  // Security: Strict email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeString = (input: string): string => {
  // Security: Basic XSS prevention - remove HTML tags and encode special characters
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

export const validatePromptContent = (content: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeString(content);
  
  if (!sanitized || sanitized.length === 0) {
    return { isValid: false, error: 'Content cannot be empty' };
  }
  
  if (sanitized.length > 10000) {
    return { isValid: false, error: 'Content too long (max 10,000 characters)' };
  }
  
  return { isValid: true };
};

export const validatePromptTitle = (title: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeString(title);
  
  if (!sanitized || sanitized.length === 0) {
    return { isValid: false, error: 'Title cannot be empty' };
  }
  
  if (sanitized.length > 200) {
    return { isValid: false, error: 'Title too long (max 200 characters)' };
  }
  
  return { isValid: true };
};

export const rateLimitCheck = (key: string, limit: number, windowMs: number): boolean => {
  // Security: Simple client-side rate limiting
  const now = Date.now();
  const windowKey = `rate_limit_${key}_${Math.floor(now / windowMs)}`;
  
  const currentCount = parseInt(localStorage.getItem(windowKey) || '0', 10);
  
  if (currentCount >= limit) {
    return false;
  }
  
  localStorage.setItem(windowKey, (currentCount + 1).toString());
  
  // Clean up old rate limit entries
  Object.keys(localStorage).forEach(storageKey => {
    if (storageKey.startsWith('rate_limit_') && storageKey !== windowKey) {
      localStorage.removeItem(storageKey);
    }
  });
  
  return true;
};
