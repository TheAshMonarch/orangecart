"use client";

interface OAuthButtonProps {
  provider: "google" | "apple" | "facebook" | "email";
  onClick?: () => void;
  fullWidth?: boolean;
}

const buttonStyles = {
  google: {
    label: "Continue with Google",
    bg: "#fff",
    border: "#e2ddd8",
    color: "#1e3a34",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.955v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
        <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.955A8.996 8.996 0 000 9c0 1.452.348 2.827.955 4.042l3.009-2.332z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.955 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
      </svg>
    ),
  },
  apple: {
    label: "Apple",
    bg: "#fff",
    border: "#e2ddd8",
    color: "#1e3a34",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.227 9.534c-.026-2.175 1.779-3.22 1.86-3.266-.988-1.448-2.526-1.646-3.077-1.665-1.303-.133-2.555.776-3.22.776-.674 0-1.706-.761-2.812-.74-1.438.022-2.77.848-3.508 2.148-1.508 2.61-.385 6.464 1.065 8.583.72 1.034 1.558 2.192 2.665 2.151 1.075-.044 1.478-.691 2.776-.691 1.287 0 1.637.691 2.749.67 1.128-.021 1.838-1.049 2.553-2.088.8-1.198 1.129-2.36 1.148-2.42-.025-.011-2.202-.842-2.227-3.342zM11.258 3.12c.597-.723 1.001-1.727.89-2.723-.863.035-1.91.574-2.53 1.297-.556.652-1.043 1.694-.911 2.69 1.02.079 2.062-.519 2.551-1.264z" fill="#000"/>
      </svg>
    ),
  },
  facebook: {
    label: "Facebook",
    bg: "#fff",
    border: "#e2ddd8",
    color: "#1e3a34",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 9a9 9 0 10-10.406 8.88v-6.288H5.309V9h2.285V7.02c0-2.255 1.343-3.5 3.4-3.5.984 0 2.014.176 2.014.176v2.215h-1.135c-1.118 0-1.467.693-1.467 1.404V9h2.496l-.399 2.592h-2.097v6.288A9.002 9.002 0 0018 9z" fill="#1877F2"/>
      </svg>
    ),
  },
  email: {
    label: "Continue with email/username",
    bg: "#fff",
    border: "#e2ddd8",
    color: "#1e3a34",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="3" width="16" height="12" rx="2" stroke="#1e3a34" strokeWidth="1.5" fill="none"/>
        <path d="M1 5l8 5 8-5" stroke="#1e3a34" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
  },
};

export default function OAuthButton({ 
  provider, 
  onClick,
  fullWidth = true 
}: OAuthButtonProps) {
  const style = buttonStyles[provider];
  
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-3 rounded-lg 
        transition-all duration-200 
        hover:shadow-md hover:scale-[1.01] 
        active:scale-[0.98]
        ${fullWidth ? 'w-full' : ''}
      `}
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        padding: "11px 16px",
        color: style.color,
        fontFamily: "Segoe UI, sans-serif",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      {style.icon}
      <span>{style.label}</span>
    </button>
  );
}

// Export individual buttons for convenience
export function GoogleButton(props: Omit<OAuthButtonProps, 'provider'>) {
  return <OAuthButton {...props} provider="google" />;
}

export function AppleButton(props: Omit<OAuthButtonProps, 'provider'>) {
  return <OAuthButton {...props} provider="apple" />;
}

export function FacebookButton(props: Omit<OAuthButtonProps, 'provider'>) {
  return <OAuthButton {...props} provider="facebook" />;
}

export function EmailButton(props: Omit<OAuthButtonProps, 'provider'>) {
  return <OAuthButton {...props} provider="email" />;
}
