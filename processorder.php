<html>
<head>
  <title>Bob's Auto Parts - Order Results</title>
</head>
<body>
<h1>Bob's Auto Parts</h1>
<h2>Order Results</h2>
<?php
  $tireqty = $_POST['tireqty'];
  $oilqty = $_POST['oilqty'];
  $sparkqty = $_POST['sparkqty'];

  echo '<p>Order processed at ';
  echo date('H:i, jS F');
  echo '</p>';
  echo '<p>Your order is as follows: </p>';
  echo $tireqty.' tires<br />';
  echo $oilqty.' bottles of oil<br />';
  echo $sparkqty.' spark plugs<br />';

  $totalqty = 0;
  $totalamount = 0.00;
  $totalqty = 0;
  $totalqty = $tireqty + $oilqty + $sparkqty;
  echo 'Items ordered: '.$totalqty.'<br />';

  $totalamount = 0.00;

  define('TIREPRICE', 100);
  define('OILPRICE', 10);
  define('SPARKPRICE', 4);

  $totalamount = $tireqty * TIREPRICE
               + $oilqty * OILPRICE
               + $sparkqty * SPARKPRICE;

  echo 'Subtotal: $'.number_format($totalamount,2).'<br />';

  $taxrate = 0.10;  // local sales tax is 10%
  $totalamount = $totalamount * (1 + $taxrate);
  echo 'Total including tax: $'.number_format($totalamount,2).'<br />';
?>
<table border="0" cellpadding="3">
    <tr>
        <td bgcolor="#CCCCCC" align="center">Distance</td>
        <td bgcolor="#CCCCCC" align="center">Cost</td>
    </tr>
    <?php
    $distance = 50;
    while ($distance <= 250 )
    {
        echo "<tr>\n  <td align = 'right'>$distance</td>\n";
        echo "  <td align = 'right'>". $distance / 10 ."</td>\n</tr>\n";
        $distance += 50;
    }
    ?>
</table>
</body>
</html>

