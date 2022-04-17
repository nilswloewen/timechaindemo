import Intro from './components/sections/IntroSection.vue';
import Terms from './components/sections/TermsSection.vue';
import Blockchain from './components/sections/BlockchainSection.vue';
import Pow from './components/sections/PowBlockchainSection.vue';
import Timechain from './components/sections/TimeChainSection.vue';
import RealMining from './components/sections/RealMining.vue';
import Resources from './components/sections/ResourcesSection.vue';

export default {
  '/': Intro,
  '/terms': Terms,
  '/blockchain': Blockchain,
  '/pow': Pow,
  '/timechain': Timechain,
  '/real_mining': RealMining,
  '/resources': Resources
}
