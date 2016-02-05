---
title: Assignment Tips
layout: default
---

# Assignment Tips

## Debug Logging

If you want better logging from your program, you can turn on *debug logging*.  To do this, modify the `build.gradle` file, specifically the `run` task that you would like to debug.

To dump debug logs to the screen, add the following:

    args '--log-level', 'DEBUG'

To write to a log file, add the following:

    args '--log-file', "$buildDir/run.log", '--log-file-level', 'DEBUG'
