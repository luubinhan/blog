<template>
    <div className="sidebar">
        <div class="sidebar__inner">
            <g-link to="/" className="go-home">
              VuiLapTrinh.com
            </g-link>
            <div class="navigation-component">
              <ul
                class="nav primary-menu"
                :class="collapsed && 'collapsed'"
              >
                <li class="about">
                  <a href="https://luubinhan.github.io/" target="_blank">
                    About
                  </a>
                </li>
              </ul>
            </div>

        </div>
        <div id="footer">
            <footer class="footer">
              <section class="footer-inner">
                <div class="social-links">
                  <a class="link-youtube" href="https://www.youtube.com/channel/UC0Te8s0b0aplS1ZoVLfjKHA" target="_blank" rel="noopener noreferrer">
                    <IoSocialYoutube /> Youtube
                  </a>
                </div>
                <div class="credit">
                  Copyright © 2019. luckyluu
                </div>
              </section>
            </footer>
          </div>
    </div>
</template>