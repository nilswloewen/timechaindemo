<template>
  <div id="app">
    <ul id="menu">
      <li data-menuanchor="page1" class="active"><a href="#page1">Section 1</a></li>
      <li data-menuanchor="page2"><a href="#page2">Section 2</a></li>
      <li data-menuanchor="page3"><a href="#page3">Section 3</a></li>
    </ul>

    <ul class="actions">
      <li>
        <a class="actions-button" href="#" rel="noopener" @click="addSection">Add section</a>
      </li>
      <li>
        <a class="actions-button" href="#" rel="noopener" @click="removeSection">Remove section</a>
      </li>
      <li>
        <a class="actions-button" href="#" rel="noopener" @click="toggleNavigation">Toggle nav</a>
      </li>
      <li>
        <a class="actions-button" href="#" rel="noopener" @click="toggleScrollbar">
          Toggle scrollBar</a>
      </li>
    </ul>

    <full-page :options="options" id="fullpage">
      <div class="section">
        <h3>Section 1</h3>
      </div>
      <div class="section">
        <div class="slide">
          <h3>Slide 2.1</h3>
        </div>
        <div class="slide">
          <h3>Slide 2.2</h3>
        </div>
        <div class="slide">
          <h3>Slide 2.3</h3>
        </div>
      </div>
      <div class="section">
        <h3>Section 3</h3>
      </div>
    </full-page>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      options: {
        licenseKey: '2C8168FC-415648B7-B94C4003-80F51EAC',
        scrollBar: false,
        menu: '#menu',
        navigation: true,
        anchors: ['page1', 'page2', 'page3'],
        sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab'],
      },
    };
  },
  methods: {
    addSection(e) {
      e.preventDefault();
      const newSectionNumber = document.querySelectorAll('.fp-section').length + 1;

      // creating the section div
      const section = document.createElement('div');
      section.className = 'section';
      section.innerHTML = `<h3>Section ${newSectionNumber}</h3>`;

      // adding section
      document.querySelector('#fullpage').appendChild(section);

      // creating the section menu element
      const sectionMenuItem = document.createElement('li');
      sectionMenuItem.setAttribute('data-menuanchor', `page${newSectionNumber}`);
      sectionMenuItem.innerHTML = `<a href="#page${newSectionNumber}">Section${newSectionNumber}</a>`;

      // adding it to the sections menu
      const sectionsMenuItems = document.querySelector('#menu');
      sectionsMenuItems.appendChild(sectionMenuItem);

      // adding anchor for the section
      this.options.anchors.push(`page${newSectionNumber}`);

      // we have to call `update` manually as DOM changes won't fire updates
      // requires the use of the attribute ref="fullpage" on the
      // component element, in this case, <full-page>
      // ideally, use an ID element for that element too
      this.$refs.fullpage.build();
    },
    removeSection() {
      const sections = document.querySelector('#fullpage').querySelectorAll('.fp-section');
      const lastSection = sections[sections.length - 1];

      // removing the last section
      lastSection.parentNode.removeChild(lastSection);

      // removing the last anchor
      this.options.anchors.pop();

      // removing the last item on the sections menu
      const sectionsMenuItems = document.querySelectorAll('#menu li');
      const lastItem = sectionsMenuItems[sectionsMenuItems.length - 1];
      lastItem.parentNode.removeChild(lastItem);
    },
    toggleNavigation() {
      this.options.navigation = !this.options.navigation;
    },
    toggleScrollbar() {
      this.options.scrollBar = !this.options.scrollBar;
    },
  },
};
</script>

<style>
  .section {
    position: relative;
  }
  #section-1 {
    text-align: center;
  }
  #section-1 h2:before {
    content: '';
    display: inline-block;
    height: 200px;
    width: 232px;
    vertical-align: bottom;
  }
  #section-1 h2 {
    color: #fff;
    font-size: 10em;
    font-weight: 900;
  }
  #section-1 h1 {
    font-size: 2em;
    font-weight: 100;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    margin: 1.5em auto 1em;
    color: #35495e;
    padding-right: 30px;
    padding-left: 30px;
  }
  #section-1 li {
    display: inline-block;
    margin: 1.25em 0.3em;
  }
  .section-1-button {
    padding: 0.93em 1.87em;
    background: #35495e;
    border-radius: 5px;
    display: block;
    color: #fff;
  }
  h3 {
    font-size: 5em;
    text-align: center;
    color: #fff;
    font-weight: 700;
  }

  #menu-line {
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 159px;
    height: 2px;
    background: #fff;
  }
  #menu {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 70;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    letter-spacing: 1px;
    font-size: 1.1em;
  }
  #menu li {
    display: inline-block;
    margin: 10px 0;
    position: relative;
  }
  #menu a {
    color: #fff;
    padding: 0 1.1em 1.1em;
  }
  #menu li.active a:after {
    content: '';
    margin: 0 1.1em;
    height: 2px;
    background: #fff;
    display: block;
    position: absolute;
    bottom: -6px;
    left: 0;
    right: 0;
    display: block;
  }
  .actions {
    position: fixed;
    bottom: 2%;
    margin: 0 auto;
    z-index: 99;
    left: 0;
    right: 0;
    text-align: center;
  }
  .actions li {
    display: inline-block;
    margin: 0.3em;
  }
  .actions-button {
    padding: 0.73em 1.47em;
    background: rgba(53,73,94,.47);
    border-radius: 5px;
    display: block;
    color: #fff;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
