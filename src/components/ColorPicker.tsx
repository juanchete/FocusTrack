import React from 'react';

const colors = [
  '#a855f7', // Purple
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#ef4444', // Red
  '#ec4899', // Pink
];

interface Props {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={`w-8 h-8 rounded-full transition-transform ${
            value === color ? 'scale-110 ring-2 ring-white' : ''
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}