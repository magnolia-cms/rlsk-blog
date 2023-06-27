import Image from 'next/image';

function renderText(createdAt, name) {
	return createdAt || name ? (
		<div className="col-6 TextImage__text">
			{name && <div className="Story__author">{name}</div>}
			{createdAt && (
				<div className="Story__image">{createdAt}</div>
			)}
		</div>
	) : null;
}

function renderImage() {
	return (
		<div className="col-2">
			<Image
				src="/rasmus.svg" // Route of the image file
				height={80} // Desired size with correct aspect ratio
				width={80} // Desired size with correct aspect ratio
				alt="rasmus"
			/>
			{/* <Img
				className="TextImage__image"
				image={image}
				withCaption={false}
			/> */}
		</div>
	);
}

function AuthorThumbnail(props) {
	const { name, createdAt } = props;

	return (
		<div className="TextImage">
			<div className="row-center">
				<>
					{renderImage()}
					{renderText(createdAt, name)}
				</>

			</div>
		</div>
	);
}

export default AuthorThumbnail;
