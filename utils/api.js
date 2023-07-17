const baseUrl = process.env.NEXT_PUBLIC_MGNL_HOST;
const spaRootNodePath = process.env.NEXT_PUBLIC_MGNL_APP_BASE ?? "";
const pagePath = process.env.NEXT_PUBLIC_MGNL_API_PAGES;
const pagesNavPath = process.env.NEXT_APP_MGNL_API_NAV;
const annotionsPath = process.env.NEXT_APP_MGNL_API_ANNOTATIONS;

const pagesApi = baseUrl + pagePath + spaRootNodePath;

const pagesNavApi = () => {
	if (spaRootNodePath) {
	  return baseUrl + pagesNavPath + spaRootNodePath + "@nodes";
	} else {
	  return baseUrl + pagesNavPath;
	}
  };

const templateAnnotationsApi = baseUrl + annotionsPath + spaRootNodePath;

const getPageUrl = (nodePath) => {
	return baseUrl + pagePath + nodePath;
};

const getTemplatesUrl = (nodePath) => {
	return baseUrl + annotionsPath + nodePath;
};

const getNodesUrl = (nodePath, limit = 9, offset = 0) => { 
	return baseUrl + pagePath + nodePath  +  '/articles' + '@nodes' + `?limit=${limit}` + `&offset=${offset}`
	// return 'https://delivery-preview.saas.magnolia-cloud.com' + pagePath + nodePath +  '/articles'  + '@nodes'+ '?subid_token=wx3syfku1tgshmc4'+ `&limit=${limit}` + `&offset=${offset}`;
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
