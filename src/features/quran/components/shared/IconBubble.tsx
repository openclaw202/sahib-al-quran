import React from 'react';

interface IconBubbleProps {
    icon: React.ReactNode;
    bgColor: string;
    iconColor: string;
    label: string;
    onClick?: () => void;
}

export const IconBubble: React.FC<IconBubbleProps> = ({
    icon,
    bgColor,
    iconColor,
    label,
    onClick,
}) => (
    <div className="flex flex-col items-center gap-2" onClick={onClick}>
        <div
            className="w-14 h-14 rounded-[22px] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
            style={{ backgroundColor: bgColor, color: iconColor }}
        >
            {icon}
        </div>
        <span className="text-[10px] font-bold text-[#1D1B4B]/20 text-center px-1 leading-tight">
            {label}
        </span>
    </div>
);
