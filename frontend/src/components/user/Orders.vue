<template>
  <div class="orders">
    <h5><b>Moje objednávky</b></h5>
    <hr>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Číslo objednávky</th>
        <th scope="col">Datum objednávky</th>
        <th scope="col">Hodnota</th>
        <th scope="col">Stav</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>12002</td>
        <td>1.12.2020</td>
        <td>499Kč</td>
        <td>Zaplaceno</td>
      </tr>
      <tr>
        <td>12003</td>
        <td>1.12.2020</td>
        <td>499Kč</td>
        <td>Zaplaceno</td>
      </tr>
      <tr>
        <td>12004</td>
        <td>1.12.2020</td>
        <td>499Kč</td>
        <td>Zaplaceno</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "orders"
}
</script>

<style scoped>
  .table thead th {
    border-bottom: 1px solid #dee2e6;
  }
  .table th, .table td {
    border-top: none;
    font-weight: 400;
  }
  .orders {
    margin-top: 10px;
  }
  @media (max-width: 438px) {
    .table {
      display: block;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>