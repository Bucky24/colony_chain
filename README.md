## Building Data 

Each building will contain a few key fields:

| key | value |
| -- | -- |
| type | One of exporter, generator, collector |
| levels | Level data |
| exportLevel | One of planet, system. Used by exporter |

### Level

A level contains various stats for a given building level

| key | value |
| -- | -- |
| cost | An object indicating how much this level costs
| exportModifier | A modifier that is multiplied by any export to come up with the final tally actually exported from the planet. Used by exporter |
| requires | An object indicating how much of another resource this building level requires to function. Not meeting a demand means the building will produce less (if only 40% of demand is met, building produces 40% of output) |
| generates | An object indicating how much this level produces. Used by generator |
| capacity | How much capacity this level can process. Used by collector |
| generatesMin | The min amount this generator will generate, even if it is not getting any of what it requires |

## Algorithm

Every tick, every generator looks to figure out how much of its requirements are filled, and comes up with its current output. This acts like a grid, with generators looking to other generators for this information.

The only difference here is vaults. They remember their previous tick and that's what output they serve. This is to help prevent loops, but is done regardless of loop or no.

In the case of loops, the first generator that detects a loop falls back to providing its previous tick's output.

For more detail:

Every building is added to a queue. A building is processed and checked if its requirements have all been processed. If they have, it processes its own current tick output.

If the building already has a counter on it and it has not processed requirements, then we default to previous tick's output and assume there's a loop. Might not actually be a loop in some configurations but the general idea is that if we've already seen this and its data still isn't ready, then it means all the required connections were also delayed.

If there is no counter, it moves to the back of the queue and increments a counter.

Vaults do this as well, just to get the next output value, however they do not block other buildings from continuing.