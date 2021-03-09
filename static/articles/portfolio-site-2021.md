![Graphic that has the text "Making of the 2021 portfolio site" repeated three
times, the middle row with linguistic guide
lines](/media/projects/portfolio-site-2021/cover.png)

2021 was a big year for me. Not only did I quit my 3 year position at TIQQE, but
I moved to a completely new country! I wanted to represent this change in
my life with a new brand that represents how both me and my skills have evolved
in the recent years.

## Design

Inspired by 

## Dive into Sapper

Since I really enjoyed using Svelte for my [last project](/projects/type-kana),
Sapper felt like a natural progression to create a website with server side
rendering. Sapper comes with isomorphic rendering, meaning that markup renders
both on the server and in the browser in order to be as fast and as efficient as
possible.

The concept behind Sapper is extremely simple --- every page on your site is a
rendered Svelte component. To set up a route, all you have to do is add a Svelte
component inside `src/routes`. Your file structure in the `routes` directory
matches the url path. For example,
`src/routes/projects/portfolio-site-2021.svelte` would match this page.

A nice benefit from doing rendering on the server is that you can have dynamic
routes that are based of external data. I used this technique to set `<meta>`
tags that render link-embeds for dynamic routes:

### /projects/type-kana.json

```json
{
  "title": "Type Kana",
  "slug": "type-kana",
  "date": "2020-08-02",
  "summary": "A quiz app to help you learn hiragana and katakana, the Japanese syllabaries. Powered by Svelte.",
  "coverImageUrl": "https://cass.moe/media/projects/type-kana/session.jpg",
  "link": "https://type-kana.cass.moe/",
  "repo": "https://github.com/c-bandy/type-kana",
  "articleUrl": "/articles/type-kana.md"
}
```

### /projects/[slug].svelte

This file renders as a route to any url that matches `/projects/*`. You
can read about how this works on [Sapper's documentation
page](https://sapper.svelte.dev/docs#Pages).

```svelte
<script context="module">
  // the preload function is special -- it runs before regular rendering and 
  // assigns its return value to the component's exported variables
  export async function preload ({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`projects/${params.slug}.json`);
    const project = await res.json();

    if (res.status === 200) {
      return { project }; // set `project` variable in <script>
    } else {
      this.error(res.status, res.message);
    }
  };
</script>

<script>
  export let project;
</script>

<svelte:head>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={project.title} />
  <meta name="twitter:description" content={project.description} />
  <meta name="twitter:image" content={project.image} />
</svelte:head>

<!-- rest of the component goes here -->
```

And with all that --- we have set up a link preview for our dynamic route. Now
when we add more projects all we have to do was edit a JSON file to fill in the
data.

![A screenshot of the link preview for a project as it appears on
twitter.com](/media/projects/portfolio-site-2021/link-preview.png "What you see
when you link the Type Kana project on Twitter. Isn't my baby beautiful?")

## Even crazier

Of course, you can get as complicated as you want with this pattern. The page
you're reading right now [is composed of
Markdown](/articles/portfolio-site-2021.md) that gets rendered when you request
the page. 

Here's a stripped down version of what that code looks like:

```svelte
<script context="module">
  import marked from "marked";

  export async function preload ({ params }) {
    const project = await this.fetch(`projects/${params.slug}.json`)
      .then(res => res.json());
    const article = await this.fetch(project.articleUrl)
      .then(res => res.text());

    return { 
      project, 
      html: marked(article) 
    };
  };
</script>
```

---

Sapper is a really clever framework that puts usability first. It was a pleasant
surprise to see how easy it is to create a website that has the defaults built
in. 

There was a lot that I left out to kept this article on the shorter side. If
you're interested in learning more, you can check out the source code at the
link below.
