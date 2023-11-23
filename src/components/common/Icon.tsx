import React from 'react';
import Image from 'next/image';

interface Props {
  iconName: string;
  className?: string;
  layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
  width?: number;
  height?: number;
}

const Icon = ({ iconName, className = '', layout, width = 24, height = 24 }: Props) => {
  const iconPath = `/assets/${iconName}.svg`;

  return (
    <div className={className}>
      <Image src={iconPath} alt={iconName} width={width} height={height} layout={layout} />
    </div>
  );
};

export default Icon;
