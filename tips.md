---
title: Assignment Tips
layout: default
---

# Assignment Tips

## List of Common Data Structures

Java and LensKit provide a number of data structures and utilities that you will likely find useful.  They include:

- [Map][] and its implementation [HashMap][]
- [List][] and its implementation [ArrayList][]
- [Collections][] provides useful things like `sort`
- [Vectors][] provides useful LensKit math utilities
- [fastutil][] provides the efficient primitive data structures we use in Vectors

[Map]: http://docs.oracle.com/javase/8/docs/api/java/util/Map.html
[HashMap]: http://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html
[List]: http://docs.oracle.com/javase/8/docs/api/java/util/List.html
[ArrayList]: http://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html
[Collections]: http://docs.oracle.com/javase/8/docs/api/java/util/Collections.html
[Vectors]: http://mooc.lenskit.org/apidocs/org/lenskit/util/math/Vectors.html
[fastutil]: http://fastutil.di.unimi.it/docs/

## Debug Logging

If you want better logging from your program, you can turn on *debug logging*.  To do this, modify the `build.gradle` file, specifically the `run` task that you would like to debug.

To dump debug logs to the screen, add the following:

    args '--log-level', 'DEBUG'

To write to a log file, add the following:

    args '--log-file', "$buildDir/run.log", '--log-file-level', 'DEBUG'
