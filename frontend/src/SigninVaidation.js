import * as yup from 'yup';

// import { DEFAULT_TEXTFIELD_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH, ValidNameRegex } from '@sz/constants';

export const signupFormErrorMessages = {
  
    'username:required': 'Please enter Email ID',
    'username:email': 'Invalid Email',
    'username:max': 'Email must not be 256 letters long',
    'username:valid': 'The user name cannot contain numerical and special characters',
    'username:min': 'Please enter at least 3 characters',
  
    'password:required': 'Please enter Password',
    'password:min': 'Please enter at least 8 characters',
    'password:max': 'Only 25 characters are allowed for the Password',
  
    
  };
  
  export const signupValidationSchema = yup
    .object({
      
      username: yup
        .string()
        .required(signupFormErrorMessages['username:required'])
        .min(3, signupFormErrorMessages['username:min'])
        .max(25, signupFormErrorMessages['username:max']),
        
      password: yup
        .string()
        .required(signupFormErrorMessages['password:required'])
        .min(1, signupFormErrorMessages['password:min'])
        .max(25, signupFormErrorMessages['password:max']),
     
      //promoCode: yup.string(),
    })
    .required();