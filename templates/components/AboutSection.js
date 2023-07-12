import Img from "../../components/Img";
import CTA from "../../components/CTA";

function renderText(title, text, pageLink, ctaTitle) {
  return title || text || ctaTitle ? (
    <div className="About__content">
      {title && <div className="page-title">{title}</div>}
      {text && (
        <div className="text" dangerouslySetInnerHTML={{ __html: text }} />
      )}

      <CTA
        className="btn"
        pageLink={pageLink}
        ctaTitle={ctaTitle}
      />
    </div>
  ) : null;
}

function renderImage(image) {
  return image ? (
    <div className="About__image">
      <Img image={image} withCaption={true} />
    </div>
  ) : null;
}

function AboutSection(props) {
  const {
    title,
    text,
    image,
    pageLink,
    ctaTitle,
  } = props;

  return (
    <div className="About__container">
      {renderImage(image)}
      {renderText(title, text, pageLink, ctaTitle)}
    </div>
  );
}

export default AboutSection;
