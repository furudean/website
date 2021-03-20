export interface Project {
  title: string;
  slug: string;
  kind: string;
  date: string;
  summary: string;
  coverImageUrl?: string;
  link?: string;
  repo?: string;
  articleUrl?: string;
  articleHtml?: string;
}

export const projects: Project[] = [
  {
    title: "Portfolio site",
    slug: "portfolio-site-2021",
    kind: "Website",
    date: "2021-02-26T00:00:00",
    summary: "Updated portfolio website for 2021. Built with Sapper and Svelte",
    // TODO: cover image is hardcoded, find a better way here
    coverImageUrl: "https://cass.moe/media/projects/portfolio-site-2021/cover.png",
    repo: "https://github.com/c-bandy/website",
    articleUrl: "/articles/portfolio-site-2021.md"
  },
  {
    title: "Type Kana",
    slug: "type-kana",
    kind: "Web app",
    date: "2020-08-02T00:00:00",
    summary: "A quiz app to help you learn hiragana and katakana, the Japanese syllabaries.",
    coverImageUrl: "https://cass.moe/media/projects/type-kana/session.jpg",
    link: "https://type-kana.cass.moe/",
    repo: "https://github.com/c-bandy/type-kana",
    articleUrl: "/articles/type-kana.md"
  }
]
