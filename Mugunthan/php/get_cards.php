<?php
$data_file = '../data/cards.csv';
$result=[];
if(file_exists($data_file)){
    if(($f=fopen($data_file,'r'))!==false){
        while(($r=fgetcsv($f))!==false){
            $result[]=['filename'=>$r[0],'title'=>$r[1],'description'=>$r[2]];
        }
        fclose($f);
    }
}
header('Content-Type: application/json');
echo json_encode($result);
?>
