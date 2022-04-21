<template>
<b-card id="table_of_contents" class="mt-4">
  <h4>Table of Contents</h4>
  <hr class="mt-0">

  <b-table-simple borderless small>
    <b-tbody>
      <b-tr><b-td><a href="/intro"> Intro </a></b-td></b-tr>
      <b-tr><b-td><a href="/terms"> Terms </a></b-td></b-tr>
      <b-tr><b-td><a href="/blockchain"> Blockchain </a></b-td></b-tr>
      <b-tr><b-td><a href="/pow"> Proof-of-Work</a></b-td></b-tr>
      <b-tr><b-td><a href="/timechain"> Timechain </a></b-td></b-tr>
      <b-tr><b-td><a href="/real_mining"> Real Mining </a></b-td></b-tr>
      <b-tr><b-td><a href="/resources"> Resources</a></b-td></b-tr>
    </b-tbody>
  </b-table-simple>
</b-card>
</template>

<style>
.table {
  margin-bottom: 0;
  color: white;
}

#table_of_contents {
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
}

#table_of_contents a {
  padding-left: 1rem;
  text-decoration: none;
}

#table_of_contents tr {
  cursor: pointer;
}
</style>
