<?php
if($_POST){
$path = $_POST["path"] . "/{*,.[!.]*,..?*}";

$filenames = glob($path , GLOB_BRACE);

$folder = array();
$file = array();

foreach ($filenames as $filename) {
    if(is_dir($filename)){
     array_push($folder, $filename);
    }
    else{
    array_push($file, $filename);
    }
}
echo '
   {
   "folder": '. json_encode($folder). ',
   "file": '. json_encode($file) .'
   }';
}
else{
echo '404 Not Found!';


}
?>



