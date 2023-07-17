import A from "./A";
import {
	spaRootNodePath,
} from "../utils/api";

function CTA(props) {
  const { ctaTitle, webLink, className } = props;
  let pageLink;

  if (spaRootNodePath && props.pageLink) {
    pageLink = props.pageLink["@path"].replace(spaRootNodePath, "");
      } 

  return ctaTitle && (pageLink || webLink) ? (
    <A
      className={className}
      href={pageLink ? pageLink : webLink}
      label={ctaTitle}
    />
  ) : null;
}

export default CTA;
