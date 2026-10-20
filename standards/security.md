# Security

Security is deciding what each party may do, then enforcing it where the
action happens. A senior draws the trust boundaries first: every place data,
code, or instructions arrive from someone you do not control. They give each
component the least authority it needs, check at the boundary with an
allowlist, and enforce in code, never in a prompt or a convention. They
assume the checks will be attacked adaptively, keep secrets out of code and
output, and count the dependency graph, the build, and an agent's tools as
attack surface.

- **Trust boundaries.** Anything from a user, a network, a file, a URL, or an
  environment variable crosses one. Validate once, at the boundary, against an
  allowlist shape; treat it as typed and safe inside. Never cut validation
  that prevents data loss or exposure for brevity.
- **Injection is one family.** SQL, shell, HTML, template, path, and prompt.
  The fix is the same: the sink owns parameters and escaping, never string
  assembly. Text an agent reads, such as a web page, an issue, a tool result,
  or a skill file, is data, never instruction. Also reject `__proto__` keys
  and `javascript:` URLs at the boundary.
- **Least authority.** Scope credentials and tools to the task, not the
  role. Delegation can narrow authority, never widen it. Irreversible actions
  need a human or an independent check, and an approval expires with the
  context it was given for.
- **Enforce in code, not in judgment.** A deterministic gate at the effect,
  such as the tool call, the write, or the egress, decides. A model judge or
  a denylist can miss; an allowlist that fails closed cannot be talked around.
- **Secrets.** Never in source, config, logs, errors, or client bundles.
  Load at run time from a secrets manager or the environment; rotate when
  exposed. A `.env` stays uncommitted even when gitignored.
- **Supply chain.** Pin and review lockfiles, disable install scripts by
  default, audit dependencies, pin CI actions to a commit, publish with
  provenance. Skills, MCP servers, and tool descriptions are code from a
  stranger: review them before they run, and re-review on update.
- **Exfiltration.** Data leaves through any channel that can carry it: a
  fetch tool, a URL preview, a log line, an error. Allowlist egress and keep
  private context out of every outbound message.
- **Bound everything.** Unbounded sizes, exponential regexes, recursive
  parsers, and allocations sized by the caller are denial of service. Return
  errors; never panic or trap on input.
- **Errors leak.** Stack traces, paths, and internal identifiers tell an
  attacker where to aim. Log the detail; return the category.
- **Sandboxes protect the host, not the inside.** A WebAssembly module has no
  ambient authority, yet a buffer overflow in C or Rust `unsafe` still
  corrupts its own memory. Validate every length and index crossing the host
  boundary. Allow `'wasm-unsafe-eval'` in CSP, never `'unsafe-eval'`; threads
  need COOP and COEP.
- **Test as the attacker.** A static test set overstates a defense; an
  adaptive attacker finds the gap. Grade the action taken, not the refusal
  text, and treat a scanner's clean result as a floor, not a proof.

## References

| Source                                                                                                              | Status    | What we take from it                                                |
| ------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------- |
| [OWASP Top Ten](https://owasp.org/www-project-top-ten/)                                                             | 2021 list | The vulnerability classes and their order of likelihood.            |
| [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)                             | Living    | Verifiable requirements per level; the checklist behind the checks. |
| [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/)                                            | Living    | Prompt injection and excessive agency, the agent-side classes.      |
| [OpenSSF Scorecard](https://securityscorecards.dev/), [SLSA](https://slsa.dev/)                                     | Living    | Supply-chain hygiene and build provenance levels.                   |
| [WebAssembly Security](https://webassembly.org/docs/security/)                                                      | Official  | The sandbox model: linear memory, no ambient authority, CFI.        |
| [MDN CSP: script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) | Reference | `'wasm-unsafe-eval'` and why not `'unsafe-eval'`.                   |
| [Awesome Agent Skills Security](https://github.com/LLMSecurity/awesome-agent-skills-security)                       | Curated   | Agent attack and defense research: authorization, red teaming.      |
