/**
 * Rewrite hashes on anchor links to include path, we need this due to
 * `<base href="/">` which is enforced by sapper.
 *
 * https://github.com/sveltejs/sapper/issues/904#issuecomment-540536561
 */
export function rewriteFragmentLinks(url: string): void {
  const { origin, pathname } = new URL(url);

  document.querySelectorAll("a").forEach((a) => {
    if (
      a.hash.length > 0 &&
      a.origin === origin
    ) {
      a.href = pathname + a.hash;
    }
  });
}

/**
 * Set a class on all headers with fragment link so a unique style can be
 * shown.
 */
export function updateFragmentLinkTarget(url: string): void {
  const anchors = document.querySelectorAll("h1 > a, h2 > a	, h3 > a" as "a");
  const { hash } = new URL(url);

  anchors.forEach((a) => {
    if (
      hash.length &&
      hash === new URL(a.href).hash
    ) {
      a.parentElement.classList.add("is-target");
    } else {
      a.parentElement.classList.remove("is-target");
    }
  });
}
