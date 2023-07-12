import { EditableArea, EditableComponent } from "@magnolia/react-editor";
import { useLayoutEffect, useState } from "react";
import { renderHomeHeader } from "./Home";
import Footer from "../components/Footer";
import AuthorThumbnail from "../components/AuthorThumbnail";
import Banner from "../components/Banner";
import Grid from '../components/Grid';

function About(props) {
  const { title, description, publish_date, banner_image, main, nodes } = props;
  console.log('article props -----------------')
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

          {main && <EditableArea content={main} />}

          <h2>My Latest Posts</h2>
          <Grid isFooter />
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
