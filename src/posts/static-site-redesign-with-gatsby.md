---
title: Redesigning a static website with Gatsby.js
slug: static-site-redesign-with-gatsby
date: 2021-02-08
categories: gatsby, programming, seo, static sites, aws s3, cloudfront
summary: !
  An overview of my most recent site redesign. Without abandoning the best parts
  of building and managing a statically-generated website, I'll show you how
  using modern web technologies like Gatsby.js, React, GitHub actions, and AWS
  S3 has made this process even easier.
---

I seem to have a thing for writing about my own website.  For example, my last
post was about [updating a static website hosted on AWS S3 to serve its content
over HTTPS](/migrating-my-aws-s3-website-to-https). Years ago, I wrote about
[building a custom blogging engine](/blog/hello-again).

Back then, I predicted a likely cause of my infrequent blogging:

> All that is to say: if you want to make it harder to contribute to your own
> blog, do it with a blog engine you built yourself and that you can only run
> from a computer on which you have the code checked out and access to Node.js
> and the right AWS keys.

As it turned out, that's what happened for the last couple of years. But I think
I fixed it this time!

In this post, I'll share my redesign process. I'll also explain a few of the
tools and technologies used along the way.

You can read the code for everything I'll share here at
[GitHub.com/TheDahv/dahvsite](https://github.com/TheDahv/dahvsite). The old code
is still tucked away in [a
branch](https://github.com/TheDahv/dahvsite/tree/old-gulp-site) if you want to
see how it looked before.

## Choosing a blogging engine

I wanted to get out of the business of using home-grown software to manage my
web site.  Of course, there is nothing wrong with using your own software. As I
get older and demands on my time become more intense and diverse, I'm more
attracted to using published software that just works.

This redesign preserved my commitment to static site generators. They make fast
websites and they are cheap. My site costs _pennies_ to run per month; I often
don't incur AWS charges if traffic stays below Cloudfront thresholds.

Static site generators have been around for years and I've used a few, starting with
[Jekyll](https://jekyllrb.com/) early on in my career. I've also made a few
sites with [Hugo](https://gohugo.io/), and I love its commitment to fast builds.
However, this time I was also interested in learning something new.

I learned about [headless CMS platforms](https://jamstack.org/headless-cms/) in
last year. The concept of decoupling content from presentation was intriguing to
me. I've also made a career of building web applications in JavaScript, so I'm
also interested in using modern web development tools to enhance the delivery and
consumption of web content.

I don't spend too much time managing other sites or working with CMS platforms,
but I do like to stay current when advising or helping friends or non-profits.
So I thought it might be time to learn [Gatsby](https://www.gatsbyjs.com/), a
front-end framework for building websites following the "jamstack" pattern. It
focuses on fast builds and a robust plugin ecosystem. It also promises great
in-browser performance, blending the best of static pages with progressively
enhanced experiences enabled by JavaScript.

Gatsby seems to have a great community and brings much of what I've learned from
building web apps to content management, so I decided to give Gatsby a try on my
personal website.

## JSX for templating

Another attractive aspect of using Gatsby is using JSX. I've learned a variety
of HTML templating languages over the years &mdash; ERB, EJS, Go templating, to
name a few.

I use JavaScript daily to work with the web and React's abstractions are pretty
thin. I feel comfortable expressing myself with JSX and refactoring presentation
concerns into components means I spend far less time thinking about how template
inclusions work.

This also gave me a chance to explore how [CSS
modules](https://www.gatsbyjs.com/docs/how-to/styling/css-modules/) work. The
JavaScript community is often criticized for the frequency at which it evolves
and changes stances on patterns. Handling CSS is one of them. In the time I've
learned React, I've used SCSS, JSS or CSS-in-Javascript, and now styled
components. I personally am in favor of solutions that minimize the abstraction
from actual CSS.

In this case, I enjoyed getting to write actual CSS while neatly providing a
scoping solution and avoiding leaky rules applying unintentionally. 

## Redesigning is simplifying

Once I had the technology in mind, I thought it would also be a good time for a
new look and feel for the site. Unfortunately, this isn't an area of strength
for me so I wanted to keep it simple.

There are a few things I know I like: simplicity, minimalism, typography, and a
focus on the content.

Gatsby introduced me to
[typography.js](https://kyleamathews.github.io/typography.js/), a project that
lets you compose the relationships among type faces and the weights and rhythm
that make up the page. I used to look up formulas for calculating those
relationships and coding them by hand into my site's styles. This was a great
find and did a majority of the work.

Beyond that, the design needs for my site are pretty simple. I need an easy way
to find content and an inviting "welcome mat" for home page visitors.

This time around, I learned that investing in good photography makes such a big
difference. I looked at [Unsplash](https://unsplash.com/) for something
inspiring &mdash; something that would present an inviting, natural, and
unassuming tone. I also love nature and the mountains near where I live, so I
thought would be a natural start to build a visual identity.

Since hiking is such an accessible thing in the Pacific Northwest, I got lucky
flipping through old hiking photos I've taken and was able to find perfect
landscapes and nature shots to use. And finally, I asked our family photographer
for some new photos to use for professional networks and that fit perfectly on
my website.

After that, building a color scheme was a matter of pulling a color I liked from
my photos and using a color wheel calculator to build some complementary colors.
But honestly, I'm keeping it simple and you're not going to see much of the
secondary color.

## Useful plugins

Gatsby's [plugin ecosystem](https://www.gatsbyjs.com/plugins) was a huge draw
for me. For anything I used to code myself to support, I've found there is
usually a plugin already written.

A terrific aspect about the Gatsby architecture and its support for static sites
is it treats the local filesystem as a data source. This includes folders
containing Markdown files. The migration to Gatsby was simple because I was able
to [configure a filesystem
plugin](https://github.com/TheDahv/dahvsite/blob/829b18e1e6b8c31aef4fe3c236b76bb702372409/gatsby-config.js#L46-L52)
to point to the posts directory as a named data source. The Remark plugin parses
that content stream, parsing frontmatter as metadata and turning Markdown into
formatted HTML. I [configured
Remark](https://github.com/TheDahv/dahvsite/blob/829b18e1e6b8c31aef4fe3c236b76bb702372409/gatsby-config.js#L13-L26)
to process images and other files referenced from blog posts, and Gatsby handled
the rest in the build process.

I found the following plugins helpful in this migration:

- [gatsby-plugin-typography](https://www.gatsbyjs.com/plugins/gatsby-plugin-typography/):
  integrates the aforementioned Typography.js projects
- [gatsby-plugin-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/):
  generates a sitemap for site indexing and SEO
- [gatsby-remark-copy-linked-files](https://www.gatsbyjs.com/plugins/gatsby-remark-copy-linked-files/):
  allows a Markdown file to link to SVG and GIF images since they aren't
  supported by the image processing plugins
- [gatsby-remark-images](https://www.gatsbyjs.com/plugins/gatsby-remark-images/):
  supports inline references to images in Markdown since there isn't a place to
  query for images in the Markdown file

## Deploying with GitHub

Improving deployments was the part I was most excited about in this project. My
previous deployment strategy was to build the site locally and then use `s3cmd`
to sync my local filesystem to AWS S3.

This worked fine, but it limited me to using devices to which I had
downloaded my AWS credentials. I'd like to be able to switch computers or author
from my phone without having to download a key to each device.

Since those days, [GitHub Actions](https://github.com/features/actions) had
emerged as a way to automate many code-adjacent workflows from GitHub.
[GitLab](https://about.gitlab.com/) has also had those pipelines for a long
time. I used to host the source code for many of my project &mdash; including
this one &mdash; there, but I use GitHub daily for work and my mindshare is
there.

You can read [the
configuration](https://github.com/TheDahv/dahvsite/blob/829b18e1e6b8c31aef4fe3c236b76bb702372409/.github/workflows/deploy-s3-on-master.yml)
for my deployment process in the source code for the website project. The
overall idea is quite simple: when I update the `main` branch or merge a
draft I'm working on in another branch, a workflow uses Gatsby to build my site
in a container on GitHub's infrastructure. The build assets are then pushed to
AWS and my Cloudfront distribution invalidated to refresh the CDN with the new
content.

I created an IAM user for the automation and stored its keys in GitHub's secrets
manager for workflows.

This is probably the most beautiful part: I can start a post on my laptop,
finish it on my phone, merge the changes, and deploy my site without running a
single command.

## Things to watch out for

There are a couple of things to pay attention to, especially if you are paying
particular attention to SEO and how the site behaves with crawlers and indexers.

### Lazy Loaded Images

Gatsby's default handling of images and "heavy" resources on a page defaults to
lazy loading and pre-fetching. For example, the banner image on the home page
isn't loaded directly into the page. Instead, Gatsby places a placeholder image
there so other content can load quickly, and the image is loaded in later. This
all happens quickly and most users with modern, JS-enabled browsers would never
notice.

Search engine crawlers may see things a little differently, though. I do think
it's important to say right now, *Google can indeed crawl JS-rendered pages.*
_But_, it may not know how long to wait before it decides all your content is
loaded and the page is ready for processing. 


You can check how your site is behaving in the [URL Inspection tool of Google
Search
Console](https://search.google.com/search-console/inspect). From there, you can
see whether your page is in Google's index and evaluate its mobile usability.
You can also use the "Live Test" function to get a screenshot of how your page
looks to Google's crawlers.

As you can see, Googlebot was not able to load the images on my home page:

![Googlebot mobile without images
loaded](../images/static-site-redesign-with-gatsby/google-mobile-rendering-without-images.png)

But then again, I tried it again moments later and the page rendered fine:

![Googlebot mobile with images
loaded on the same
page](../images/static-site-redesign-with-gatsby/google-mobile-rendering-with-images.png)

The
[gatsby-image](https://www.gatsbyjs.com/plugins/gatsby-image/#some-other-stuff-to-be-aware-of)
is highly configurable and in many cases offers guidance to suit the needs of
your site, page, or specific image.

This isn't a significant issue for me and my goals: I don't use many images and
I'm focused on ranking my text content, not my image content. However, image
content is a great way to build links and make your content stand out depending
on your audience. Weigh your options here and choose an approach that works for
you.

### Trailing Slashes in URLs

Another small but important difference is whether the URLs for your pages use
trailing slashes. They are indeed different URLs, and most sites redirect one to
the other without the user ever noticing.

In the previous version of my site, I took advantage of a default S3 behavior of
serving an `index.html` file for any request to a "directory" in a bucket.  All
URLs and internal links include a trailing slash &mdash; that is, a link to that
directory. You can read more about that in [the commit where I set that
up](https://github.com/TheDahv/dahvsite/commit/c03ac75abaf168eaca6b26439d5e7d86b755bd51).

Gatsby doesn't build its assets that way, so instead all my URLs redirect from
versions with trailing slashes to versions without. So, right now my site is
configured to serve content at a URL without a trailing slash, but a quick check
with `curl` shows that there is a bit of a redirect loop happening:

```
$ curl -IL https://www.thedahv.com/blog/migrating-my-aws-s3-website-to-https                                                                                                           
HTTP/2 302 
content-type: text/html; charset=utf-8
content-length: 313
location: /blog/migrating-my-aws-s3-website-to-https/
server: AmazonS3
x-cache: Hit from cloudfront

HTTP/2 200 
content-type: text/html
content-length: 62047
server: AmazonS3
x-cache: Hit from cloudfront
```

This shouldn't be too hard for me to resolve and it won't be a disaster for me.
However, it's important to keep consistent if you are terribly concerned at all
about how Google and other search engines process your site.

## Wrapping up

I'm pleased with my choices and the experience overall. I think the setup brings
me the publication automation I wanted, honors my goals of maintaining a static
site, and brings me modern niceties that I believe will make for a better user
experience.

I want to get back to writing and sharing more often. This setup will also make
it easy for me to publish other kinds of content like projects and tutorial
videos I've produced over the years.

Do you manage any statically generated sites or are curious to try? Do you have
any questions about what I presented here? What tools do you like using? 

Let's discuss on
[Twitter](https://twitter.com/TheDahv/status/1358955241849319424) or on
[LinkedIn](https://www.linkedin.com/posts/daviddpierce_aws-gatsbyjs-githubactions-activity-6764721330127548416-uNzJ)

Here's to avoiding another 3 years and a site redesign before that happens.
