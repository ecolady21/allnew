#!/bin/bash

input="user.dat"

while IFS=',' read -r username uid gid comment
do
	echo "Adding $usernamae"
	useradd -u "$uid" -g "$gid" -c "$comment" -m "$username"
done < $input
