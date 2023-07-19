/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import Footer from '../components/Footer';
import Grid from '../components/Grid';

export function renderHomeHeader(props: any) {
	const { content } = props;
	const { image } = content;

	const navLinks = [
		{
			label: "About",
			link: "/About-Rasmus",
		}
	]

	return (
		<header className="flex">
			<div className="header">
				{image && (
					<a className="logo" href="/">
						<img
							height="200"
							width="200"
							src={image['@link']}
							alt="Logo"
						/>
					</a>
				)}
			</div>


			<nav>
				<ul className="nav-links">
					{navLinks.map(({ link, label }) => (
						<li key={label}>
							<a href={link}>
								{label}
							</a>
							{/* <EditableComponent
								content={{ ...content[nodeName] }}
							/> */}
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

export default function Home(props: any) {
	const { main, header } = props;

	return (
		<>
			<main>

				{header && (
					<EditableArea
						content={header}
						customView={renderHomeHeader}
					/>
				)}
				<div className="flex-center">
					<div className="page-container">
						{main && <EditableArea content={main} />}
						<Grid />
					</div>
				</div>
				<Footer />

			</main>
		</>
	);
}
