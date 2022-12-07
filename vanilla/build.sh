#!/bin/bash

(
	cd src;
	head -n4 index.html;
	echo -n "		<script type=\"module\">"
	jspacker -i /src.js -n | terser -m --module --compress pure_getters,passes=3 --ecma 6 | tr -d '\n';
	echo "</script>";
	echo -n "		<style type=\"text/css\">";
	uglifycss style.css | tr -d '\n';
	echo "</style>";
	tail -n3 index.html;
) > index.html
