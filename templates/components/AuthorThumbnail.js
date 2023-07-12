import Image from 'next/image';

function renderText(createdAt, name) {



	return createdAt || name ? (
		<div className='thumbnail-text'>
			{name && <p >{name}</p>}
			{createdAt && (
					<div>
					{new Date(createdAt).toLocaleDateString('en-GB')}
				</div>
			)}
		</div>
	) : null;
}

function renderImage() {
	return (
		<div className="col-5">
			<Image
				src="/rasmus.svg" // Route of the image file
				height={80} // Desired size with correct aspect ratio
				width={80} // Desired size with correct aspect ratio
				alt="rasmus"
			/>
		</div>
	);
}

function AuthorThumbnail(props) {
	const { name, createdAt } = props;

	return (
		<div >
			<div className='thumbnail-wrapper'>
					{renderImage()}
					{renderText(createdAt, name)}
			</div>
		</div>
	);
}

export default AuthorThumbnail;
