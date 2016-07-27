---
title: Assignment Tips
---

# Assignment Tips

## List of Common Data Structures

Java and LensKit provide a number of data structures and utilities that you will likely find useful.  They include:

- [Map][] and its implementation [HashMap][]
- [List][] and its implementation [ArrayList][]
- [Collections][] provides useful things like `sort`
- [Vectors][] provides useful LensKit math utilities
- [fastutil][] provides the efficient primitive data structures we use in `Vectors` and many other places in LensKit.

[Map]: http://docs.oracle.com/javase/8/docs/api/java/util/Map.html
[HashMap]: http://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html
[List]: http://docs.oracle.com/javase/8/docs/api/java/util/List.html
[ArrayList]: http://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html
[Collections]: http://docs.oracle.com/javase/8/docs/api/java/util/Collections.html
[Vectors]: http://mooc.lenskit.org/apidocs/org/lenskit/util/math/Vectors.html
[fastutil]: http://fastutil.di.unimi.it/docs/

## Fastutil

Java provides standard implementations of common collection types, such as maps and lists.  However, due to historical compatibility considerations in the design of the Java language, these are not very efficient when storing lists or maps of numbers (e.g. longs, ints, and doubles).  The [Fastutil][] library provides collection types that are optimized for numbers and other primitives.  There is a separate type (and set of implementations) for each combination of content types, following a consistent naming pattern:

- `Long2DoubleMap` is an optimized refinement of `Map<Long,Double>`.  Use the `Long2DoubleOpenHashMap` implementation instead of Java's `HashMap`.  LensKit also provides a memory-efficient read-only implementation accessible via `LongUtils.frozenMap`.
- `LongList` is an optimized refinement of `List<Long>`.  Use `LongArrayList` instead of `ArrayList`.

Interfaces and classes exist for all primitive types, such as `Long2IntMap` and `ByteList`.

Using Fastutil types saves quite a bit of memory, and it can also save significant computation time (although recent versions of Java decrease the time penalty for not using Fastutil).

## Debug Logging

The assignments are all configured to output `DEBUG`-level log messages to log files under the `build` directory when you run them via Gradle.

You can emit additional log messages using [SLF4J](http://www.slf4j.org/) `Logger` objects.  We have provided them on most classes you need to modify; if one is missing, you can add it at the top of the class:

~~~java
private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
~~~
