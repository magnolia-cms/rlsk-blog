import { EditablePage, EditorContextHelper } from "@magnolia/react-editor";
import { config } from "../magnolia.config";

import {
  spaRootNodePath,
  pagesNavApi,
  getPageUrl,
  getTemplatesUrl,
  getNodesUrl,
} from "../utils/api";

export async function getStaticPaths() {
  console.log("----------------");
  console.log("getStaticPaths: pagesNavApi:", pagesNavApi);
  console.log("----------------");

  const res = await fetch(pagesNavApi);
  const pages = await res.json();

  const paths = pages.results.map((page) => page["@metadata"]["@path"]);
  console.log("paths ----------")
  console.log(paths)
  paths.push("/");

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const resolvedUrl = context.preview
    ? context.previewData.query.slug
    : context.params.pathname
      ? "/" + context.params.pathname.join("/")
      : "";

  const isPagesApp = !!context.previewData || null;

  /*
    Use the EditorContextHelper to get the correct path when the
    path is / this will resolve to /magnetic on the nodePath property
  */
  const magnoliaContext = EditorContextHelper.getMagnoliaContext(
    resolvedUrl,
    spaRootNodePath
  );

  const props = {};
  let pageJson;
  const pageUrl = getPageUrl(magnoliaContext.nodePath);
  const pagesRes = await fetch(pageUrl);

  pageJson = await pagesRes.json();

  if (!pageJson.error) props.page = pageJson;

  let templateAnnotationsJson;
  /*
    This code should be behide a conditional that checks if the user is in page edit mode
  */
  if (isPagesApp) {
    const templatesUrl = getTemplatesUrl(magnoliaContext.nodePath);
    const templateAnnotationsRes = await fetch(templatesUrl);
    templateAnnotationsJson = await templateAnnotationsRes.json();
    props.templateAnnotations = templateAnnotationsJson;
  }


  /*
  Fetch articles
  Currently disabled. Ideally we would fetch articles at this level and pass them down to the components
	
  let nodes;
  const nodesUrl = getNodesUrl(spaRootNodePath);
  const nodesRes = await fetch(nodesUrl);
  nodes = await nodesRes.json();

  props.nodes = nodes;
  */

  // Required by @magnolia/react-editor
  global.mgnlInPageEditor = magnoliaContext.isMagnoliaEdit;

  return { props };
}

export default function Pathname(props) {
  const { page = {}, templateAnnotations = {}, nodes = {} } = props;
  // const title = page.browserTitle || page["@name"];

  // page.nodes = nodes; add articles to the page object

  return (
    <EditablePage
      content={page}
      config={config}
      templateAnnotations={templateAnnotations}
    />
  );
}

//http://localhost:3000/api/preview?slug=/magnetic&mgnlPreview=false&mgnlChannel=desktop
