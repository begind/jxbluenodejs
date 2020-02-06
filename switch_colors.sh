#!/usr/bin/env bash
# this file changes the color of the website 

# Step 1:
cp ./src/app/app.component.html ./app.component.html.tmp
# Step 2:  
cp -f app.component.html ./src/app/app.component.html
# Step 3:
mv -f app.component.html.tmp app.component.html
