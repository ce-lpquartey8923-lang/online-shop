import Link from "next/link";

export function Footer() {
  return <footer className="mt-24 bg-ink px-5 py-14 text-white lg:px-10">
    <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.5fr]">
      <div><p className="font-display text-4xl">luma<span className="text-coral">.</span></p><p className="mt-4 max-w-xs text-sm leading-6 text-white/60">Considered things for everyday living. Designed slowly, made to last.</p></div>
      <div><p className="mb-4 text-xs uppercase tracking-[.2em] text-white/40">Explore</p><div className="space-y-3 text-sm text-white/75"><Link className="block hover:text-white" href="/shop">Shop all</Link><Link className="block hover:text-white" href="/shop?category=New%20arrivals">New arrivals</Link><Link className="block hover:text-white" href="/about">Our story</Link></div></div>
      <div><p className="mb-4 text-xs uppercase tracking-[.2em] text-white/40">Help</p><div className="space-y-3 text-sm text-white/75"><Link className="block hover:text-white" href="/shipping">Shipping & returns</Link><Link className="block hover:text-white" href="/account">Account</Link><Link className="block hover:text-white" href="/contact">Contact</Link></div></div>
      <div><p className="mb-4 text-xs uppercase tracking-[.2em] text-white/40">A note from us</p><p className="text-sm leading-6 text-white/75">Join our list for first looks, small-batch drops, and a little inspiration.</p><div className="mt-5 flex border-b border-white/30 pb-3"><input aria-label="Email address" placeholder="Your email address" className="w-full bg-transparent text-sm outline-none placeholder:text-white/40" /><button className="text-sm text-coral">Join</button></div></div>
    </div>
    <div className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/40">© 2024 Luma Market. Built with care.</div>
  </footer>;
}
