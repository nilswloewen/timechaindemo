<template>
  <b-collapse id="collapse_welcome" visible>
    <b-card no-body>
      <b-card-header class="text-center">
        Visualizing Bitcoin Mining
      </b-card-header>

      <b-card-body>
        This site was created to answer the question <b>"How does Bitcoin mining actually work?"</b>. The intended audience is those who understand how a blockchain works. I cannot give a full explanation of all terms used here, but links for further reading will be provided.
      </b-card-body>

      <b-card-footer v-b-toggle="['collapse_welcome', 'collapse_algorithm']" class="text-center">
      Begin
      </b-card-footer>
    </b-card>
  </b-collapse>
</template>

<style>
#hash_table {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
#hash_table td {
  width: 60px;
}
</style>