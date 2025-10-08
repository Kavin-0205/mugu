<?php
$data_file = '../data/cards.csv';
if(!file_exists($data_file)) exit;
$filename = $_POST['filename'] ?? '';
$desc = str_replace(["\n","\r"],' ',$_POST['description'] ?? '');
$rows = [];
if(($f=fopen($data_file,'r'))!==false){
    while(($r=fgetcsv($f))!==false){$rows[]=$r;}
    fclose($f);
}
foreach($rows as &$r){if($r[0]==$filename){$r[2]=$desc;}}
$f=fopen($data_file,'w');foreach($rows as $r){fputcsv($f,$r);}fclose($f);
?>
