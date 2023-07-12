const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_MGNL_HOST;
const spaRootNodePath = process.env.NEXT_PUBLIC_NEXT_APP_MGNL_APP_BASE;
const pagePath = process.env.NEXT_PUBLIC_NEXT_APP_MGNL_API_PAGES;
const pagesNavPath = process.env.NEXT_APP_MGNL_API_NAV;
const annotionsPath = process.env.NEXT_APP_MGNL_API_ANNOTATIONS;
const subIdQueryString = process.env.NEXT_PUBLIC_NEXT_APP_MGNL_SUB_ID_STRING;

const pagesApi = baseUrl + pagePath + spaRootNodePath + subIdQueryString;
const pagesNavApi = baseUrl + pagesNavPath + subIdQueryString;

const templateAnnotationsApi =
	baseUrl + annotionsPath + spaRootNodePath + subIdQueryString;

const getPageUrl = (nodePath) => {
	return baseUrl + pagePath + nodePath + subIdQueryString;
};

const getTemplatesUrl = (nodePath) => {
	return baseUrl + annotionsPath + nodePath + subIdQueryString;
};

const getNodesUrl = (nodePath, limit = 9, offset = 0) => {
	return baseUrl + pagePath + nodePath  +  '/articles' + '@nodes' + subIdQueryString + `&limit=${limit}` + `&offset=${offset}`;
};

export {
	baseUrl,
	spaRootNodePath,
	pagesApi,
	pagesNavApi,
	templateAnnotationsApi,
	getPageUrl,
	getTemplatesUrl,
	getNodesUrl,
};
