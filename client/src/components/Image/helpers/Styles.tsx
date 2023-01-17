import React from 'react';

export enum EnumSelectionShape {
  Square = 'square',
  Circle = 'circle',
}

export interface ICropperStyles {
  dragPointsColor?: string;
  borderColor?: string;
  selectionShape?: EnumSelectionShape;
  selectionShapeColor?: string;
}

type TCropperStyles = ICropperStyles & {
  containerCls: string;
};

const CropperStyles: React.FC<TCropperStyles> = ({ containerCls, selectionShape = EnumSelectionShape.Circle }) => {
  const c = `.${containerCls}`;

  const styles = `
     ${c} .ReactCrop__drag-handle::after {
      border: none;
    display: none;
    }

    ${c} .ReactCrop__crop-selection {
      border: 3px solid #fff;
      border-radius: ${selectionShape === EnumSelectionShape.Circle ? '50%' : '0'};
    }
  `;

  return <style>{styles}</style>;
};

export default CropperStyles;
