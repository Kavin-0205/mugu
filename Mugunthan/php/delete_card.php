<?php
$uploads_dir = '../uploads/';
$data_file = '../data/cards.csv';
$filename = $_POST['filename'] ?? '';
if(!$filename) exit;
$rows=[];
if(file_exists($data_file)){
    if(($f=fopen($data_file,'r'))!==false){
        while(($r=fgetcsv($f))!==false) $rows[]=$r;
        fclose($f);
    }
}
$newRows=array_filter($rows,function($r) use($filename){return $r[0]!=$filename;});
$f=fopen($data_file,'w');foreach($newRows as $r){fputcsv($f,$r);}fclose($f);
if(file_exists($uploads_dir.$filename)) unlink($uploads_dir.$filename);
?>
