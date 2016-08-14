---
layout: post
title:  "Serving Jekyll Locally and Via Github Pages"
date:   2016-08-14 14:05:13 -0500
categories: jekyll tips 
tags: jekyll development
tldr: Use site.github.url to build URLs and a second config file to serve site locally.
---
This site is built using [Jekyll](https://jekyllrb.com/). In tinkering with Jekyll, I was seeking a way to serve the site locally while also leveraging the convenience of [GitHub Pages](https://pages.github.com/).

The [Jekyll docs](https://jekyllrb.com/docs/github-pages/#project-page-url-structure) suggest prepending URLs with `site.github.url`, which leverages the `site.github` metadata exposed by the [jekyll-github-metata gem](https://github.com/jekyll/github-metadata/blob/master/). This is great for URLs in the GitHub Pages environment, but for local development, any URL generated as such will link to a GitHub Pages asset. 

Ideally, one could override the `site.github.url` in one's local environment and set the value to `http://localhost:4000` (or whichever URL one uses to serve Jekyll locally). The Jekyll docs seem to imply that this happens, but as of the gem versions I was
using (`jekyll-github-metadata (= 2.0.2)`, `jekyll (= 3.1.6)`), that value was set to the GitHub Pages value in development.

Turning to Google, I found the following [Jekyll Style Guide](http://ben.balter.com/jekyll-style-guide/config/#url) by Ben Balter. The guide makes the following suggestion:

<blockquote>
Prefer site.github.url when using GitHub Pages. To ensure your site renders properly locally, add the following to your site’s config (which will be overridden by GitHub Pages):

{% highlight yml %}
github:
  url: http://localhost:4000
{% endhighlight %}
</blockquote>

However, when I attempted to make the suggested change in my `_config.yml`, the value was not replaced by GitHub Pages and all URLs in that environment referenced my localhost. It's likely that I'm missing something and that this method works, but I gave decided to try another technique.

Using the `-c` or `--config` flag, One can specify multiple config files when runnign the `jekyll` binary. Jekyll loads the files in reverse order of precedence. So, one can set values in their `_config.yml`, then override them in another file: 

`bundle exec jekyll serve --config "_config.yml,config.development.yml"`

My `config.development.yml` is identical Balter's suggested config change referenced above. 

{% highlight yml %}
github:
  url: http://localhost:4000
{% endhighlight %}

I didn't want to type that anytime I wanted to serve Jekyll locally, so I decided that I'd use [foreman](https://github.com/ddollar/foreman) to launch my server.

Now I'm able to view my development changes locally at `http://localhost:4000` while leveraging the convenience of automatic deployments to GitHub Pages whenever I push my branch. There are likely other ways to skin this cat, but this one works.
