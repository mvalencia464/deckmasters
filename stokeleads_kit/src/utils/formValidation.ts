export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  projectDetails: string;
  consent: boolean;
  projectImage?: File | null;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (flexible format)
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

export const validateForm = (formData: FormData): FormValidationResult => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!formData.name.trim()) {
    errors.push({
      field: 'name',
      message: 'Full name is required'
    });
  } else if (formData.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Name must be at least 2 characters long'
    });
  } else if (formData.name.trim().length > 100) {
    errors.push({
      field: 'name',
      message: 'Name must be less than 100 characters'
    });
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.push({
      field: 'email',
      message: 'Email address is required'
    });
  } else if (!EMAIL_REGEX.test(formData.email.trim())) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address'
    });
  } else if (formData.email.trim().length > 254) {
    errors.push({
      field: 'email',
      message: 'Email address is too long'
    });
  }

  // Phone validation (optional but if provided, must be valid)
  if (formData.phone.trim()) {
    const cleanPhone = formData.phone.replace(/[\s\-\(\)\.]/g, '');
    if (cleanPhone.length < 10) {
      errors.push({
        field: 'phone',
        message: 'Phone number must be at least 10 digits'
      });
    } else if (cleanPhone.length > 15) {
      errors.push({
        field: 'phone',
        message: 'Phone number is too long'
      });
    } else if (!/^\+?[\d]+$/.test(cleanPhone)) {
      errors.push({
        field: 'phone',
        message: 'Phone number contains invalid characters'
      });
    }
  }

  // Project details validation (optional but if provided, should have reasonable length)
  if (formData.projectDetails.trim() && formData.projectDetails.trim().length > 2000) {
    errors.push({
      field: 'projectDetails',
      message: 'Project details must be less than 2000 characters'
    });
  }

  // Project image validation (optional but if provided, must be valid)
  if (formData.projectImage) {
    const file = formData.projectImage;
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    if (file.size > maxSize) {
      errors.push({
        field: 'projectImage',
        message: 'Image file must be less than 10MB'
      });
    }

    if (!allowedTypes.includes(file.type)) {
      errors.push({
        field: 'projectImage',
        message: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)'
      });
    }
  }

  // Consent validation
  if (!formData.consent) {
    errors.push({
      field: 'consent',
      message: 'You must agree to the terms and conditions to continue'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeFormData = (formData: FormData): FormData => {
  return {
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    projectDetails: formData.projectDetails.trim(),
    consent: formData.consent,
    projectImage: formData.projectImage // File objects don't need sanitization
  };
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // If it starts with +1, keep it
  if (cleaned.startsWith('+1')) {
    return cleaned;
  }
  
  // If it's a 10-digit US number, add +1
  if (cleaned.length === 10 && !cleaned.startsWith('+')) {
    return `+1${cleaned}`;
  }
  
  // If it's 11 digits starting with 1, add +
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  
  // Otherwise return as is
  return cleaned;
};
