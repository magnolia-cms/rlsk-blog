import A from "./A";

function CTA(props) {
  const { ctaTitle, pageLink, webLink, className } = props;

  return ctaTitle && (pageLink || webLink) ? (
    <A
      className={className}
      href={pageLink ? pageLink["@path"] : webLink}
      label={ctaTitle}
    />
  ) : null;
}

export default CTA;
