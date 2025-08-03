import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const institutionOptions = [
    { value: '', label: 'Select your institution (optional)' },
    { value: 'harvard', label: 'Harvard University' },
    { value: 'mit', label: 'Massachusetts Institute of Technology' },
    { value: 'stanford', label: 'Stanford University' },
    { value: 'berkeley', label: 'UC Berkeley' },
    { value: 'oxford', label: 'University of Oxford' },
    { value: 'cambridge', label: 'University of Cambridge' },
    { value: 'caltech', label: 'California Institute of Technology' },
    { value: 'yale', label: 'Yale University' },
    { value: 'princeton', label: 'Princeton University' },
    { value: 'other', label: 'Other Institution' }
  ];

  const validatePassword = (password) => {
    const minLength = password?.length >= 8;
    const hasUpperCase = /[A-Z]/?.test(password);
    const hasLowerCase = /[a-z]/?.test(password);
    const hasNumbers = /\d/?.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/?.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers
    };
  };

  const getPasswordStrength = (password) => {
    const validation = validatePassword(password);
    const score = [
      validation?.minLength,
      validation?.hasUpperCase,
      validation?.hasLowerCase,
      validation?.hasNumbers,
      validation?.hasSpecialChar
    ]?.filter(Boolean)?.length;

    if (score <= 2) return { strength: 'Weak', color: 'text-error', bgColor: 'bg-error' };
    if (score <= 3) return { strength: 'Fair', color: 'text-warning', bgColor: 'bg-warning' };
    if (score <= 4) return { strength: 'Good', color: 'text-success', bgColor: 'bg-success' };
    return { strength: 'Strong', color: 'text-success', bgColor: 'bg-success' };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData?.password);
      if (!passwordValidation?.isValid) {
        newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
      }
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      
      // Navigate to document dashboard
      navigate('/document-dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = formData?.password ? getPasswordStrength(formData?.password) : null;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Create Your Account
        </h1>
        <p className="text-muted-foreground text-sm">
          Join 50,000+ students already using Study Buddy
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
          disabled={isLoading}
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        {/* Password */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
              disabled={isLoading}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {formData?.password && passwordStrength && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Password strength:</span>
                <span className={`text-xs font-medium ${passwordStrength?.color}`}>
                  {passwordStrength?.strength}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-300 ${passwordStrength?.bgColor}`}
                  style={{ 
                    width: passwordStrength?.strength === 'Weak' ? '25%' : 
                           passwordStrength?.strength === 'Fair' ? '50%' :
                           passwordStrength?.strength === 'Good' ? '75%' : '100%'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isLoading}
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {/* Institution */}
        <Select
          label="Institution"
          options={institutionOptions}
          value={formData?.institution}
          onChange={(value) => handleInputChange('institution', value)}
          disabled={isLoading}
          searchable
        />

        {/* Terms Agreement */}
        <div className="space-y-2">
          <Checkbox
            label="I agree to the Terms of Service and Privacy Policy"
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
            error={errors?.agreeToTerms}
            required
            disabled={isLoading}
          />
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-academic">
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          Create Account
        </Button>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Trust Signals */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">
            Trusted by students at top universities
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <span>🔒 Secure</span>
            <span>📚 Academic</span>
            <span>🌟 Trusted</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;