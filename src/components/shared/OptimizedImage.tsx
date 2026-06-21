import type { ImgHTMLAttributes } from 'react';

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  formats?: Array<'avif' | 'webp'>;
  cacheKey?: string;
};

export default function OptimizedImage({ src, alt, sizes = '100vw', formats = ['avif', 'webp'], cacheKey, ...props }: OptimizedImageProps) {
  const versioned = (url: string) => cacheKey ? `${url}?v=${encodeURIComponent(cacheKey)}` : url;
  const modernSource = (extension: 'avif' | 'webp') => src.replace(/\.(?:jpe?g|png)$/i, `.${extension}`);
  const responsiveSource = (extension: 'avif' | 'webp') => {
    if (!/\.jpe?g$/i.test(src)) return versioned(modernSource(extension));
    const base = src.replace(/\.jpe?g$/i, '');
    return `${versioned(`${base}-640.${extension}`)} 640w, ${versioned(`${base}-960.${extension}`)} 960w, ${versioned(`${base}.${extension}`)} 1376w`;
  };

  return (
    <picture className="contents">
      {formats.map((format) => (
        <source key={format} srcSet={responsiveSource(format)} sizes={sizes} type={`image/${format}`} />
      ))}
      <img src={versioned(src)} alt={alt} sizes={sizes} {...props} />
    </picture>
  );
}
