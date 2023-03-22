#!/bin/bash
#
set -- $(getopt -q ab:c:de "$@")
#
echo
while [ -n "$1" ]
do
	case "$1" in
	-u) echo "Found the -a option" ;;
	-g) param="$2"
	-c) param="$2"
	-d) shift
	-s)
	-k)
	-m)

	*) echo "$1 is not an option" ;;
	esac
	shift
done
#
count=1
for param in "$@"
do
	echo "Parameter #$count: $param"
	count=$[ $count + 1]
done
#
