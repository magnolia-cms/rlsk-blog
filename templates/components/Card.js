import Img from '../../components/Img';
import CTA from '../../components/CTA';

function Card(props) {
	const { title, transparentBg, banner_image, description } = props;
	const ctaTitle = 'Read Post'

	let cardClassName = 'Card';

	if (transparentBg) cardClassName += ' transparent';

	return (
		<div className="Card-wrapper">
			<div className={cardClassName}>
				<div className='image'>
					<Img className="Card__image" image={banner_image} />
				</div>
				<div className="Card__info">
					{title && <div
						className="title"
						dangerouslySetInnerHTML={{ __html: title }}
					/>}
					{description && <div
						className="text"
						dangerouslySetInnerHTML={{ __html: description }}
					/>
					}
				</div>
				{props['@path'] && <CTA className="btn" pageLink={props} ctaTitle={ctaTitle} />}
			</div>
		</div>
	);
}

export default Card;
