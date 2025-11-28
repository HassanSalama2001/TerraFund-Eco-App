import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    disabled,
    ...props
}) => {
    // We'll use inline styles or a CSS module for this specific component to keep it encapsulated
    // For now, let's use a simple style object approach or just class names if we had utility classes.
    // Since we are using vanilla CSS variables, let's create a module file for it or inline it.
    // I will create a module file next, but for now I will assume it exists or use inline styles for simplicity in this step, 
    // actually, let's just use the global classes or style tag for now to avoid too many files in one go, 
    // OR better, let's create the module file in the next step. 
    // For this file, I'll refer to the module.

    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? <span className={styles.loader}>...</span> : children}
        </button>
    );
};
