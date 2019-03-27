import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import { bgSidebar } from "../../data";
import imgQr from '../images/qr.png';

class AboutPage extends React.Component {
  render() {
    return (
      <div className="master">
        <Helmet
          title={config.siteTitle}
          meta={[
            {
              name: "description",
              content: `${config.siteTitle} ${config.siteTitleAlt}`
            },
            {
              name: "keywords",
              content:
                "frontend,developer,wordpress,react,hochiminh,web-developer"
            }
          ]}
        />
        <main className="inner">
          <div className="page-about">
            <div className="about-body">
              <div className="single-post-container">
                <div className="post-content">
                  <article>
                    <header>
                      <h1 className="single-post-title">Hỗ trợ bằng Zalo Pay</h1>
                    </header>
                    <div style={{ textAlign: 'center' }}>
                      <img src={imgQr} alt="Ủng hộ mình bằng QR"/>
                    </div>
                    <p>
                      Nếu bạn muỗn hỗ trợ mình, có thể thông qua ứng dụng <a target="_blank" rel="noopener noreferrer" href="https://zalopay.vn/huong-dan-su-dung/index.html">Zalo Pay.</a>
                    </p>
                    <p>Chân thành cảm ơn mọi sự hỗ trợ!</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div
          className="aside"
          style={{ backgroundImage: `url(${bgSidebar[7]})` }}
        >
          <div className="company-info">
            <div className="company-name">{config.siteTitle}</div>
            <div className="company-tagline">{config.siteTitleAlt}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
