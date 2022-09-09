import { ChangeEvent, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

export const ImageUploadEditor = () => {
  const editor = useRef(null);
  const [imageState, setImageState] = useState({
    image:
      'https://images.unsplash.com/photo-1613310023042-ad79320c00ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    allowZoomOut: false,
    position: { x: 0.5, y: 5.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
    width: 500,
    height: 500,
  });

  const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(e.target.value);
    setImageState({
      ...imageState,
      scale,
    });
  };
  return (
    <div>
      <AvatarEditor
        backgroundColor='#fff'
        borderRadius={10}
        ref={editor}
        image={imageState.image}
        width={imageState.width}
        height={imageState.height}
        position={imageState.position}
        scale={parseFloat(`${imageState.scale}`)}
      />
      <input
        name='scale'
        type='range'
        onChange={handleScale}
        min={imageState.allowZoomOut ? '0.1' : '1'}
        max='5'
        step='0.01'
        defaultValue='1'
      />
      <button
        onClick={() => {
          if (editor && editor.current) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            console.log(editor.current);
          }
        }}
      >
        Save
      </button>
    </div>
  );
};
