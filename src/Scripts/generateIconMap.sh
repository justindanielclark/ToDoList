#!/bin/bash
files=`ls ./src/Assets/SVGs/*.svg`
for eachfile in $files
do
  file=${eachfile:18}
  name=${file::-4}
  string="import $name from '$eachfile'"
  echo $string >> IconMap.js
done

echo "return {" >> IconMap.js

for eachfile in $files
do
  file=${eachfile:18}
  name=${file::-4}
  string="$name,"
  echo $string >> IconMap.js
done

echo "}" >> IconMap.js