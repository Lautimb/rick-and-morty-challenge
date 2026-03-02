const NextImage = ({
  src,
  alt,
}: {
  src: string | object;
  alt: string;
}) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={typeof src === "string" ? src : ""} alt={alt} />
);

export default NextImage;
