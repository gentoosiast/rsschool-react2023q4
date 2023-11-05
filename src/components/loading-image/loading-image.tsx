import type { DetailedHTMLProps, ImgHTMLAttributes, JSX } from 'react';
import { useEffect, useState } from 'react';

export function LoadingImage({
  ...props
}: DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>): JSX.Element {
  const [imgSrc, setImgSrc] = useState<string>('');

  const { src = '' } = props;

  useEffect(() => {
    const img = new Image();

    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return imgSrc ? (
    <img {...{ ...props, src: imgSrc }} alt={props.alt || ''} />
  ) : (
    <div
      className="skeleton"
      style={{ height: `${props.height}px`, width: `${props.width}px` }}
    />
  );
}
