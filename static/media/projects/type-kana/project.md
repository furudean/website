![Type Kana screenshot that shows a typical gameplay
session](/media/projects/type-kana/session.jpg "A Type Kana session")

Type Kana is web app with a goal to help you learn to learn hiragana and
katakana, the Japanese syllabaries.

Type Kana takes inspiration from its predecessors, [Type
Kana](https://lab.fleon.org/type-kana/) (will be referred to as "the original")
and [Real Kana](https://realkana.com/). While they both have their strengths,
neither was perfect.

Type Kana aims to be the best way to study 
<abbr title="Collective name for hiragana and katakana">kana</abbr>, by 
combining the best features from its predecessors, along with some fresh ideas. 
The end goal is to create a study experience that both functional and pretty, 
and built on the newest standards in web technology.

## Study options

The first thing I immediately wanted to "fix" from the original Type Kana is to
have more granularity for what to study. The original tests you on either set of
katakana or hiragana at time. If, for example, you only know 50% of hiragana,
then you'd an have "you did bad" feedback from the app 50% of the time. I was in
this position. It feels like you're being punished for not doing everything.
With that in mind, being able to break down what you want to study into smaller
chunks can go a long way.

Something I struggled with was a good way to visually represent that you can
select any kana for the quiz, but while also allowing the user to study both
pairs in one session. After getting some input from a friend, we figured out an
intuitive solution for this — When you have 'both' selected and select a kana,
the katakana form first appears, and a short while later the hiragana form drops
down on top. This communicates a good visual metaphor for what is happening.

<figure>
  <video autoplay loop playsinline muted>
    <source src="/media/projects/type-kana/select-kana.mov" type="video/mp4">
  </video>
  <figcaption>
    Granular selection of kana. Note the unique effect with "Both" selected.
  </figcaption>
</figure>

## The quiz

Implementing the quiz itself was pretty straight forward. I inherited the clever
"typewriter" layout that the original Type Kana invented, making UX improvements
where I saw fit and sprinkling my own design language into the interface.

<figure>
  <video autoplay loop playsinline muted>
    <source src="/media/projects/type-kana/session.mov" type="video/mp4">
  </video>
  <figcaption>
    A demonstration of the quiz. Heck yeah!
  </figcaption>
</figure>

This was my first time diving into Svelte, and this was where I started so this
part of the app has been the by far most iterated on, but the code is still
among the oldest. There's still lots more I want to add to make this part more
fun.

![Screenshot of Type Kana, pictured is the settings
menu](/media/projects/type-kana/settings.jpg "The settings modal. Svelte form
bindings are really seamless!")

## The future

In the hopefully not so distant future I would like to look into adding <abbr
title="Progressive web app">PWA</abbr> support using Sapper (or [whatever its
replacement will be](https://svelte.dev/blog/whats-the-deal-with-sveltekit)).
This way you wouldn't need an internet connection to be able to use Type Kana,
and you could install it onto your phone.

You can check out the project and its source code at the links below.

Until next time!