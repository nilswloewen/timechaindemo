<template>
  <b-collapse id="collapse_hash">
    <b-card no-body>
      <b-card-header v-b-toggle.collapse_hash>
        <b-icon-chevron-compact-up />
        Hash Function
      </b-card-header>

      <b-card-body>
        <b-card>
          <h4><a href="https://www.etymonline.com/word/hash">hash (v.)</a></h4>
          1650s, "to hack, chop into small pieces," from French hacher "chop up" (14c.), from Old French hache "ax" (see hatchet).
        </b-card>

        <p>
          In computer science, a hash is a function that yields a short, unique output for every unique input of arbitrary length. The input data is scrambled and mixed around, 'hashed' if you will, to derive the output.
        </p>

        <p>
          Bitcoin mining uses a particular hash function called SHA-256, which means the <a href="https://en.wikipedia.org/wiki/Secure_Hash_Algorithms">"Secure Hash Algorithm"</a> with an output length of 256 bits. The output is usually encoded with hexadecimal notation of 64 characters. When mining, the block header + nonce is hashed and then the output is hashed again, which is what the 'd' (double) means in <b>sha256d</b>.
        </p>

        <p>
          Bitcoin is known as a 'cryptocurrency' mainly because it uses public key encryption to generate addresses and to sign transactions. In addition, the hash functions that link the blockchain are also related to cryptography. a hash can be used to validate that information has not been altered in transit even though it may not be encrypted.
        </p>

        In mining the hash is used in two ways:
        <ol>
          <li>To uniquely identify each block - the successful hash of the block header becomes the block ID. This is embedded in the next block header as the previous block hash.</li>
          <li>As a random number generator - hash is not actually random, but it looks random to a human. </li>
        </ol>

        For example, the first four characters of the sha256d hash of these characters look random.

        <table id="hash_table" >
          <tr><th>Input</th> <td></td> <th>Output</th></tr>
          <tr><td>'0'</td> <td>=></td> <td>c73c</td></tr>
          <tr><td>'1'</td> <td>=></td> <td>92c5</td></tr>
          <tr><td>'2'</td> <td>=></td> <td>a877</td></tr>
        </table>

        <p>
          Because a hash cannot be known without putting in the work,
        </p>

        <p>
          Difficulty
        </p>


      </b-card-body>
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