import { EditableArea, EditableComponent } from "@magnolia/react-editor";
import { useLayoutEffect, useState } from "react";
import { renderHomeHeader } from "./Home";
import Footer from "../components/Footer";
import AuthorThumbnail from "../components/AuthorThumbnail";
import Banner from "../components/Banner";
import About from "../components/About";
import Grid from '../components/Grid';
import LinksBanner from "../../components/LinksBanner";

function Basic(props) {
  const { title, publish_date, banner_image, main } = props;
  const [header, setHeader] = useState();

  useLayoutEffect(() => {
    setHeader(JSON.parse(sessionStorage.getItem("header")));
  }, []);

  return (
    <div className="Basic">
      {header && (
        <EditableArea content={header} customView={renderHomeHeader} />
      )}
      <div className="flex-center">
        <div className="page-container">
          <div>
            {title && <div className="page-title" dangerouslySetInnerHTML={{ __html: title }} />}
          </div>

          {banner_image && <Banner image={banner_image} />}
          <div className="Columns">
            <div className="row">
              <div className="col-4">
                <AuthorThumbnail name='Rasmus Skjoldan' createdAt={publish_date} />
              </div>
              <div className="col-8">
                {main && <EditableArea content={main} />}
                <LinksBanner />
                <About />
              </div>


            </div>
          </div>
          <Grid isFooter />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Basic;
