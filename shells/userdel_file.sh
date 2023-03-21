#!/bin/bash

input="user.dat"

while IFS=',' read -r username uid gid comment
do
i	userdel -r "$username"
	echo "Delete $usernamae"
done < $input
