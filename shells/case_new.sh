#!/bin/bash

if [ $# -eq 0 ]; then
	echo "Enter the Contry name~!!"
else
	case "$1" in
		ko) echo "Seoul" ;;
		us) echo "Washington" ;;
		cn) echo "Beging" ;;
		jp) echo "Tokyo" ;;
		*) echo "Enter the contry name~!!"
esac
fi
