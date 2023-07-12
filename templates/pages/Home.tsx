/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import Grid from '../components/Grid';

export function renderHomeHeader(props: any) {
	const { content } = props;
	const { image } = content;

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
					{content['@nodes'].map((nodeName: any) => (
						<li key={content[nodeName]['@id']}>
							<EditableComponent
								content={{ ...content[nodeName] }}
							/>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

export default function Home(props: any) {
	const { main, header, nodes } = props;

	useEffect(() => {
		sessionStorage.setItem('header', JSON.stringify(header));
	}, [header]);

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
