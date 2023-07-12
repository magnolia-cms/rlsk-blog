import React, { useState, useEffect } from "react";
import Pagination from '../../components/Pagination';
import Card from './Card';
import {
	spaRootNodePath,
	getNodesUrl,
} from "../../utils/api";


function Grid({  isFooter = false }) {

	// Ideally this data for this component would be fetched server side

	const pageDimension = isFooter ? 3 : 9;
	const [selectedPage, setSelectedPage] = useState(0);
	const [art, setArt] = useState();
	const isLastPage = art?.length < 9; // to be replaced when "total" works again

	useEffect(() => {
		console.log("useEffect")
			const nodesUrl = getNodesUrl(spaRootNodePath, pageDimension, selectedPage * pageDimension);
			fetch(nodesUrl).then((res) => {
				console.log(res)
				res.json().then(json => {
					console.log(json)
					setArt(json.results)
				});
			});

	}, [selectedPage]);

	const hasPreviousPage = selectedPage > 0;
	const hasNextPage = !isLastPage;
	return (
		<>
			<div className="grid-container">
				<ul className="image-gallery">
					{
						art?.map((article) => <li key={article['@id']}>{Card(article)}</li>)
					}
				</ul>
			</div>
			{!isFooter && <Pagination
				pageInfo={{ hasNextPage, hasPreviousPage }}
				onPageChange={goTo => {
					setSelectedPage(
						goTo === "next"
							? selectedPage + 1
							: selectedPage - 1
					);
				}}
			/>}
		</>
	);
}

export default Grid;
