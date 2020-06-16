# Cabo San Lucas, Baja California Sur, Mexico.

[cabo.lam1.us](http://cabo.lam1.us/)
[cabo.lamurakami.com](http://cabo.lamurakami.com/)

This repo contains content in the html folder and an apache2 configuration
that can be implemented with:

 sudo ln -s /var/www/cabo/cabo_apache2.conf \
 /etc/apache2/sites-available/040_cabo.conf

 sudo a2ensite 040_cabo
 sudo systemctl reload apache2

If the repo contents are installed in a location other than /var/www
the path in the configuration and in the instuctions would have to be modified.

The cabo_archive_rebuild.bash script will Rebuild an archive of /var/www/cabo
resources when they change.  It is intended to be run daily with:

 ln -s /var/www/cabo/cabo_archive_rebuild.bash /mnt/efs/aws-lam1-ubuntu/cabo

This would then be picked up by the Daily cron job to backup
/mnt/efs/aws-lam1-ubuntu archives.

 $ cat /etc/cron.daily/Bk-20-aws-changes
 #!/bin/bash
 run-parts --report /mnt/efs/aws-lam1-ubuntu
 [19:34:30 Sunday 06/14/2020] ubuntu@aws
