import Img from "../../components/Img";

function Banner(props) {
	const { image } = props;

	return (
		<div className="Banner">
			<div className="Banner__info">
				<Img className="Banner__image" image={image} />
			</div>
		</div>
	);
}

export default Banner;
