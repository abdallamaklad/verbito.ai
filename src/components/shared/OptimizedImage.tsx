import type { ImgHTMLAttributes } from 'react';

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  formats?: Array<'avif' | 'webp'>;
};

export default function OptimizedImage({ src, alt, sizes = '100vw', formats = ['avif', 'webp'], ...props }: OptimizedImageProps) {
  const modernSource = (extension: 'avif' | 'webp') => src.replace(/\.(?:jpe?g|png)$/i, `.${extension}`);
  const responsiveSource = (extension: 'avif' | 'webp') => {
    if (!/\.jpe?g$/i.test(src)) return modernSource(extension);
    const base = src.replace(/\.jpe?g$/i, '');
    return `${base}-640.${extension} 640w, ${base}-960.${extension} 960w, ${base}.${extension} 1376w`;
  };

  return (
    <picture className="contents">
      {formats.map((format) => (
        <source key={format} srcSet={responsiveSource(format)} sizes={sizes} type={`image/${format}`} />
      ))}
      <img src={src} alt={alt} sizes={sizes} {...props} />
    </picture>
  );
}
