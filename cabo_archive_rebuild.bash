#!/bin/bash

<<PROGRAM_TEXT

This script will rebuild an archive of /var/www/cabo resources
 if any of the resources have been changed or added.

The archive is extracted on a new instance with:

tar -xvzf /mnt/efs/aws-lam1-ubuntu/cabo.tgz --directory /var/www

The following will list files changed since the archive was last rebuilt:

if [ $(find /var/www/cabo -newer /mnt/efs/aws-lam1-ubuntu/cabo.tgz -print \
 | sed 's|^/var/www/cabo/||' | grep -v '.git/' | grep -v '.git$' | wc -l) \
 -gt 0 ]
then
  find /var/www/cabo -newer /mnt/efs/aws-lam1-ubuntu/cabo.tgz \
  | grep -v '.git/' | grep -v '.git$' \
  | xargs ls -ld --time-style=long-iso  | sed 's|/var/www/cabo/||' 
fi

PROGRAM_TEXT

if [ $(find /var/www/cabo -newer /mnt/efs/aws-lam1-ubuntu/cabo.tgz -print \
| sed 's|^/var/www/cabo/||' | grep -v '.git/' \
| grep -v '.git$' | wc -l) -gt 0 ]; then

  echo Recreating the aws-lam1-ubuntu/cabo.tgz archive

  rm -f /mnt/efs/aws-lam1-ubuntu/cabo.t{gz,xt}

  tar -cvzf /mnt/efs/aws-lam1-ubuntu/cabo.tgz \
  --exclude='cabo/.git' \
  --exclude='cabo/html/RCS' \
  --directory /var/www cabo 2>&1 \
  | tee /mnt/efs/aws-lam1-ubuntu/cabo.txt

fi
