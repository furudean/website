/**
 * Rewrite hashes on anchor links to include path, we need this due to
 * `<base href="/">` which is enforced by sapper.
 *
 * https://github.com/sveltejs/sapper/issues/904#issuecomment-540536561
 */
export function rewriteFragmentLinks(url: string): void {
  document.querySelectorAll("a").forEach((a) => {
    if (a.hash && a.hash.length) {
      a.href = new URL(url).pathname + a.hash;
    }
  });
}

/**
 * Set a class on all headers with fragment link so a unique style can be
 * shown.
 */
export function updateFragmentLinkTarget(url: string): void {
  const anchors = document.querySelectorAll("h1 > a, h2 > a	, h3 > a" as "a");
  const currentHash = new URL(url).hash;

  anchors.forEach((a) => {
    if (
      currentHash.length &&
      currentHash === new URL(a.href).hash
    ) {
      a.parentElement.classList.add("is-target");
    } else {
      a.parentElement.classList.remove("is-target");
    }
  });
}
