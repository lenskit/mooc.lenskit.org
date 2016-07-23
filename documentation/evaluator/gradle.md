---
title: Using the Gradle Plugin
---

# Using the Gradle Plugin

The Gradle plugin for controlling LensKit evaluation has a number of features.  This page describes
its general setup, configuration, and common concepts; later pages will describe individual tasks
in more detail.

Before reading this page, we recommend reading [Getting Started](../quickstart/) for a high-level
overview of the evaluation process and organization.

## Loading the Plugin

To load the plugin, put the following at the top of a `build.gradle` file:

~~~groovy
buildscript {
    repositories {
        maven {
            url 'https://oss.sonatype.org/content/repositories/snapshots/'
        }
        mavenCentral()
    }
    dependencies {
        classpath 'org.grouplens.lenskit:lenskit-gradle:3.0-T2'
    }
}

apply plugin: 'java'
apply plugin: 'lenskit'
~~~

This loads the plugin into Gradle.  However, we must also load LensKit into the project that
Gradle is building and running (namely, our experiment):

~~~groovy
repositories {
    maven {
        url 'https://oss.sonatype.org/content/repositories/snapshots/'
    }
    mavenCentral()
}

dependencies {
    compile "org.grouplens.lenskit:lenskit-all:3.0-T2"
    runtime "org.grouplens.lenskit:lenskit-cli:3.0-T2"
}
~~~

With those pieces in place, the plugin will run and work with the Java code that you have.

## General Configuration {#config}

The Gradle plugin controls LensKit by spawning LensKit [command line programs][cli].  Each
of these is run in a separate JVM process.

[cli]: http://lenskit.org/documentation/cli/

There are common configuration options that control aspects of this behavior, such as memory limits
and logging behavior.  These include:

`classpath`
:   The classpath to use for running LensKit tasks.  This defaults to the `main` source set's
    runtime class path, including the `runtime` dependencies and all classes defined in the
    experiment's main sources (`src/main/java` and friends).

`logLevel`
:   The log level for the console.  Defaults to `INFO`.

`logFileLevel`
:   The log level for the log file. Defaults to `logLevel`.

`logFile`
:   A file to receive logging output.

`threadCount`
:   The maximum number of threads to use in the LensKit task.  Only affects certain tasks.  Defaults
    to all available processors.

`maxMemory`
:   The maximum heap size for LensKit tasks, e.g. `8g`.

All LensKit tasks take these parameters.  In addition, defaults for each of them (except `logFile`)
can be configured in a `lenskit` block in `build.gradle`:

~~~groovy
lenskit {
    logFileLevel 'DEBUG'
    threadCount 8
}
~~~

See [LenskitExtension][] for more details on these options.

[LenskitExtension]: /gradle-docs/org/lenskit/gradle/LenskitExtension.html

## Underlying Details

For sophisticated tasks, such as running a train-test evaluation, the plugin creates a JSON file
containing a *spec* and then tells the LensKit process to configure itself from that spec.  The
Gradle tasks automatically pass methods through to configure properties on the corresponding spec.

We provide documentation and examples for many configuration options in these pages.  For exact
details on the full set of options supported, consult the [Gradle plugin API docs](/gradle-docs/).
The `Spec` classes define the specifications that get passed to the individual LensKit programs,
and individual Gradle tasks such as `TrainTest` provide helper methods to make it more convenient
to configure the evaluation.

## Next Chapter

-   [Preparing Data](../data/)