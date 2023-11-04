import type { JSX } from 'react';
import { useEffect, useState } from 'react';

type Props = {
  alt: string;
  height: string;
  src: string;
  width: string;
};

export function LoadingImage({ ...props }: Props): JSX.Element {
  const [imgSrc, setImgSrc] = useState<string>('');

  const { src } = props;

  useEffect(() => {
    const img = new Image();

    img.src = src;
    img.onload = () => {
      console.log('fully load');
      setImgSrc(src);
    };
  }, [src]);

  return imgSrc ? (
    <img {...{ ...props, src: imgSrc }} alt={props.alt || ''} />
  ) : (
    <div className="skeleton" style={{ height: `${props.height}px`, width: `${props.width}px` }} />
  );
}
