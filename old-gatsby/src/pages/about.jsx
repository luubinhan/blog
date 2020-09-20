import React from "react";
import Helmet from "react-helmet";
import {
  IoSocialTwitter,
  IoSocialLinkedin,
  IoSocialGithub
} from "react-icons/lib/io";
import config from "../../data/SiteConfig";
import { bgSidebar } from "../../data";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(selectedKey) {
    this.setState({
      selectedTab: selectedKey
    });
  }
  renderIcon = name => {
    switch (name) {
      case "github":
        return <IoSocialGithub />;
      case "linkedin":
        return <IoSocialLinkedin />;
      case "twitter":
        return <IoSocialTwitter />;
      default:
        return null;
    }
  };
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
            <div className="about-header">
              <div className="hero-profile">
                <div className="profile-block">
                  <div className="profile-desc">
                    <table className="reset">
                      <tbody>
                        <tr>
                          {config.userLinks.map(item => (
                            <td key={item.label}>
                              <div className="pr-30">
                                <a aria-label={item.label} title={item.label} className="link-flex" target="_blank" rel="noopener noreferrer" href={item.url}>
                                  {this.renderIcon(item.iconClassName)}
                                  <span className="pl-10 ">{item.label}</span>
                                </a>
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <ul className="nav nav-pills">
                <li>
                  <a
                    role="button"
                    aria-pressed="false"
                    tabIndex="0"
                    aria-label="Vietnamese"
                    title="Vietnamese"
                    onClick={() => this.handleSelect(1)}
                  >
                    Vietnamese
                  </a>
                </li>
                <li>
                  <a
                    role="button"
                    aria-pressed="false"
                    tabIndex="0"
                    aria-label="English"
                    title="English"
                    onClick={() => this.handleSelect(2)}
                  >
                    English
                  </a>
                </li>
              </ul>
            </div>
            <div className="about-body">
              <div className="single-post-container">
                {this.state.selectedTab === 1 && (
                  <div className="post-content">
                    <article>
                      <div className="blockquote">
                        <p>
                        Feel like he  spread the positive energy to people around</p>
                        <small>Trần Thảo Khánh, Designer</small>
                      </div>

                      <div className="blockquote">
                        <p>You're one of the best coworkers we have ever worked with</p>
                        <small>Ngô Tú Quỳnh, HR</small>
                      </div>
                      <h2>Phỏng vấn toàn thất bại</h2>
                      <p>
                        Sau khi tốt nghiệp đại học Hoa Sen năm 2011, bước chân
                        vào những lần phỏng vấn thất bại liên tiếp. Xin vào ví
                        trí <i>thiết kế web</i> cho một công ty bán nữ trang, với vốn
                        liếng HTML/CSS góp nhặt từ izwebz.com và một vài dự án nhỏ làm trong trường, "mai mắn" được
                        nhận trong ngày phỏng vấn và bị từ chối ngay hôm sau vì "anh cần người biết vẽ tay".
                      </p>
                      <p>
                        Luôn bị mắc lỗi phát âm tiếng anh, mình đâm đơn vào các
                        công ty nước ngoài nơi có phỏng vấn tiếng anh để thử
                        sức. Công ty đầu tiên làm game ở ETown, chị HR mới hỏi
                        mấy câu đơn giản tên tuổi, quê quán, mình lóng nga lóng
                        ngóng không biết trả lời sau, thấy bí quá chị nói "thôi
                        để chị hỏi tiếng Việt"
                      </p>
                      <p>
                        Cùng với cơn sốt React trong ngành, mình
                        cũng "đua đòi" đi xin vào vị trí React mà trong đầu
                        chẳng có tí ti gì là component, state, props, đến nói
                        lúc được Single Page App là gì mình cũng không thể nào
                        định nghĩa nổi.
                      </p>
                      <h2>Và...</h2>
                      <p>Mình định viết đến đây để các bạn đọc tức chơi, một phần giới thiệu bị bỏ lửng, không có kết thúc. Vì thực sự mình vẫn đang tiếp tục vá lại những kiến thức mình còn lủng, mình sẽ còn tiếp tục phỏng vấn rớt dài dài vì không đủ đáp ứng yêu cầu cho công việc.</p>
                    </article>
                  </div>
                )}
                {this.state.selectedTab === 2 && (
                  <div className="post-content">
                    <article>
                      <div className="blockquote">
                        <p>
                        Feel like he  spread the positive energy to people around</p>
                        <small>Trần Thảo Khánh, Designer</small>
                      </div>

                      <div className="blockquote">
                        <p>You're one of the best coworkers we have ever worked with</p>
                        <small>Ngô Tú Quỳnh, HR</small>
                      </div>
                      <p>
                        I moved to the largest city in vietnam, formerly named
                        saigon in 2007 and became a web tailor since 2011,
                        working on tons of projects, I believe that what makes a
                        great website is fascinating message, together with an
                        immediate understanding, original content and easily
                        traceable information.
                      </p>
                      <p>I created this blog to update my knowledge, also I aim to help other developers who interest in Frontend, javascript, stylesheet but found themselves difficult with reading english.</p>
                    </article>
                  </div>
                )}
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
