<template>
  <b-card no-body class="mb-4">
    <b-card-header>
      Mining Algorithm
    </b-card-header>

    <b-card-body>
      <p>A. Prepare Block Header (data) </p>
      <p> 1. Pick a random Nonce (number used only once) between 0 - 4,294,967,295 </p>
      <p> 2. Calculate Hash: sha256d ( Block Header + Nonce ) </p>

      3. If Hash is less than Target then the block is considered valid and will be propagated to the network. The miner is awarded the mining reward + transaction fees (currently <em style="color: orange; font-weight: bolder">~6.25₿</em>)!
      <br/>
      &nbsp;&nbsp;&nbsp;If not - go back to step 1 try again!
    </b-card-body>
  </b-card>
</template>
