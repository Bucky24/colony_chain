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