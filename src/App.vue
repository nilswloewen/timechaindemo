<template>
  <div id="app">
    <full-page :options="options" id="fullpage">
      <div class="section">
        <b-container class="vh-100">
          <b-row align-v="center" class="vh-100">
            <b-col>
              <b-card
                  align-v="center"
                  title="Manual Miner"
                  tag="article"
                  class="mb-2">
                <b-card-text>
                  "Mining" is a global competition to validate and record transactions onto the blockchain.
                  Each contestant performs verifiable work and the winner gets newly minted bitcoin.
                  Scroll down to learn more.
                </b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <div class="section">
        <b-container class="vh-100">
          <b-row align-v="center" class="vh-100">
            <b-col>
              <b-card
                  align-v="center"
                  title="Get Work"
                  tag="article"
                  class="mb-2">
                <b-card-text>

                  A full node gathers information about what goes into the next block and sends it to the miner.
                  The body of the block is recent transactions. These are organized in a merkle tree. A new transaction is added
                  to the list that awards the miner new bitcoin and the transaction fees.
                  <ul>
                    Requirements of a Full Node
                    <li>Online 24/7</li>
                    <li>Listen for new transactions and blocks</li>
                    <li>Verify transactions and blocks against the blockchain</li>
                    <li>Relay valid transactions and blocks to the rest of the network (Peer-to-peer)</li>
                  </ul>
                  <img src="/assets/mind-blown-full-node.png" alt="Mind blown meme"/>

                  <h3>Gather information about the next block, this is called the <em>Block Header</em></h3>
                  <ul>
                    <li>Version of bitcoin protocol</li>
                    <li>Previous block hash</li>
                    <li>Merkle Root</li>
                    <li>Timestamp</li>
                    <li>Record of current Difficulty called <em>Bits</em></li>
                    <li>A number used only once, called a <em>Nonce</em></li>
                  </ul>
                </b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <div class="section">
        <b-container class="vh-100">
          <b-row align-v="center" class="vh-100">
            <b-col>
              <b-card
                  align-v="center"
                  title="Mining"
                  tag="article"
                  class="mb-2">
                <b-card-text>
                  The goal of the miner is to find the ID of the next block from the block header.
                  This would be a trivial task if not for the difficulty requirement.

                  The block id is simply a hash of the block header.
                  The a hash is psuedo-random, as one cannot predict the output, but the same input always produces
                  the same output.
                  <ol>
                    <li>Gather recent, valid transactions, usually favoring those with the highest transaction fee.(Mempool)</li>
                    <li>Add a transaction that awards transaction feeds to the miner, as well as newly minted Bitcoin as per the award protocol</li>
                    <li>Organize transactions into a Merkle tree to compute the <em>Merkle Root</em>.</li>
                  </ol>
                </b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <div class="section">
        <b-container class="vh-100">
          <b-row align-v="center" class="vh-100">
            <b-col>
              <b-card
                  align-v="center"
                  title="Algorithm"
                  tag="article"
                  class="mb-2">
                <b-card-text>
                  <ol>
                    <li>Compute the hash of the block header plus a nonce.</li>
                    <li>Compare the hash against the target.</li>
                    <li>If the hash is less than the target: YOU WIN!
                      <ol>
                        <li>Relay wining block to the network</li>
                        <li>Start working on the next block</li>
                      </ol>
                    </li>
                    <li>
                      Else: Increment the nonce and TRY AGAIN!
                    </li>
                  </ol>
                  Okay, so how hard is it, really?
                </b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <div id="" class="section">
        <b-container class="vh-100">
          <b-row align-v="center" class="vh-100">
            <b-col>
              <b-card
                  align-v="center"
                  title="Mine by hand"
                  tag="article"
                  class="mb-2">
                <b-card-text>
                  Thanks to learnmeabitcoin.com for technical explanations of serialization.
                  Thanks to blockchaindemo.io for inspiration on gui.
                </b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </div>

    </full-page>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      options: {
        licenseKey: 'YOUR_KEY_HERE',
        afterLoad: this.afterLoad,
        scrollOverflow: false,
        scrollBar: false,
        menu: '#menu',
        navigation: true,
        anchors: ['page1', 'page2', 'page3'],
        sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab']
      }
    }
  },

  methods: {
    addSection (e) {
      e.preventDefault()
      const newSectionNumber = document.querySelectorAll('.fp-section').length + 1;

      // creating the section div
      const section = document.createElement('div');
      section.className = 'section'
      section.innerHTML = `<h3>Section ${newSectionNumber}</h3>`

      // adding section
      document.querySelector('#fullpage').appendChild(section)

      // creating the section menu element
      const sectionMenuItem = document.createElement('li');
      sectionMenuItem.setAttribute('data-menuanchor', 'page' + newSectionNumber)
      sectionMenuItem.innerHTML = `<a href="#page${newSectionNumber}">Section${newSectionNumber}</a>`

      // adding it to the sections menu
      const sectionsMenuItems = document.querySelector('#menu');
      sectionsMenuItems.appendChild(sectionMenuItem)

      // adding anchor for the section
      this.options.anchors.push(`page${newSectionNumber}`)

      // we have to call `update` manually as DOM changes won't fire updates
      // requires the use of the attribute ref="fullpage" on the
      // component element, in this case, <full-page>
      // ideally, use an ID element for that element too
      this.$refs.fullpage.build()
    },

    removeSection () {
      const sections = document.querySelector('#fullpage').querySelectorAll('.fp-section');
      const lastSection = sections[sections.length - 1];

      // removing the last section
      lastSection.parentNode.removeChild(lastSection)

      // removing the last anchor
      this.options.anchors.pop()

      // removing the last item on the sections menu
      const sectionsMenuItems = document.querySelectorAll('#menu li');
      const lastItem = sectionsMenuItems[sectionsMenuItems.length - 1];
      lastItem.parentNode.removeChild(lastItem)
    },

    toggleNavigation () {
      this.options.navigation = !this.options.navigation
    },

    toggleScrollbar () {
      this.options.scrollBar = !this.options.scrollBar
    }
  }
}
</script>

<style>
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
