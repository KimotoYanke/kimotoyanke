#!/usr/bin/env node
import meow from 'meow'
import {h, render } from 'ink'

import ui from './ui'

meow(`
\tUsage:
\t  $ kimotoyanke
`)

render(h(ui))
