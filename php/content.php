<?php

  if($_POST){
      $file = fopen($_POST["path"], 'w');
      fwrite($file, $_POST["data"]);
      fclose($file);
      echo "success";
  }
  else{
    if($_GET["path"]){
      if($_GET["path"][0] == "~"){
        $text =  shell_exec('cat ~/"' . substr($_GET["path"], 2) . '"');
      }
      else $text =  shell_exec('cat "' . $_GET["path"] . '"');
      if(!$text) $text = "404 File Not Found!";
      echo "" . $text . "";
    }
    else echo "401";
  }

?>