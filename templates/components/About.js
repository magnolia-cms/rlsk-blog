import Image from 'next/image';


function About() {

	return (
		<div className="About">
			<div className="About__container">
				<div className='About__image'>
					<Image
						src="/rasmus.svg" // Route of the image file
						height={175} // Desired size with correct aspect ratio
						width={175} // Desired size with correct aspect ratio
						alt="rasmus"
					/>
				</div>
				<div className="About__content">
					<div className="title">About Rasmus</div>
					<div className="text">
						Rasmus Skjoldan is the Chief Evangelist at Magnolia. With two decades of experience in creative, digital, and marketing roles, Rasmus is a respected authority and regular commentator in the enterprise CMS and digital experience space.
					</div>
				</div>

			</div>
		</div>
	);
}

export default About;
