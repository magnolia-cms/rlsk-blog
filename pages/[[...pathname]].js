import React, { useEffect, useState } from "react";

import { EditablePage, EditorContextHelper } from "@magnolia/react-editor";
import { config } from "../magnolia.config";
import { encode } from "querystring";

import {
  spaRootNodePath,
  pagesNavApi,
  getPageUrl,
  getTemplatesUrl,
} from "../utils/api";

export async function getStaticPaths() {
  let paths = [];

  const navAPI = pagesNavApi();
  const res = await fetch(navAPI);
  const pages = await res.json();

  console.log("----------------");
  console.log("getStaticPaths: pagesNavApi:", navAPI);
  console.log("----------------");

  paths = pages.results.map((page) => {
    let path = page["@metadata"]["@path"];

    if (spaRootNodePath) {
      return path.replace(spaRootNodePath, "");
    } else {
      return path;
    }
  });
  paths.push("/");

  console.log("getStaticPaths:" + paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // Handle both Next.JS Preview mode or normal Static rendering.
  let resolvedUrl;
  if (context.preview) {
    let q = encode(context.previewData.query);
    resolvedUrl = `${context.previewData.query.slug}?${q}`;
  } else {
    resolvedUrl = context.params.pathname
      ? "/" + context.params.pathname.join("/")
      : "";
  }



  // const resolvedUrl = context.preview
  //   ? context.previewData.query.slug
  //   : context.params.pathname
  //     ? "/" + context.params.pathname.join("/")
  //     : "";

  // const isPagesApp = !!context.previewData || null;

  /*
    Use the EditorContextHelper to get the correct path when the
    path is / this will resolve to /magnetic on the nodePath property
  */
  const magnoliaContext = EditorContextHelper.getMagnoliaContext(
    resolvedUrl,
    ""
  );

  console.log("magnoliaContext:", magnoliaContext);

  let nodePath = resolvedUrl.split("?")[0];

  if (spaRootNodePath) {
    if (!nodePath.startsWith(spaRootNodePath)) {
      console.log("Prefix nodePath with: ", spaRootNodePath);
      nodePath = `${spaRootNodePath}${nodePath}`;
    }
  }

  const props = {};
  let pageJson;
  const pageUrl = getPageUrl(nodePath);
  const pagesRes = await fetch(pageUrl);
  pageJson = await pagesRes.json();

  if (!pageJson.error) props.page = pageJson;

  // Get header from home page. (If not on homepage ;) )
  let homeJson;
  const homeNodePath =
    spaRootNodePath != "" ? spaRootNodePath : "/" + nodePath.split("/")[1];
  // console.log("homeNodePath", homeNodePath);

  if (homeNodePath != nodePath) {
    const homeUrl = getPageUrl(homeNodePath);
    console.log("homeUrl", homeUrl);
    const homeRes = await fetch(homeUrl);
    if (homeRes.status == 200) {
      homeJson = await homeRes.json();
      pageJson.header = homeJson.header;
    }
  }


  if (!pageJson.error) props.page = pageJson;
  props.isPagesApp = magnoliaContext.isMagnoliaEdit;
  props.templateAnnotationsUrl = getTemplatesUrl(nodePath);



  /*
    This code should be behide a conditional that checks if the user is in page edit mode
  */
  // let templateAnnotationsJson;

  // if (isPagesApp) {
  //   const templatesUrl = getTemplatesUrl(magnoliaContext.nodePath);
  //   const templateAnnotationsRes = await fetch(templatesUrl);
  //   templateAnnotationsJson = await templateAnnotationsRes.json();
  //   props.templateAnnotations = templateAnnotationsJson;
  // }


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
  const { page = {}, templateAnnotationsUrl, isPagesApp } = props;
  // const title = page.browserTitle || page["@name"];

  // page.nodes = nodes; add articles to the page object

  const [templateAnnotations, setTemplateAnnotations] = useState();

  useEffect(() => {
    async function fetchTemplateAnnotations() {
      const templateAnnotationsRes = await fetch(templateAnnotationsUrl);
      const templateAnnotationsJson = await templateAnnotationsRes.json();
      setTemplateAnnotations(templateAnnotationsJson);
    }

    if (isPagesApp) fetchTemplateAnnotations();
  }, [isPagesApp, templateAnnotationsUrl]);

  return (
    <EditablePage
      content={page}
      config={config}
      templateAnnotations={templateAnnotations}
    />
  );
}

//http://localhost:3000/api/preview?slug=/magnetic&mgnlPreview=false&mgnlChannel=desktop
