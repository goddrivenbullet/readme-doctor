// Integration test against the real service. Skipped unless LIVE=1.
//   LIVE=1 npm test
import { test } from "node:test"
import assert from "node:assert/strict"

const LIVE = process.env.LIVE === "1"
const skip = LIVE ? false : "set LIVE=1 to run the integration test"

import { audit } from "../src/index.js"
import { join } from "node:path"
import { homedir } from "node:os"

test("audits this repository's own README", { skip }, () => {
  const dir = join(homedir(), "workspace", "readme-doctor")
  const report = audit(dir)
  assert.ok(report.readme, "the repository must have a README")
  assert.ok(report.score > 40, "our own README should score well: " + report.score)
})
