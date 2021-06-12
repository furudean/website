---
title: Reimagining Type Kana
created: 2021-03-04T00:00:00
summary: A quiz app to help you learn hiragana and katakana, the Japanese syllabaries.
coverImageUrl: /media/projects/type-kana/session.jpg
tags: [type-kana]
relatedProjectSlugs: [type-kana]
---

<script context="module">
  import { load } from "./_load"
  export { load }
</script>

![Type Kana screenshot that shows a typical gameplay
session](/media/projects/type-kana/session.jpg)

Type Kana is web app with a goal to help you learn to learn hiragana and
katakana, the Japanese syllabaries.

Type Kana takes inspiration from its predecessors, [Type
Kana](https://lab.fleon.org/type-kana/) (will be referred to as "the original")
and [Real Kana](https://realkana.com/). While they both have their strengths,
neither was perfect.

Type Kana aims to be the best way to study kana, by
combining the best features from its predecessors, along with some fresh ideas.
The end goal is to create a study experience that both functional and pretty,
and built on the newest standards in web technology.

## Study options

The first thing I immediately wanted to fix from the original Type Kana is to
make it more friendly to beginners. The original tests you on the full set of
katakana or hiragana at time. If, for example, you only know 50% of hiragana,
then you'd get the wrong answer 50% of the time. This pushes "you messed up"
feedback to the user frequently. This feels punishing to new learners. I strived
to fix this by allowing the user to pick what they can study.

<figure>
  <video autoplay loop playsinline muted>
    <source src="/media/projects/type-kana/select-kana.mov" type="video/mp4">
  </video>
  <figcaption>
    You can granularly select what to study now. Note the unique effect with 
    “both” selected.
  </figcaption>
</figure>

Something I struggled with was a good way to visually represent that you can
select any kana for the quiz, but while also allowing the user to study both
pairs in one session. After some brainstorming with a friend, we figured out an
intuitive solution for this --- When you have 'both' selected and select a kana,
the katakana form first appears, and a short while later the hiragana form drops
down on top. This communicates a good visual metaphor for what is being
selected.

## The quiz

<figure>
  <video autoplay loop playsinline muted>
    <source src="/media/projects/type-kana/session.mov" type="video/mp4">
  </video>
  <figcaption>
    Quiz in action!
  </figcaption>
</figure>

Implementing the quiz itself was pretty straight forward. I started by
inheriting the clever "typewriter" layout that the original Type Kana invented.
I worked iteratively on this design until I arrived at something pretty and
functional.

The quiz comes with some options to tailor your learning experience for you, one
such feature allows you to retry failed answers. The feature is pretty simple
--- fail an item and it will appear later in the queue for review again. This
was something that worked really nicely in RealKana, so I borrowed it.

Another option is the ability to automatically submit your answer without the
need to press space. It comes in two flavors:

- **Forgiving** -- Submit if answer is correct.
- **Strict** -- Submit if answer is correct **or wrong**.

The logic for these cases is pretty fun:

```js
function handleInput() {
	// get an array of valid answers
	// ["shi", "si"]
	const answers = getAnswers(currentKana)

	// $settings.autoCommit can have 3 different values:
	// "disabled" | "forgiving" | "strict"
	if (
		($settings.autoCommit !== "disabled" &&
			isCorrectAnswer(input, currentKana)) ||
		($settings.autoCommit === "strict" &&
			!answers.some((answer) => answer.startsWith(input)))
	) {
		handleSubmit()
	}
}
```

---

> Since writing, the app is now built using SvelteKit, the successor to Sapper.
> This comes with full PWA support out of the box, yippee!

In the hopefully not so distant future I would like to look into adding PWA
support using Sapper (or [whatever its replacement will
be](https://svelte.dev/blog/whats-the-deal-with-sveltekit)). This way you
wouldn't need an internet connection to be able to use Type Kana, and you could
install it onto your phone.

You can check out the project and its source code at the links below.

<!-- prettier-ignore  -->
*[kana]: Collective name for hiragana and katakana
*[PWA]: Progressive web app
