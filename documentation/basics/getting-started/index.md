---
title: Getting Started
---

# Getting Started with LensKit

This page describes how to embed LensKit in an application.

[lenskit-hello]: http://github.com/lenskit/lenskit-hello

The [lenskit-hello][] project provides a working example of configuring, building, and using a recommender.  This document is based on that code.

## Getting LensKit

We recommend getting LensKit from the Maven central repositories.   To use it from a Gradle project,
add the following to your `build.gradle`:

~~~groovy
repositories {
    mavenCentral()
}
dependencies {
    compile 'org.grouplens.lenskit:lenskit-all:3.0-T1'
}
~~~

Or in Maven:

~~~xml
<dependency>
  <groupId>org.grouplens.lenskit</groupId>
  <artifactId>lenskit-all</artifactId>
  <version>{{site.data.lenskit.version}}</version>
</dependency>
~~~

`lenskit-all` will pull in all of LensKit except the command line interface.  You can instead depend on the particular pieces of LensKit that you need, if you want.  But `lenskit-all` is a good way to get started.

You can also retrieve LensKit from Maven using Gradle, SBT, Ivy, or any other Maven-compatible dependency resolver.  If you don't want to let your build system manage your dependencies, download the [binary distribution](http://lenskit.org/download.html) and put the JARs in your project's library directory.

## Configuring the Recommender

[LenskitConfiguration]: http://lenskit.org/apidocs/org/grouplens/lenskit/core/LenskitConfiguration.html

In order to use LensKit, you first need to configure the LensKit algorithm you want to use.  This consists primarily of selecting the component implementations you want and configuring them with a [LenskitConfiguration][].  For example, to configure a basic item-item kNN recommender with baseline, use the following configuration (save it in a file, such as `item-item.groovy`)

~~~groovy
// Use item-item CF to score items
bind ItemScorer to ItemItemScorer
// let's use personalized mean rating as the baseline/fallback predictor.
// 2-step process:
// First, use the user mean rating as the baseline scorer
bind (BaselineScorer, ItemScorer) to UserMeanItemScorer
// Second, use the item mean rating as the base for user means
bind (UserMeanBaseline, ItemScorer) to ItemMeanRatingItemScorer
// and normalize ratings by baseline prior to computing similarities
bind (UserVectorNormalizer) to BaselineSubtractingUserVectorNormalizer
~~~

You can then load that configuration in your Java program:

~~~java
LenskitConfiguration config = ConfigHelpers.load(new File("item-item.groovy"))
~~~

## Connecting the Data Source

LensKit also requires a data source.  We can add use one of the files from [MovieLens Latest](http://grouplens.org/datasets/movielens/):

~~~groovy
bind EventDAO to TextEventDAO.create(new File("ratings.csv"), Formats.movieLensLatest());
~~~

## Creating the Recommender

You then need to create a recommender to actually be able to recommend:

~~~java
LenskitRecommender rec = LenskitRecommender.build(config);
~~~

When you're finished with a `LenskitRecommender`, close it with `rec.close()`.

## Generating Recommendations

The recommender object provides access to components like `ItemRecommender` that can do the actual recommendation.  For example, to generate 10 recommendations for user 42:

~~~java
ItemRecommender irec = rec.getItemRecommender();
List<ScoredId> recommendations = irec.recommend(42, 10);
~~~

Since we did not configure an `ItemRecommender` when configuring LensKit, it uses the default: the `TopNItemRecommender`, which scores items using the configured `ItemScorer` and returns the *N* highest-scored items.  Since we are using item-item CF, these scores are the raw predicted ratings from item-item collaborative filtering.

You can also also predict ratings with the `RatingPredictor`:

~~~java
RatingPredictor pred = rec.getRatingPredictor();
double score = pred.predict(42, 17);
~~~

## More Reading

- [Configuring LensKit](../configuration/)
- [How LensKit recommenders are structured](../structure/)
- [Connecting to data sources](../data-access/)
- [How to run an algorithm experiment](../../evaluator/quickstart/)
