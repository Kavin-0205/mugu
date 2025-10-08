<?php
$uploads_dir = '../uploads/';
$data_file = '../data/cards.csv';

if(!is_dir($uploads_dir)) mkdir($uploads_dir,0777,true);
if(!is_dir(dirname($data_file))) mkdir(dirname($data_file),0777,true);

if($_FILES['image'] && $_POST['title']){
    $tmp_name = $_FILES['image']['tmp_name'];
    $name = uniqid()."_".$_FILES['image']['name'];
    move_uploaded_file($tmp_name,$uploads_dir.$name);
    $title = str_replace(["\n","\r",","]," ",$_POST['title']);
    $line = [$name,$title,""];
    $f = fopen($data_file,'a');
    fputcsv($f,$line);
    fclose($f);
}
?>
