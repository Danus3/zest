import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useInViewport } from "ahooks";
import { Options } from "ahooks/es/useInViewport";

const LazyImage = ({
  src: outerSrc,
  loading = "lazy",
  className,
  alt,
  rootMargin,
  threshold,
  root,
  ...rest
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> &
  Options) => {
  // const [src, setSrc] = useState(outerSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const ref = React.useRef<HTMLImageElement>(null);

  const [isInViewPort] = useInViewport(ref, {
    rootMargin: rootMargin ?? "-100px",
    threshold: threshold ?? 0,
    root: root ?? null
  });

  useEffect(() => {
    if (!isInViewPort) {
      return;
    }
    if (!outerSrc) {
      return setIsError(true);
    }
    const img = new Image();
    img.src = outerSrc;
    img.onload = () => {
      setIsLoaded(true);
    };
    img.onerror = () => {
      setIsError(true);
    };
  }, [outerSrc, isInViewPort]);
  if (isError || !isLoaded) {
    return <img src={""} className={className} alt={alt} {...rest} ref={ref} />;
  }
  return (
    <img
      src={outerSrc}
      className={classNames(className, "loaded")}
      loading={loading}
      alt={alt}
      {...rest}
    />
  );
};

export default LazyImage;
