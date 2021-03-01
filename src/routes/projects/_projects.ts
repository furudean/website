export interface Project {
  title: string;
  slug: string;
  date: string;
  summary: string;
  link?: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    title: "Portfolio website",
    slug: "portfolio-site",
    date: "2021-02-26",
    summary: "Personal portfolio website. You're looking at it!",
    repo: "https://github.com/c-bandy/website"
  },
  {
    title: "Type Kana",
    slug: "type-kana",
    date: "2020-08-02",
    summary: "A quiz app to help you learn hiragana and katakana, the Japanese syllabaries",
    link: "https://type-kana.cass.moe/",
    repo: "https://github.com/c-bandy/type-kana"
  }
]
