---
title: Setting Up Your Environment
---

# Setting Up Your Environment

In order to work with LensKit and complete the assignments, you need a few things:

- A [Java Development Kit](http://java.oracle.com)
- A Java development environment; we recommend [IntelliJ IDEA](https://www.jetbrains.com/idea/), and the free Community Edition is sufficient to do most things with LensKit.
- For the later assignments: some means of analyzing data (in CSV format) and producing charts.  Excel or LibreOffice Calc will suffice; R and Python are options as well.  We provide examples in R.

## Windows Setup

On Windows, the installers for Java and IntelliJ are mostly adequate.  The full procedure is the following:

1.  Install the JDK using the latest installer from <http://java.oracle.com>.  You need to download a JDK installer for J2SE; a JRE installer is not sufficient.

2.  Create an environment variable so other programs can find Java.  To do this, go to the Start menu and search for ‘environment’; one of the options is ‘Set up environment variables for your account’.  Choose this, then Add a new environment variable.  The variable's name will be `JAVA_HOME`, and its value will be the path to your JDK installation. This is typically something like `C:\Program Files\Java\jdk1.8.0_60`.  You will need to update the value of this variable every time you update your Java installation.

3.  Create a `HOME` environment variable.  This should point to your user's base directory, e.g. `C:\Users\michael`.  You can just set this to the value `%USERPROFILE%` and it will automatically pick it up from the Windows equivalent to `HOME`.  Having an explicit `HOME` variable makes some software happier.

4.  Install IntelliJ IDEA using its [Windows installer](https://www.jetbrains.com/idea/download/).

Then you should be ready to go!

## Mac OS X Setup

Mac setup is pretty much the same, with the added wrinkle of installing a separate Java for IntelliJ to use.

1.  Install the JDK using the latest installer from <http://java.oracle.com>.  You need to download a JDK installer for J2SE; a JRE installer is not sufficient.  This is the Java that you will use to run LensKit.

2.  [Download IntelliJ IDEA](https://www.jetbrains.com/idea/download/) and drag the application to your Applications folder.

3.  Set up your Java environment in IntelliJ:

    1.  Launch IntelliJ
    2.  In the startup screen, pick 'Configure' -> 'Project Defaults' -> 'Project Structure'
    3.  Select 'SDKs'
    4.  Click '+', then 'JDK'
    5.  Browse to your Java 8 (under `/Library/Java/JavaVirtualMachines`), and choose the `Contents/Home` directory under the JDK version you will be using.

## Linux Setup

We recommend installing the Java Development Kit from your distribution repositories.  Install version 8 if it is available; otherwise, version 7 is enough to run LensKit.

1.  Install the packages.

    -   On Ubuntu:

        ~~~
        sudo apt-get install openjdk-8-jdk
        ~~~

        Substitute `openjdk-7-jdk` if you don't have version 8 available.

    -   On Fedora/RHEL:

        ~~~
        sudo yum install java-1.8.0-openjdk-devel
        ~~~

2.  Download and run the [IntelliJ IDEA installer](https://www.jetbrains.com/idea/download/).

## Testing the Environment

To make sure that your environment is ready to use, try to load the LensKit Hello project.

1.  Download the ZIP archive from <https://github.com/lenskit/lenskit-hello>.
2.  Unpack it somewhere on your hard drive.
3.  In IntelliJ, select 'Import project' or 'Open project'.
4.  Browse to your `lenskit-hello` directory and select the `build.gradle` file.
5.  Accept the default settings.  If it does not indicate an available JDK, then you will need to add one; click the add button and browse to your JDK installation directory.
6.  If everything is working, the project should import successfully.

Congrats! You now have your LensKit development environment set up.
