import React from 'react';
import './Avatar.css';

interface AvatarProps {
  letter: string;
}

export const Avatar: React.FC<AvatarProps> = ({ letter }) => {
  return (
    <div className="avatar">
      {letter.toUpperCase()}
    </div>
  );
};
