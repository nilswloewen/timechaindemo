<template>
  <b-collapse id="collapse_welcome">
    <b-card no-body>
      <b-card-header class="text-center">
        Visualizing Bitcoin Mining
      </b-card-header>

      <b-card-body>
        This site was created to answer the question <b>"What do Bitcoin miners actually do?"</b>. The intended audience is those who understand how a blockchain works. I cannot give a full explanation of all terms used here, but links for further reading will be provided.
      </b-card-body>

      <b-card-footer v-b-toggle="['collapse_welcome', 'collapse_algorithm']" class="text-center">
      Begin
      </b-card-footer>
    </b-card>
  </b-collapse>
</template>
