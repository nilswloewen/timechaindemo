<template>
  <b-collapse id="collapse_algorithm">
    <b-card no-body>
      <b-card-header v-b-toggle="['collapse_algorithm', 'collapse_controls']">
        <b-icon-chevron-compact-up />
        Bitcoin Mining Algorithm
      </b-card-header>

      <b-card-body>
        <p>A. Prepare
          <b-button v-b-toggle.collapse_block_header size="sm">
            <b-icon-chevron-compact-down /> BLOCK HEADER
          </b-button>
        </p>
        <p> 1. Pick a random NONCE (number used only once) between 0 - 4,294,967,295 </p>
        <p> 2. Calculate HASH: sha256d ( BLOCK HEADER + NONCE ) </p>

        3. If HASH is less than TARGET then you win reward + fees
        (<em style="color: orange; font-weight: bolder">6.25₿</em>)!
        <br/>
        &nbsp;&nbsp;&nbsp;If not - go back to step 1 try again!
      </b-card-body>
    </b-card>
  </b-collapse>
</template>
