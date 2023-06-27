import { EditableArea, EditableComponent } from "@magnolia/react-editor";
import { useLayoutEffect, useState } from "react";
import { renderHomeHeader } from "./Home";
import Footer from "../components/Footer";
import AuthorThumbnail from "../components/AuthorThumbnail";

function Basic(props) {
  const { title, description, main } = props;

  const [header, setHeader] = useState();

  useLayoutEffect(() => {
    setHeader(JSON.parse(sessionStorage.getItem("header")));
  }, []);

  return (
    <div className="Basic">
      {header && (
        <EditableArea content={header} customView={renderHomeHeader} />
      )}

      <div className="text-center">
        {title && <div className="page-title">{title}</div>}
        {description && <div className="text">{description}</div>}
      </div>

      <div className="Columns">
        <div className="row">
          <div  className={'col-4'}>
            <AuthorThumbnail name='Rasmus' createdAt='26 June 2023'/>
          </div>
          {main && <EditableArea className={'col-8'} content={main} />}
        
        </div>
      </div>

      {/* {main && <EditableArea content={main} />} */}

      <Footer />
    </div>
  );
}

export default Basic;
