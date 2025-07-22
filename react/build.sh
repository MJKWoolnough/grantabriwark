#!/bin/bash

(
	head -n5 src/public/index.html;
	echo -n "		<script type=\"module\">";
	terser -m --module --compress pure_getters,passes=3 --ecma 6 src/build/static/js/main*.js | tr -d '\n';
	echo "</script>";
	echo -n "		<style type=\"text/css\">";
	cat src/build/static/css/main*.css;
	echo "</style>";
	tail -n6 src/public/index.html;
) > index.html;
zopfli -m index.html;
