// Forwards to Paul's own address, so if it ever attracts spam the forward
// changes and nothing else does. Left as a plain mailto rather than assembled
// at runtime: this is a client-rendered app, so the address is already in a JS
// bundle rather than in served HTML, and the tricks that hide it cost either
// the working link or the accessibility of it.
export const CONTACT_EMAIL = 'babeonym@gmail.com';
