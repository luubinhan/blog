module.exports = {
  blogPostDir: "posts", // The name of directory that contains your posts.
  lessonsDir: "lessons", // The name of the directory that contains lessons or docs.
  siteTitle: "luckyluu", // Site title.
  siteTitleAlt: "Front-End Developer live in Ho Chi Minh City, a photography geek, and a music lover", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://luubinhan.github.io", // Domain of your website without pathPrefix.
  pathPrefix: "/blog", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Tutorials, Blog, Hướng dẫn, chia sẽ kinh nghiệm về Front End", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "445556375516928", // FB Application ID for using app insights
  googleAnalyticsID: "UA-29685098-2", // GA tracking ID.
  disqusShortname: "", // Disqus shortname.
  postDefaultCategoryID: "React", // Default category for posts.
  userName: "luckyluu", // Username to display in the author segment.
  userTwitter: "luubinhan", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Hồ Chí Minh, Việt Nam", // User location to display in the author segment.
  userAvatar: "https://media.licdn.com/dms/image/C5103AQGApBy_aLEcjA/profile-displayphoto-shrink_100_100/0?e=1536796800&v=beta&t=ideXITyUnysPa6U5Ab97QFH20SpupsmX0Fku-fpNCLo", // User avatar to display in the author segment.
  userDescription: "Front-End Developer live in Ho Chi Minh City, a photography geek, and a music lover", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/luubinhan",
      iconClassName: "ion ion-logo-github"
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/l%C6%B0u-b%C3%ACnh-an-03556553/",
      iconClassName: "ion ion-logo-linkedin"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/ericwindmill",
      iconClassName: "ion ion-logo-twitter"
    },
  ],
  copyright: "Copyright © 2018. luckyluu", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#01A1B1", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0", // Used for setting manifest background color.
  // TODO: Move this literally anywhere better.
  toCChapters: ["", "Chapter 1", "Chapter 2"] // Used to generate the Table Of Contents. Index 0 should be blank.
};
